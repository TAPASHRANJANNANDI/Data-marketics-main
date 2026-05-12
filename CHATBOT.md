# Help Chat Bot — Semantic FAQ on a Single CPU Core

A shareable recipe for adding a "floating bottom-right" help chat to a
web app. **No LLM, no per-query cost, no GPU, ~50 ms latency**, runs
in ~840 MB RSS on one CPU core.

This is what we shipped on WenMail. Adapt freely.

---

## What it does

- Floating "?" bubble bottom-right of selected pages (landing + login,
  not the authed app).
- Click → expands a 360×520 px panel with a welcome message and an
  input.
- User asks anything → backend matches against a pre-embedded JSON FAQ
  → returns the best-matching canned answer + 2 related "drill-in"
  suggestions, OR a "I'll connect you to support" fallback with an
  email link.
- Subsequent questions on the same topic don't repeat the same answer
  (last-N dedup).

What it **doesn't** do:
- True conversational understanding ("and what about the cheaper
  one?") — see the [Limits](#limits) section.
- Make stuff up. There is no generative model. The answer text is
  always exactly what's in the FAQ JSON.

---

## Why not an LLM

The two genuine alternatives we considered:

| Approach | Cost | Latency | Risk |
|---|---|---|---|
| **GPT-4 / Claude class API** | ~$0.01-0.03 / query | 1-3 s | Hallucinations on platform-specific facts |
| **Self-hosted small LLM (1-3B)** | $0 | 5-15 s/query on CPU | Same hallucinations + heavy RAM |
| **Semantic FAQ (this doc)** | $0 | 50 ms | None — answers are deterministic |

For a **landing-page help bot** the questions are bounded ("how much",
"forgot password", "where do I login", "what is X") — semantic FAQ
nails 80%+ of them and the 20% that don't match get gracefully
escalated to email.

The hallucination risk is the killer for LLMs on a sales page: a wrong
"yes we support PGP" or "yes there's a free tier" becomes a customer
trust issue.

---

## Architecture

```
┌──────────────────┐    HTTPS    ┌─────────────────────┐
│  Browser widget  │  ─────────► │  Fastify backend    │
│  (React)         │             │  /api/chat/ask      │
└──────────────────┘             │  (rate-limit, proxy)│
                                 └──────────┬──────────┘
                                            │ HTTP
                                            ▼
                              ┌──────────────────────────┐
                              │ Python sidecar (FastAPI) │
                              │ 127.0.0.1:8200           │
                              │ ┌──────────────────────┐ │
                              │ │ MiniLM-L6 (22M)      │ │
                              │ │ + FAQ vectors        │ │
                              │ └──────────────────────┘ │
                              └──────────────────────────┘
                                          ▲
                                          │ load at boot
                                  faq.json (136 entries)
```

**Three pieces:**

1. **Python sidecar** at `/opt/wenmail-chat/`. systemd-managed,
   loopback-only (`127.0.0.1:8200`). Loads the model + pre-embeds the
   FAQ once at boot. Single endpoint `/ask`.
2. **Backend proxy route** in your existing app — does per-IP
   rate-limiting (we used Redis sliding window, 30 req/min), proxies
   to the sidecar, applies a low-confidence fallback ("email
   support@…").
3. **Frontend widget** — React component that floats bottom-right,
   talks to the backend `/api/chat/ask`. No third-party dependencies
   beyond `lucide-react` icons.

Why a sidecar instead of embedding the model in the main backend?
- Memory isolation — if PyTorch leaks or OOMs, your main API stays up.
- Restart in seconds without touching the API.
- Python ecosystem for sentence-transformers is mature; trying to do
  the same in Node via ONNX is doable but the tooling is sparser.

---

## The model

[`sentence-transformers/all-MiniLM-L6-v2`](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2)

| Property | Value |
|---|---|
| Parameters | 22M |
| Disk size | 80 MB |
| Resident RAM (warm) | ~840 MB (PyTorch runtime is most of this) |
| Inference latency | 30-50 ms / query on a single x86 core |
| Accuracy on FAQ matching | excellent for short queries vs short FAQ entries |
| License | Apache 2.0 |

This is THE workhorse model for "I just need embeddings on CPU". It's
been the default for 3+ years and the ecosystem is rock-solid.

If you want even smaller, `all-MiniLM-L12-v2` is similar quality at
~33M params; `paraphrase-MiniLM-L3-v2` is 17M params if you really
need to fit under 500 MB total.

---

## The two non-obvious tricks

These are the things we got wrong on the first pass and had to fix.
Skip them and you'll hit the same bugs.

### 1. Embed only the question, not the answer body

**Wrong** (what we did first):
```python
corpus = [entry["question"] + " " + entry["answer"][:200] for entry in faq]
```

**Right:**
```python
corpus = [entry["question"] for entry in faq]
```

Answer bodies routinely contain brand keywords and topic words that
inflate cosine scores on every brand-anything query. Real bug we hit:
`"what is contact mail for wenmail"` matched `"What is WenMail"`
(0.81) instead of `"What is the contact email"` (0.72) purely
because the brand token appeared multiple times in the WenMail
overview answer.

Tradeoff: lower recall on queries that paraphrase very far from the
question text. Mitigated by writing **multiple question phrasings per
topic** in the FAQ (see [FAQ writing](#writing-the-faq)).

### 2. Strip your brand tokens before embedding

Every entry in your FAQ is about your product by definition — the
brand carries no discriminating signal between entries, but it
**dominates short queries**:

```python
import re
_BRAND_STRIP = re.compile(r"\b(yourbrand|yourcompany)\b", re.IGNORECASE)

def _normalize(text: str) -> str:
    out = _BRAND_STRIP.sub("", text)
    return " ".join(out.split()).lower()

# Apply at BOTH embed time AND query time:
corpus = [_normalize(entry["question"]) for entry in faq]
# ...later...
q_vec = model.encode([_normalize(user_query)], normalize_embeddings=True)
```

Result: `"what is contact mail for wenmail"` after strip → `"what is
contact mail for"` → matches `"what is the contact email"` cleanly.

Combine these two tricks and your match quality goes from "frustrating
~70%" to "feels intentional ~95%" with the same model and same FAQ.

---

## Confidence threshold

We use **0.45 cosine similarity** as the "I'm confident" threshold.
Below that → fallback to email-support.

You can't pick this number from first principles — measure it. Run
your real FAQ + 20 representative user queries (5 should match
cleanly, 10 should match a topic, 5 should be off-topic noise). Pick
the threshold that puts:
- All 15 on-topic queries above threshold (true positives)
- All 5 off-topic queries below (true negatives)

Typical landing-spot is 0.40-0.55. Lower = more matches but more
wrong answers; higher = more "I'll connect you to support" responses.

**Relaxed threshold for follow-ups:** when the request includes an
`exclude` list (i.e. the user is drilling in on the same topic — see
[Dedup](#dedup) below), drop the threshold to 0.35. The next-best
match for an already-asked topic is naturally weaker.

---

## Dedup (last-3 ring buffer)

After the user asks a question and the bot returns answer A, you
don't want their next question on the same topic to return A again.

The model has no memory — it can't "know" what was already shown.
Solution: client-side state.

```jsx
// Frontend keeps the last 3 question texts that were shown
const [recentShown, setRecentShown] = useState<string[]>([]);

// Send them on every request
fetch("/api/chat/ask", {
  method: "POST",
  body: JSON.stringify({ query: q, exclude: recentShown }),
});

// On response, push the new question onto the ring (cap 3, dedupe)
setRecentShown(prev => {
  const next = [topMatchQuestion, ...prev.filter(p => p !== topMatchQuestion)];
  return next.slice(0, 3);
});
```

```python
# Sidecar: skip excluded entries when picking top-K
sorted_idx = np.argsort(-scores)
matches = []
for i in sorted_idx:
    if faq[i]["question"] in excluded:
        continue
    matches.append(...)
    if len(matches) >= TOP_K:
        break
```

Reset button on the widget clears the ring (fresh conversation).

---

## Writing the FAQ

This is where you spend your time. The model is generic; the FAQ is
your product.

**Golden rules:**

1. **Multiple phrasings per intent.** A user might ask "how much",
   "what's the price", "pricing", "cost", "what does it cost",
   "fees" — write FAQ entries for each that point to the same answer
   (or close variants).

2. **Keep questions short.** Question text is what gets embedded.
   Long meandering questions hurt match quality. 5-12 words is ideal.

3. **Answers can be long.** They aren't embedded; they're displayed
   verbatim. Markdown / bullet lists / multi-paragraph all fine.

4. **Use category as a soft filter.** We tag every entry with a
   category (Pricing, Login, Setup, Contact, etc.). Useful for
   debugging matches and could power filtered re-ranking later.

5. **Cover the negative cases.** Questions like "Is there a free
   tier?", "Do you have a phone number?" — answer them honestly even
   when the answer is "no". Otherwise users just keep asking.

6. **Avoid your brand name in the question text.** Per the brand-strip
   trick, brand tokens get stripped — so a question literally just
   "What is WenMail" becomes "What is" after normalization. Add a
   discriminator: "What is WenMail (overview)" or rely on the
   answer-text bias (we did neither and it works because there's only
   one entry that matches "what is" alone).

7. **Test by typing real questions, not by reading.** What you THINK
   users will ask differs from what they actually type. Watch the
   chat logs for queries that land on the fallback.

Our FAQ at the time of writing: **136 entries across 13 categories**,
~40 KB JSON. Embedding all of them at boot takes <1 s.

---

## Lazy-load (we tried it, reverted)

For a help bot on a low-traffic landing page, holding 840 MB resident
"just in case" feels wasteful. We implemented lazy-load + auto-unload:
- Cold (no recent queries): 54 MB RSS
- Warm (after first query): 840 MB RSS
- After 15 min idle: auto-unload back to 54 MB

**We reverted.** Reasoning: on a 15 GB host with plenty of headroom,
the 840 MB sustained cost was acceptable. The 5-second first-query
warm-up was a worse UX for the first user of the day than the memory
saving was worth.

If you're on a tiny VPS (<2 GB total), lazy-load is the right call —
the code below is the version we shipped, then rolled back. Both
modes work; pick based on your RAM:CPU situation.

```python
# Lazy-load variant — model loads on first /ask, unloads after IDLE_SECS
@app.on_event("startup")
def startup():
    """Just load the FAQ — model loads lazily on first query."""
    global faq
    faq = json.load(open(FAQ_PATH))
    threading.Thread(target=_idle_watcher, daemon=True).start()

def _idle_watcher():
    while True:
        time.sleep(60)
        with _lock:
            if _model is not None and (time.time() - _last_used_ts) > IDLE_UNLOAD_SECS:
                _unload_model_locked()
```

---

## Code: the full sidecar

This is the entire `service.py` — ~150 lines. Drop it on any host,
add a venv with `fastapi + uvicorn + sentence-transformers + numpy`,
and you have a working help bot.

```python
"""service.py — semantic FAQ via sentence-transformers."""

import json, os, re, threading, time
from pathlib import Path
from typing import List, Optional

from fastapi import FastAPI
from pydantic import BaseModel

MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
FAQ_PATH = Path(__file__).parent / "faq.json"
CONFIDENCE_THRESHOLD = float(os.environ.get("CHAT_THRESHOLD", "0.45"))
TOP_K = 3

app = FastAPI()
_lock = threading.Lock()
_model = None
_np = None
_faq_embeddings = None
faq: List[dict] = []

# Strip brand tokens before embedding — see [the two non-obvious tricks]
_BRAND_STRIP = re.compile(r"\b(yourbrand|yourcompany)\b", re.IGNORECASE)
def _normalize(text: str) -> str:
    out = _BRAND_STRIP.sub("", text or "")
    return " ".join(out.split()).lower()

def _load_model_locked():
    global _model, _np, _faq_embeddings
    if _model is not None:
        return
    import numpy as np
    from sentence_transformers import SentenceTransformer
    _np = np
    _model = SentenceTransformer(MODEL_NAME)
    corpus = [_normalize(entry["question"]) for entry in faq]
    _faq_embeddings = _model.encode(corpus, normalize_embeddings=True, show_progress_bar=False)

@app.on_event("startup")
def startup():
    """Boot-warm: load FAQ AND model immediately."""
    global faq
    with FAQ_PATH.open("r", encoding="utf-8") as f:
        faq = json.load(f)
    with _lock:
        _load_model_locked()

class AskRequest(BaseModel):
    query: str
    exclude: List[str] = []

class AskResponseMatch(BaseModel):
    question: str
    answer: str
    category: str
    score: float

class AskResponse(BaseModel):
    matches: List[AskResponseMatch]
    best_score: float
    confident: bool

@app.get("/healthz")
def healthz():
    return {"status": "ok", "faq_count": len(faq), "model_loaded": _model is not None}

@app.post("/ask", response_model=AskResponse)
def ask(req: AskRequest):
    q = (req.query or "").strip()
    if not q:
        return AskResponse(matches=[], best_score=0.0, confident=False)
    if len(q) > 1000:
        q = q[:1000]

    with _lock:
        q_vec = _model.encode([_normalize(q)], normalize_embeddings=True, show_progress_bar=False)[0]
        scores = (_faq_embeddings @ q_vec).astype(float)

    excluded = set(req.exclude or [])
    sorted_idx = _np.argsort(-scores)
    matches = []
    for i in sorted_idx:
        q_text = faq[int(i)]["question"]
        if q_text in excluded:
            continue
        matches.append(AskResponseMatch(
            question=q_text,
            answer=faq[int(i)]["answer"],
            category=faq[int(i)]["category"],
            score=float(scores[int(i)]),
        ))
        if len(matches) >= TOP_K:
            break

    best = matches[0].score if matches else 0.0
    return AskResponse(matches=matches, best_score=best, confident=best >= CONFIDENCE_THRESHOLD)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8200)
```

`requirements.txt`:
```
fastapi==0.115.5
uvicorn[standard]==0.32.1
sentence-transformers==3.3.1
numpy==1.26.4
pydantic==2.10.3
```

---

## Code: the systemd unit

```ini
[Unit]
Description=Chat Sidecar (FAQ semantic search)
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/chat
Environment=HF_HOME=/opt/chat/.cache/huggingface
Environment=TRANSFORMERS_CACHE=/opt/chat/.cache/huggingface
Environment=XDG_CACHE_HOME=/opt/chat/.cache
ExecStart=/opt/chat/venv/bin/python /opt/chat/service.py
Restart=always
RestartSec=5

CPUAffinity=0
MemoryMax=1G

NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
PrivateTmp=true
ReadWritePaths=/opt/chat/.cache

[Install]
WantedBy=multi-user.target
```

**Setup gotcha**: the HuggingFace library tries to write its cache to
`~/.cache/huggingface` by default. With `ProtectHome=true` that fails.
Pin the cache inside `/opt/chat/.cache/` via the env vars above and
add it to `ReadWritePaths`.

**Pre-warm the cache before first systemd start:**
```bash
HF_HOME=/opt/chat/.cache/huggingface \
  /opt/chat/venv/bin/python -c \
    "from sentence_transformers import SentenceTransformer; \
     SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')"
```

Otherwise the first systemd start downloads ~80 MB inside the
sandboxed environment, which can fail in obscure ways.

---

## Code: the backend proxy (Fastify / Node.js)

```typescript
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { redis } from "../lib/redis.js";

const SIDECAR_URL = process.env.CHAT_SIDECAR_URL || "http://127.0.0.1:8200";
const REQUEST_TIMEOUT_MS = 5000;
const RATE_LIMIT_MAX = 30;       // requests per minute per IP
const RATE_LIMIT_WINDOW = 60;

async function checkRateLimit(ip: string): Promise<boolean> {
  const key = `chat:rl:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, RATE_LIMIT_WINDOW);
  return count <= RATE_LIMIT_MAX;
}

export async function chatRoutes(app: FastifyInstance) {
  app.post("/ask", async (request, reply) => {
    const body = z.object({
      query: z.string().min(1).max(1000),
      exclude: z.array(z.string().max(500)).max(10).default([]),
    }).parse(request.body);

    const xff = (request.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim();
    const ip = xff || request.ip || "unknown";
    if (!(await checkRateLimit(ip))) {
      return reply.status(429).send({ message: "Too many requests." });
    }

    try {
      const controller = new AbortController();
      const tid = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      const res = await fetch(`${SIDECAR_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: body.query, exclude: body.exclude }),
        signal: controller.signal,
      });
      clearTimeout(tid);
      const data = await res.json();

      // Relax threshold if user is drilling in on a topic
      const RELAXED_THRESHOLD = 0.35;
      const isFollowup = body.exclude.length > 0;
      const confident = data.confident ||
        (isFollowup && data.matches.length > 0 && data.best_score >= RELAXED_THRESHOLD);

      if (!confident) {
        return reply.send({
          confident: false,
          matches: [],
          fallback: {
            message: "I don't have a confident answer. Email us at support@example.com.",
            email: "support@example.com",
          },
        });
      }
      return reply.send({ confident: true, matches: data.matches });
    } catch {
      return reply.status(503).send({
        message: "Help bot temporarily unavailable.",
        code: "SIDECAR_DOWN",
      });
    }
  });
}
```

The frontend widget is a single React component (~250 lines). The full
source is in [`frontend/src/components/help-chat.tsx`](../frontend/src/components/help-chat.tsx) of the WenMail repo. Key design points:

- **Self-contained state** — drop into any page, no parent props.
- **Welcome message on first open**: "Greetings! How may I help you?"
  Never goes to the embedding model (it's pure UI).
- **Track last 3 returned question texts** in component state, send as
  `exclude:[...]` on next request.
- **No localStorage of conversation** — fresh on every page load.
  Privacy + we don't accidentally hold sensitive Q&A indefinitely.
- **Welcome message is NOT counted as an answer** for dedup purposes.

---

## Resource use (real numbers from prod)

| Metric | Cold | Warm |
|---|---|---|
| RSS | 54 MB | 838 MB |
| First-query latency | 5 s (model load) | 30 ms |
| Subsequent queries | n/a | 30-50 ms |
| CPU usage idle | 0% | 0% |
| CPU usage during query | ~100% of one core for ~30 ms | same |

For a chat used by ~10 visitors/day on a landing page, **total daily
CPU use is well under 1 second of one core**. The 838 MB resident is
the only meaningful cost.

---

## Limits

Be honest with yourself + your team about what this isn't:

1. **No conversational state.** "And the cheaper one?" by itself
   matches nothing — the model has no idea what "the cheaper one"
   refers to. Dedup helps a bit (drilling in on a topic with the same
   query word repeats DOES surface different entries) but it's not
   real conversation.

2. **No reasoning.** "If I'm a 50-person team, which plan?" — the
   model can't do that math. It'll match to "Which plan should I
   pick" if you wrote that question into the FAQ.

3. **Recall ≠ precision.** Some queries will have technically-related
   matches that are wrong in spirit. Threshold is your only knob.

4. **Quality scales with FAQ effort, not model size.** A bigger model
   won't fix a thin FAQ.

---

## When to upgrade

You'll know it's time to switch to an LLM-backed approach when:

- Your chat logs show >20% of queries hitting the fallback (users are
  asking things you haven't written FAQ entries for).
- Real conversational follow-ups become common ("ok and what about X
  for that plan?").
- You can budget a few cents per session for a small LLM call.

The cleanest upgrade path is **query rewriting only** — keep the
semantic FAQ, but use a small/cheap LLM (Anthropic Claude Haiku 4.5,
~$0.0005/query, ~200 ms) to rewrite the user's follow-up into a
standalone question before embedding:

```
prior bot answer: "Starter is ₹399/month..."
user follow-up: "ok and yearly?"
LLM rewrites to: "What is the yearly price for the Starter plan?"
→ embed this, NOT "ok and yearly?"
```

This gets you 80% of the LLM-quality experience at 5% of the cost,
with deterministic fallback to your FAQ when the rewrite is iffy.
We have NOT shipped this — listed it as a "when you outgrow it" path.

---

## Costs

- **Engineering**: ~6 hours from idea to production (most of that
  was writing the FAQ).
- **Hosting**: $0 incremental on an existing VPS — fits in spare RAM.
- **Per-query**: $0. Forever.
- **HuggingFace pull**: 80 MB one-time download.

For comparison, a GPT-4-class API call for the same use case is
$0.01-0.03 per query. At 1,000 queries/day that's $300-900/month.
At 100,000 queries/day it's $30k-90k/month. Yes, those are correct.

---

## License + reuse

This recipe is BSD-style "do whatever you want, no warranty". The
model itself ([all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2))
is Apache 2.0.

The `sentence-transformers` library and `fastapi` are both Apache 2.0;
suitable for commercial use without restrictions.

---

## TL;DR for your team

1. Write a JSON file of `{question, answer, category}` entries.
   Multiple phrasings per intent. Aim for 80-150 entries to start.
2. Run a Python sidecar that loads `all-MiniLM-L6-v2`, embeds the
   questions at boot, exposes `/ask`.
3. Strip your brand name from queries + FAQ before embedding (do
   not skip this — it's a 30-line fix that doubles match quality).
4. Embed only the question text, not the answer body.
5. Pick a confidence threshold by testing real queries; fallback to
   email-support below it.
6. Frontend widget tracks last-3 returned questions, sends as
   `exclude` on next request.
7. systemd-manage with HF cache pinned inside `/opt/`.
8. Total: ~6 hours of work, $0/month, 50 ms response time, 838 MB
   RAM, single CPU core. Done.
