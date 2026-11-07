// End-to-end test for the blog comment endpoint.
//
// Boots backend/server.js with nodemailer pointed at a throwaway SMTP sink,
// so the whole path runs for real: validation, the math CAPTCHA, the
// honeypot, HTML escaping, the rate limit and the send itself. No mail
// leaves the machine and no credentials are needed.
//
//   npm run test:comments
//
// Needs nothing beyond Node and the existing backend dependencies.
import net from 'node:net';
import { spawn } from 'node:child_process';

const SMTP_PORT = 2525;
const API_PORT = 3399;
const received = [];

// Minimal SMTP sink: enough of the protocol for nodemailer to finish a
// session. The DATA payload is captured for assertions.
const smtp = net.createServer(socket => {
    let inData = false;
    let buffer = '';

    socket.write('220 localhost ESMTP test\r\n');

    socket.on('data', chunk => {
        const text = chunk.toString();

        if (inData) {
            buffer += text;
            if (buffer.includes('\r\n.\r\n')) {
                received.push(buffer);
                inData = false;
                buffer = '';
                socket.write('250 2.0.0 Ok: queued\r\n');
            }
            return;
        }

        for (const line of text.split('\r\n').filter(Boolean)) {
            const verb = line.split(' ')[0].toUpperCase();
            if (verb === 'EHLO' || verb === 'HELO') socket.write('250-localhost\r\n250 AUTH PLAIN LOGIN\r\n');
            else if (verb === 'AUTH') socket.write('235 2.7.0 Accepted\r\n');
            else if (verb === 'MAIL' || verb === 'RCPT') socket.write('250 2.1.0 Ok\r\n');
            else if (verb === 'DATA') { inData = true; socket.write('354 End data\r\n'); }
            else if (verb === 'QUIT') { socket.write('221 2.0.0 Bye\r\n'); socket.end(); }
            else socket.write('250 2.0.0 Ok\r\n');
        }
    });
});

await new Promise(resolve => smtp.listen(SMTP_PORT, '127.0.0.1', resolve));

const server = spawn(process.execPath, ['backend/server.js'], {
    env: {
        ...process.env,
        PORT: String(API_PORT),
        EMAIL_HOST: '127.0.0.1',
        EMAIL_PORT: String(SMTP_PORT),
        EMAIL_USER: 'test@example.com',
        EMAIL_PASS: 'test',
        EMAIL_FROM: 'noreply@datamarketics.com',
        EMAIL_TO: 'sales@datamarketics.com',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
});

let serverLog = '';
server.stdout.on('data', d => { serverLog += d.toString(); });
server.stderr.on('data', d => { serverLog += d.toString(); });

const BASE = `http://127.0.0.1:${API_PORT}`;

// Wait for the listener without spending a rate-limit slot on /api/.
for (let i = 0; i < 60; i++) {
    try {
        await fetch(`${BASE}/__ping`);
        break;
    } catch {
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

let requests = 0;
const post = body => {
    requests++;
    return fetch(`${BASE}/api/blog-comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    }).then(async response => ({ status: response.status, body: await response.json().catch(() => ({})) }));
};

const settle = (ms = 700) => new Promise(resolve => setTimeout(resolve, ms));

/* --- MIME helpers. The message is multipart/alternative: the text/plain
   part legitimately carries the comment verbatim, so escaping can only be
   judged on the text/html part. --- */
const decodeQp = raw =>
    raw.replace(/=\r\n/g, '').replace(/=([0-9A-F]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));

// Headers fold across lines, and a subject with an emoji arrives RFC 2047
// encoded rather than as readable text.
const header = (raw, name) => {
    const unfolded = raw.replace(/\r\n[ \t]+/g, '');
    const line = unfolded.split('\r\n').find(l => l.toLowerCase().startsWith(name.toLowerCase() + ':'));
    if (!line) return '';

    return line
        .slice(name.length + 1)
        .trim()
        .replace(/=\?UTF-8\?B\?([^?]*)\?=/gi, (_, b64) => Buffer.from(b64, 'base64').toString('utf8'))
        .replace(/=\?UTF-8\?Q\?([^?]*)\?=/gi, (_, q) =>
            decodeQp(q.replace(/_/g, ' ')));
};

const part = (raw, type) => {
    const boundary = (raw.match(/boundary="?([^"\r\n;]+)"?/i) || [])[1];
    if (!boundary) return '';

    for (const section of raw.split('--' + boundary)) {
        const contentType = (section.match(/Content-Type:\s*([^;\r\n]+)/i) || [])[1] || '';
        if (contentType.includes(type)) {
            return decodeQp(section.slice(section.indexOf('\r\n\r\n') + 4));
        }
    }
    return '';
};

const valid = {
    name: 'Priya Raman',
    email: 'priya@acme.example',
    website: 'https://acme.example',
    comment: 'Great breakdown of the seven factors.\nDo you publish your verification cadence?',
    slug: 'how-to-choose-a-b2b-data-provider',
    title: 'How to Choose a Reliable B2B Data Provider',
    captcha: { a: 4, b: 3, op: '+', answer: '7' },
};

const failures = [];
const check = (label, ok, detail) => {
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${ok ? '' : `  --  ${detail}`}`);
    if (!ok) failures.push(label);
};
const seen = response => `got ${response.status} ${JSON.stringify(response.body)}`;

// Happy path first: the limiter counts rejected attempts too, so running the
// validation cases first would eat the whole budget.
let r = await post(valid);
check('valid comment accepted (200)', r.status === 200 && r.body.success === true, seen(r));
await settle();
check('email was sent', received.length === 1, `mail count ${received.length}`);

const raw = received[received.length - 1] || '';
const text = part(raw, 'text/plain');
const subject = header(raw, 'Subject');

check('subject names the post', subject.includes('New blog comment on "How to Choose a Reliable B2B Data Provider"'), `subject was "${subject}"`);
check('subject names the commenter', subject.includes('Priya Raman'), `subject was "${subject}"`);
check('reply-to is the commenter', header(raw, 'Reply-To').includes('priya@acme.example'), `Reply-To was "${header(raw, 'Reply-To')}"`);
check('to is the team inbox', header(raw, 'To').includes('sales@datamarketics.com'), `To was "${header(raw, 'To')}"`);
check('comment text is in the body', text.includes('Do you publish your verification cadence?'), 'comment text missing');
check('post URL is in the body', text.includes('https://datamarketics.com/blog/how-to-choose-a-b2b-data-provider'), 'post URL missing');

// HTML in a comment must be escaped in the html part. The plain-text part
// carries it verbatim, which is correct and not checked here.
received.length = 0;
await post({ ...valid, comment: '<script>alert(1)</script> and <b>bold</b>' });
await settle();
const html = part(received[0] || '', 'text/html');
check('html part escapes the comment', html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'), 'escaped form not found');
check('html part has no live script tag', !html.includes('<script>alert(1)</script>'), 'raw HTML reached the email');

// Validation.
r = await post({ email: 'a@b.co', comment: 'hi', slug: 'x', captcha: valid.captcha });
check('missing name rejected (400)', r.status === 400, seen(r));

r = await post({ ...valid, email: 'not-an-email' });
check('invalid email rejected (400)', r.status === 400 && /valid email/i.test(r.body.message || ''), seen(r));

r = await post({ ...valid, captcha: { a: 4, b: 3, op: '+', answer: '9' } });
check('wrong captcha rejected (400)', r.status === 400 && /security question/i.test(r.body.message || ''), seen(r));

r = await post({ ...valid, comment: 'x'.repeat(4001) });
check('over-long comment rejected (400)', r.status === 400, seen(r));

// Honeypot: answers 200 so a bot learns nothing, but sends no mail.
received.length = 0;
r = await post({ ...valid, company: 'SpamCorp' });
await settle(400);
check('honeypot answers 200', r.status === 200 && r.body.success === true, seen(r));
check('honeypot sends no email', received.length === 0, `mail count ${received.length}`);

// Rate limit is 8 per window and counts rejected attempts, so keep posting
// until it refuses. It must refuse within a couple of extra tries.
const spent = requests;
let limited = null;
for (let i = 0; i < 4 && !limited; i++) {
    const response = await post(valid);
    if (response.status === 429) limited = requests;
}
check('rate limit refuses further posts', limited !== null, `still accepting after ${requests} requests`);
check('rate limit triggers at 9 requests', limited === 9, `${spent} spent before the loop; refused at request ${limited}`);

server.kill();
smtp.close();

if (failures.length) {
    console.log(`\n${failures.length} FAILURE(S): ${failures.join(', ')}`);
    console.log('\n--- server log ---\n' + serverLog.slice(-2000));
    process.exit(1);
}
console.log('\nAll comment endpoint checks passed.');
