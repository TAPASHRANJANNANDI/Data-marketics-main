import React, { useState, useEffect, useRef } from 'react';

const SCROLL_THRESHOLD = 0.4; // Trigger at 40% scroll depth
const DISMISS_RESET_MS = 10000; // 10 seconds
const STORAGE_KEY = 'pd_popup_dismissed_at';
const SUCCESS_KEY = 'pd_popup_success';

const NAME_REGEX = /^[a-zA-Z][a-zA-Z ]{2,50}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[+\d\s\-(). ]{7,20}$/;

export default function LeadPopup() {
    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [fields, setFields] = useState({ name: '', email: '', phone: '' });
    const [errors, setErrors] = useState({});
    const abortControllerRef = useRef(null);

    useEffect(() => {
        // If they already succeeded, never show again on this device
        if (localStorage.getItem(SUCCESS_KEY)) return;

        const checkAndShow = () => {
            const dismissedAt = sessionStorage.getItem(STORAGE_KEY);
            if (dismissedAt) {
                const timePassed = Date.now() - parseInt(dismissedAt, 10);
                if (timePassed < DISMISS_RESET_MS) return false;
            }
            return true;
        };

        let isTick = false;
        const handleScroll = () => {
            if (isTick) return;
            isTick = true;

            requestAnimationFrame(() => {
                if (!checkAndShow()) {
                    isTick = false;
                    return;
                }

                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                
                if (docHeight <= 0 || (scrollTop / docHeight >= SCROLL_THRESHOLD)) {
                    setVisible(true);
                    window.removeEventListener('scroll', handleScroll);
                }
                isTick = false;
            });
        };

        const safetyTimer = setTimeout(() => {
            if (checkAndShow()) {
                setVisible(true);
                window.removeEventListener('scroll', handleScroll);
            }
        }, 10000);

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(safetyTimer);
            if (abortControllerRef.current) abortControllerRef.current.abort();
        };
    }, [visible]); // Re-run when visible changes to reset the triggers if dismissed

    const dismiss = () => {
        sessionStorage.setItem(STORAGE_KEY, Date.now().toString());
        if (abortControllerRef.current) abortControllerRef.current.abort();
        setVisible(false);
    };

    const validate = () => {
        const errs = {};
        if (!NAME_REGEX.test(fields.name.trim())) {
            errs.name = 'Please enter a valid full name (min 3 characters, letters only).';
        }
        if (!EMAIL_REGEX.test(fields.email.trim())) {
            errs.email = 'Please enter a valid company email address.';
        }
        if (fields.phone.trim() && !PHONE_REGEX.test(fields.phone.trim())) {
            errs.phone = 'Please enter a valid phone number.';
        }
        return errs;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === 'sending') return;

        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        setStatus('sending');
        if (abortControllerRef.current) abortControllerRef.current.abort();
        abortControllerRef.current = new AbortController();

        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: abortControllerRef.current.signal,
                body: JSON.stringify({
                    first_name: fields.name.trim(),
                    email: fields.email.trim(),
                    phone: fields.phone.trim() || undefined,
                    source: 'popup',
                }),
            });

            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.message || 'Failed');

            setStatus('success');
            localStorage.setItem(SUCCESS_KEY, 'true');

            setTimeout(() => {
                setVisible(false);
            }, 3000);
        } catch (err) {
            if (err.name === 'AbortError') return;
            setStatus('error');
        } finally {
            abortControllerRef.current = null;
        }
    };

    if (!visible) return null;

    return (
        <div style={styles.backdrop} onClick={(e) => e.target === e.currentTarget && dismiss()}>
            <div style={styles.modal} role="dialog" aria-modal="true" aria-label="Contact Us" onClick={(e) => e.stopPropagation()}>
                <div style={styles.topStripe} />
                <button style={styles.closeBtn} onClick={dismiss} aria-label="Close popup">×</button>

                {status === 'success' ? (
                    <div style={styles.successBox}>
                        <div style={styles.checkCircle}>
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <h3 style={styles.successTitle}>Thank You!</h3>
                        <p style={styles.successText}>Our team will get back to you within 24 hours.</p>
                    </div>
                ) : (
                    <>
                        <div style={styles.header}>
                            <h2 style={styles.headline}>Looking for Verified B2B Contact Data?</h2>
                            <p style={styles.subtext}>Fill in your details and our team will get back to you within 24 hours.</p>
                        </div>

                        <form onSubmit={handleSubmit} style={styles.form} noValidate>
                            <div style={styles.fieldGroup}>
                                <label style={styles.label} htmlFor="popup-name">Full Name <span style={styles.req}>*</span></label>
                                <input id="popup-name" name="name" type="text" value={fields.name} onChange={handleChange} placeholder="e.g. James Carter" style={{ ...styles.input, ...(errors.name ? styles.inputError : {}) }} disabled={status === 'sending'} autoComplete="name" />
                                {errors.name && <p style={styles.errorMsg}>{errors.name}</p>}
                            </div>

                            <div style={styles.fieldGroup}>
                                <label style={styles.label} htmlFor="popup-email">Company Email <span style={styles.req}>*</span></label>
                                <input id="popup-email" name="email" type="email" value={fields.email} onChange={handleChange} placeholder="e.g. james@company.com" style={{ ...styles.input, ...(errors.email ? styles.inputError : {}) }} disabled={status === 'sending'} autoComplete="email" />
                                {errors.email && <p style={styles.errorMsg}>{errors.email}</p>}
                            </div>

                            <div style={styles.fieldGroup}>
                                <label style={styles.label} htmlFor="popup-phone">Phone Number <span style={styles.optional}>(Optional)</span></label>
                                <input id="popup-phone" name="phone" type="tel" value={fields.phone} onChange={handleChange} placeholder="e.g. +1 609 123 4567" style={{ ...styles.input, ...(errors.phone ? styles.inputError : {}) }} disabled={status === 'sending'} autoComplete="tel" />
                                {errors.phone && <p style={styles.errorMsg}>{errors.phone}</p>}
                            </div>

                            {status === 'error' && <p style={styles.errorBanner}>Something went wrong. Please check your connection.</p>}

                            <button type="submit" style={{ ...styles.submitBtn, opacity: status === 'sending' ? 0.7 : 1 }} disabled={status === 'sending'}>
                                {status === 'sending' ? 'Sending...' : 'Send Message'}
                            </button>

                            <button type="button" style={styles.dismissLink} onClick={dismiss}>
                                No thanks, I'll pass this time
                            </button>
                        </form>
                    </>
                )}
            </div>
            <style>{`
                @keyframes dm-popup-slidein {
                    from { opacity: 0; transform: translateY(40px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes dm-spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}

const styles = {
    backdrop: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.55)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box' },
    modal: { position: 'relative', zIndex: 9001, width: '100%', maxWidth: '460px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 20px 60px rgba(0, 86, 179, 0.2)', overflow: 'hidden', animation: 'dm-popup-slidein 0.4s cubic-bezier(0.16, 1, 0.3, 1) both' },
    topStripe: { height: '6px', background: 'linear-gradient(135deg, #0056b3, #007bff, #f39c12)' },
    closeBtn: { position: 'absolute', top: '12px', right: '16px', background: 'none', border: 'none', fontSize: '26px', color: '#888', cursor: 'pointer', lineHeight: 1, padding: '4px 8px', borderRadius: '4px', transition: 'color 0.2s', zIndex: 1 },
    header: { padding: '30px 32px 0', textAlign: 'center' },
    headline: { fontSize: '20px', fontWeight: '700', color: '#0d1b3e', margin: '0 0 10px 0', lineHeight: '1.3' },
    subtext: { fontSize: '14px', color: '#6b7280', margin: '0', lineHeight: '1.5' },
    form: { padding: '20px 32px 28px' },
    fieldGroup: { marginBottom: '16px' },
    label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' },
    req: { color: '#e53e3e', marginLeft: '2px' },
    optional: { color: '#9ca3af', fontWeight: '400', fontSize: '12px', marginLeft: '4px' },
    input: { width: '100%', padding: '10px 14px', border: '1.5px solid #d1d5db', borderRadius: '8px', fontSize: '14px', color: '#111827', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s', fontFamily: 'inherit', backgroundColor: '#fafafa' },
    inputError: { borderColor: '#e53e3e', backgroundColor: '#fff5f5' },
    errorMsg: { margin: '5px 0 0 0', fontSize: '12px', color: '#e53e3e' },
    errorBanner: { backgroundColor: '#fff5f5', border: '1px solid #fed7d7', borderRadius: '6px', padding: '10px 14px', fontSize: '13px', color: '#c53030', marginBottom: '12px' },
    submitBtn: { width: '100%', padding: '13px', background: 'linear-gradient(135deg, #0056b3, #007bff)', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'opacity 0.2s', marginTop: '4px', fontFamily: 'inherit' },
    dismissLink: { display: 'block', width: '100%', background: 'none', border: 'none', textAlign: 'center', marginTop: '12px', fontSize: '13px', color: '#9ca3af', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit', padding: 0 },
    successBox: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '50px 32px', textAlign: 'center' },
    checkCircle: { width: '72px', height: '72px', borderRadius: '50%', backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' },
    successTitle: { fontSize: '24px', fontWeight: '700', color: '#0d1b3e', margin: '0 0 10px 0' },
    successText: { fontSize: '15px', color: '#6b7280', margin: 0, lineHeight: '1.5' },
};
