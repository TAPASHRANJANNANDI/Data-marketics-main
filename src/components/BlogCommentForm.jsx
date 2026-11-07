import React, { useEffect, useState } from 'react';
import { MessageSquare, Send, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

// Comment box shown at the end of every blog post. Comments are emailed to
// the team rather than published on the page: no moderation queue, no stored
// personal data, and no user-generated markup for Google to index.
//
// Spam defences, matching the contact form: a math CAPTCHA checked on the
// server, a honeypot field, and a per-IP rate limit on /api/blog-comment.

const OPS = ['+', '-', 'x'];

// Same shape the contact form uses, so the server verifies both with
// verifyMathCaptcha(). Subtraction is ordered to avoid a negative answer.
function generateMathChallenge() {
    const op = OPS[Math.floor(Math.random() * OPS.length)];
    let a = Math.floor(Math.random() * 9) + 1;
    let b = Math.floor(Math.random() * 9) + 1;
    if (op === '-' && b > a) [a, b] = [b, a];
    return { a, b, op };
}

const MAX_COMMENT = 4000;

const label = {
    display: 'block',
    fontSize: '12.5px',
    fontWeight: 700,
    color: '#0b2727',
    marginBottom: '7px',
};

const field = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '10px',
    border: '1px solid rgba(45, 212, 191, 0.32)',
    background: '#ffffff',
    color: '#0b2727',
    fontSize: '15px',
    lineHeight: 1.5,
    outline: 'none',
};

const hint = {
    margin: '6px 0 0 0',
    fontSize: '12px',
    color: '#4f6b6b',
};

export default function BlogCommentForm({ slug, title }) {
    const [fields, setFields] = useState({ name: '', email: '', website: '', comment: '', company: '' });
    const [captcha, setCaptcha] = useState(null);
    const [captchaAnswer, setCaptchaAnswer] = useState('');
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [error, setError] = useState('');

    // Client-only: the page is pre-rendered at build time, so generating the
    // puzzle during render would bake one answer into the HTML and then
    // disagree with the browser on hydration.
    useEffect(() => {
        setCaptcha(generateMathChallenge());
    }, []);

    // A new puzzle per post, so moving between articles never reuses one.
    useEffect(() => {
        setStatus('idle');
        setError('');
        setCaptchaAnswer('');
        setCaptcha(generateMathChallenge());
    }, [slug]);

    const update = event => {
        const { name, value } = event.target;
        setFields(previous => ({ ...previous, [name]: value }));
    };

    const resetCaptcha = () => {
        setCaptcha(generateMathChallenge());
        setCaptchaAnswer('');
    };

    const handleSubmit = async event => {
        event.preventDefault();
        if (status === 'sending') return;

        if (!fields.name.trim() || !fields.email.trim() || !fields.comment.trim()) {
            setError('Please fill in your name, email and comment.');
            setStatus('error');
            return;
        }

        if (!captcha || captchaAnswer.trim() === '') {
            setError('Please answer the security question.');
            setStatus('error');
            return;
        }

        setStatus('sending');
        setError('');

        try {
            const baseUrl = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_URL || '');
            const response = await fetch(`${baseUrl}/api/blog-comment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: fields.name.trim(),
                    email: fields.email.trim(),
                    website: fields.website.trim(),
                    comment: fields.comment.trim(),
                    company: fields.company,
                    slug,
                    title,
                    captcha: {
                        a: captcha.a,
                        b: captcha.b,
                        op: captcha.op,
                        answer: captchaAnswer.trim(),
                    },
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Could not send your comment. Please try again later.');
            }

            setStatus('success');
            setFields({ name: '', email: '', website: '', comment: '', company: '' });
            resetCaptcha();
        } catch (submitError) {
            setError(submitError.message);
            setStatus('error');
            resetCaptcha();
        }
    };

    if (status === 'success') {
        return (
            <section
                id="comments"
                style={{
                    marginTop: '56px',
                    padding: '32px 28px',
                    borderRadius: '18px',
                    background: 'linear-gradient(135deg, #f0fdfa 0%, #ecfdf5 100%)',
                    border: '1px solid rgba(45, 212, 191, 0.26)',
                    textAlign: 'center',
                }}
            >
                <CheckCircle2 size={40} color="#0d7377" strokeWidth={2.2} />
                <h2 style={{ fontSize: '21px', fontWeight: 800, color: '#0b2727', margin: '14px 0 8px' }}>
                    Thanks for your comment
                </h2>
                <p style={{ margin: '0 auto', maxWidth: '460px', fontSize: '14.5px', color: '#4f6b6b', lineHeight: 1.7 }}>
                    It has gone straight to the Data Marketics team. If it needs a reply, we will come
                    back to you at the email address you gave.
                </p>
                <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    style={{
                        marginTop: '20px',
                        background: 'none',
                        border: 'none',
                        color: '#0d7377',
                        fontWeight: 700,
                        fontSize: '14px',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                    }}
                >
                    Leave another comment
                </button>
            </section>
        );
    }

    return (
        <section
            id="comments"
            style={{
                marginTop: '56px',
                paddingTop: '36px',
                borderTop: '1px solid rgba(45, 212, 191, 0.22)',
            }}
        >
            <p
                style={{
                    fontSize: '11.5px',
                    fontWeight: 800,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#0d7377',
                    margin: '0 0 12px 0',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                }}
            >
                <MessageSquare size={13} /> Join the conversation
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0b2727', margin: '0 0 10px' }}>
                Leave a comment
            </h2>
            <p style={{ fontSize: '14.5px', color: '#4f6b6b', lineHeight: 1.7, margin: '0 0 26px', maxWidth: '620px' }}>
                Have a question about this article, or something to add? Your comment goes directly to
                the Data Marketics team by email — it is not published on the page — and we reply to
                the address you leave.
            </p>

            <form
                onSubmit={handleSubmit}
                noValidate
                style={{
                    padding: '26px 24px',
                    borderRadius: '18px',
                    background: '#ffffff',
                    border: '1px solid rgba(45, 212, 191, 0.24)',
                    boxShadow: '0 12px 34px rgba(13, 115, 119, 0.07)',
                }}
            >
                {/* Honeypot. Hidden from people, irresistible to bots; the
                    server drops any submission that fills it. */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
                    <label htmlFor="dm-comment-company">Company</label>
                    <input
                        id="dm-comment-company"
                        name="company"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={fields.company}
                        onChange={update}
                    />
                </div>

                <div className="row g-3">
                    <div className="col-12 col-md-6">
                        <label htmlFor="dm-comment-name" style={label}>
                            Name <span style={{ color: '#be123c' }}>*</span>
                        </label>
                        <input
                            id="dm-comment-name"
                            name="name"
                            type="text"
                            required
                            maxLength={80}
                            autoComplete="name"
                            placeholder="Your name"
                            value={fields.name}
                            onChange={update}
                            style={field}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="dm-comment-email" style={label}>
                            Email <span style={{ color: '#be123c' }}>*</span>
                        </label>
                        <input
                            id="dm-comment-email"
                            name="email"
                            type="email"
                            required
                            maxLength={160}
                            autoComplete="email"
                            placeholder="you@company.com"
                            value={fields.email}
                            onChange={update}
                            style={field}
                        />
                        <p style={hint}>Never published. Used only to reply to you.</p>
                    </div>

                    <div className="col-12">
                        <label htmlFor="dm-comment-website" style={label}>
                            Website <span style={{ fontWeight: 500, color: '#4f6b6b' }}>(optional)</span>
                        </label>
                        <input
                            id="dm-comment-website"
                            name="website"
                            type="url"
                            maxLength={200}
                            autoComplete="url"
                            placeholder="https://yourcompany.com"
                            value={fields.website}
                            onChange={update}
                            style={field}
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="dm-comment-body" style={label}>
                            Comment <span style={{ color: '#be123c' }}>*</span>
                        </label>
                        <textarea
                            id="dm-comment-body"
                            name="comment"
                            required
                            rows={6}
                            maxLength={MAX_COMMENT}
                            placeholder="Share your thoughts or ask a question about this article…"
                            value={fields.comment}
                            onChange={update}
                            style={{ ...field, resize: 'vertical', minHeight: '140px' }}
                        />
                        <p style={hint}>
                            {fields.comment.length} / {MAX_COMMENT} characters
                        </p>
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="dm-comment-captcha" style={label}>
                            Security check: what is{' '}
                            <span style={{ fontFamily: 'monospace', fontSize: '16px' }}>
                                {captcha ? `${captcha.a} ${captcha.op} ${captcha.b}` : '…'}
                            </span>{' '}
                            ? <span style={{ color: '#be123c' }}>*</span>
                        </label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <input
                                id="dm-comment-captcha"
                                name="captchaAnswer"
                                type="text"
                                inputMode="numeric"
                                required
                                autoComplete="off"
                                placeholder="Answer"
                                value={captchaAnswer}
                                onChange={event => setCaptchaAnswer(event.target.value)}
                                style={{ ...field, maxWidth: '140px' }}
                            />
                            <button
                                type="button"
                                onClick={resetCaptcha}
                                aria-label="Show a different security question"
                                title="Show a different security question"
                                style={{
                                    border: '1px solid rgba(45, 212, 191, 0.32)',
                                    background: '#f0fdfa',
                                    borderRadius: '10px',
                                    padding: '0 12px',
                                    color: '#0d7377',
                                    cursor: 'pointer',
                                }}
                            >
                                <RefreshCw size={15} />
                            </button>
                        </div>
                    </div>
                </div>

                {status === 'error' && error && (
                    <p
                        role="alert"
                        style={{
                            margin: '18px 0 0',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            background: '#fef2f2',
                            border: '1px solid #fecaca',
                            color: '#9f1239',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <AlertCircle size={16} /> {error}
                    </p>
                )}

                <div style={{ marginTop: '22px' }}>
                    <button
                        type="submit"
                        className="theme-btn2"
                        disabled={status === 'sending'}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '9px',
                            opacity: status === 'sending' ? 0.65 : 1,
                            cursor: status === 'sending' ? 'wait' : 'pointer',
                        }}
                    >
                        {status === 'sending' ? 'Sending…' : 'Post comment'} <Send size={15} />
                    </button>
                </div>
            </form>
        </section>
    );
}
