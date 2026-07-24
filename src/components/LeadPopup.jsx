import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import PhoneInput, { isValidPhoneNumber, getCountryCallingCode } from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import 'react-phone-number-input/style.css';

// Custom searchable country dropdown. Replaces the native <select> the
// library uses by default, which was rendering the OS country list far
// outside the popup on desktop browsers.
function CountrySelect({ value, onChange, options, disabled, iconComponent: Icon, ariaLabel }) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [pos, setPos] = useState({ top: 0, left: 0, width: 320 });
    const btnRef = useRef(null);
    const dropdownRef = useRef(null);
    const searchRef = useRef(null);

    // Position the fixed dropdown from the button's viewport rect. Runs
    // synchronously before paint so the dropdown never flashes at (0,0).
    // Uses viewport dimensions so the dropdown flips upward or shrinks
    // when it would overflow the screen.
    useLayoutEffect(() => {
        if (!open || !btnRef.current) return;
        const rect = btnRef.current.getBoundingClientRect();
        const dropdownW = Math.min(320, window.innerWidth - 24);
        const dropdownMaxH = 320;
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const flipUp = spaceBelow < dropdownMaxH && spaceAbove > spaceBelow;
        // Prefer left-aligned to the button; nudge left if we'd overflow.
        let left = rect.left;
        if (left + dropdownW > window.innerWidth - 12) {
            left = Math.max(12, window.innerWidth - 12 - dropdownW);
        }
        const top = flipUp ? rect.top - 8 : rect.bottom + 8;
        setPos({ top, left, width: dropdownW, flipUp });
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const handleClick = (e) => {
            if (btnRef.current?.contains(e.target)) return;
            if (dropdownRef.current?.contains(e.target)) return;
            setOpen(false);
        };
        const handleKey = (e) => e.key === 'Escape' && setOpen(false);
        // Close on page scroll (fixed positioning won't track scroll
        // offsets). Ignore scrolls that originate *inside* the dropdown
        // itself — the country list is designed to scroll internally.
        const handlePageScroll = (e) => {
            if (dropdownRef.current?.contains(e.target)) return;
            setOpen(false);
        };
        const handleResize = () => setOpen(false);
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleKey);
        window.addEventListener('scroll', handlePageScroll, true);
        window.addEventListener('resize', handleResize);
        searchRef.current?.focus();
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleKey);
            window.removeEventListener('scroll', handlePageScroll, true);
            window.removeEventListener('resize', handleResize);
        };
    }, [open]);

    const q = search.trim().toLowerCase();
    const filtered = q
        ? options.filter(o =>
            (o.label && o.label.toLowerCase().includes(q)) ||
            (o.value && o.value.toLowerCase().includes(q))
        )
        : options;

    const dropdown = open ? createPortal(
        <div
            ref={dropdownRef}
            className="dm-country-dropdown"
            role="listbox"
            style={{
                top: pos.flipUp ? 'auto' : pos.top,
                bottom: pos.flipUp ? window.innerHeight - pos.top : 'auto',
                left: pos.left,
                width: pos.width,
            }}
        >
            <div className="dm-country-search-wrap">
                <input
                    ref={searchRef}
                    type="text"
                    className="dm-country-search"
                    placeholder="Search country..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    aria-label="Search countries"
                />
            </div>
            <ul className="dm-country-list">
                {filtered.map((opt) => {
                    if (opt.divider) return null;
                    const Flag = opt.value ? flags[opt.value] : null;
                    let callingCode = null;
                    if (opt.value) {
                        try { callingCode = getCountryCallingCode(opt.value); } catch (_) {}
                    }
                    const isActive = opt.value === value;
                    return (
                        <li
                            key={opt.value || 'intl'}
                            className={`dm-country-item${isActive ? ' is-active' : ''}`}
                            role="option"
                            aria-selected={isActive}
                            onClick={() => {
                                onChange(opt.value);
                                setOpen(false);
                                setSearch('');
                            }}
                        >
                            <span className="dm-country-flag">
                                {Flag ? <Flag title={opt.label} /> : <span aria-hidden="true">🌐</span>}
                            </span>
                            <span className="dm-country-name">{opt.label || 'International'}</span>
                            {callingCode && <span className="dm-country-code">+{callingCode}</span>}
                        </li>
                    );
                })}
                {filtered.length === 0 && (
                    <li className="dm-country-empty">No matches</li>
                )}
            </ul>
        </div>,
        document.body
    ) : null;

    return (
        <div className="dm-country-select">
            <button
                ref={btnRef}
                type="button"
                className="dm-country-btn"
                onClick={() => !disabled && setOpen(o => !o)}
                disabled={disabled}
                aria-label={ariaLabel || 'Select country'}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                {Icon ? (
                    <Icon country={value} label="" aspectRatio={1} />
                ) : (
                    <span className="dm-country-globe">🌐</span>
                )}
                <span className="dm-country-caret" aria-hidden="true">▾</span>
            </button>
            {dropdown}
        </div>
    );
}

const SCROLL_THRESHOLD = 0.4; // Trigger at 40% scroll depth
const DISMISS_RESET_MS = 10000; // 10 seconds
const STORAGE_KEY = 'pd_popup_dismissed_at';
const SUCCESS_KEY = 'pd_popup_success';
const SHOW_COUNT_KEY = 'pd_popup_show_count';
const MAX_SHOWS_PER_SESSION = 2;

const NAME_REGEX = /^[a-zA-Z][a-zA-Z ]{2,50}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function LeadPopup() {
    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [fields, setFields] = useState({ name: '', email: '', phone: '' });
    const [errors, setErrors] = useState({});
    const abortControllerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // If they already succeeded, never show again on this device
        if (localStorage.getItem(SUCCESS_KEY)) return;

        const checkAndShow = () => {
            const showCount = parseInt(sessionStorage.getItem(SHOW_COUNT_KEY) || '0', 10);
            if (showCount >= MAX_SHOWS_PER_SESSION) return false;

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

    // Every time the popup becomes visible, increment the per-session show
    // counter. Once it reaches MAX_SHOWS_PER_SESSION the checkAndShow guard
    // above will refuse to open it again for the rest of the session.
    useEffect(() => {
        if (!visible) return;
        const current = parseInt(sessionStorage.getItem(SHOW_COUNT_KEY) || '0', 10);
        sessionStorage.setItem(SHOW_COUNT_KEY, String(current + 1));
    }, [visible]);

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
        // Phone is optional. If provided, it must be a valid number for the
        // selected country per libphonenumber-js metadata.
        if (fields.phone && !isValidPhoneNumber(fields.phone)) {
            errs.phone = 'Please enter a valid phone number for the selected country.';
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

            // Mark the popup as satisfied for the rest of this browser, hide
            // it, and hand the user off to the celebratory /thank-you page
            // instead of the inline success box (which briefly flashed before).
            localStorage.setItem(SUCCESS_KEY, 'true');
            setVisible(false);
            navigate('/thank-you');
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
                                <div className={`dm-phone-wrap ${errors.phone ? 'has-error' : ''}`}>
                                    <PhoneInput
                                        id="popup-phone"
                                        name="phone"
                                        international
                                        withCountryCallingCode
                                        defaultCountry="US"
                                        countrySelectComponent={CountrySelect}
                                        flags={flags}
                                        value={fields.phone}
                                        onChange={(value) => {
                                            setFields(prev => ({ ...prev, phone: value || '' }));
                                            if (errors.phone) {
                                                setErrors(prev => ({ ...prev, phone: undefined }));
                                            }
                                        }}
                                        placeholder="Enter phone number"
                                        disabled={status === 'sending'}
                                        autoComplete="tel"
                                    />
                                </div>
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

                /* PhoneInput theme override — match the other popup inputs */
                .dm-phone-wrap .PhoneInput {
                    width: 100%;
                    padding: 4px 12px;
                    border: 1.5px solid #d8eeea;
                    border-radius: 10px;
                    background-color: #f0fdfa;
                    box-sizing: border-box;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .dm-phone-wrap.has-error .PhoneInput {
                    border-color: #e53e3e;
                    background-color: #fff5f5;
                }
                .dm-phone-wrap .PhoneInput--focus,
                .dm-phone-wrap .PhoneInput:focus-within {
                    border-color: #14b8a6;
                    box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.18);
                }
                .dm-phone-wrap .PhoneInputInput {
                    padding: 8px 4px;
                    background: transparent;
                    border: none;
                    outline: none;
                    font-size: 14px;
                    color: #0b2727;
                    font-family: inherit;
                    width: 100%;
                    min-width: 0;
                }
                .dm-phone-wrap .PhoneInputInput::placeholder {
                    color: #94a8a8;
                }
                .dm-phone-wrap .PhoneInputInput:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                /* Custom country select — searchable dropdown */
                .dm-country-select {
                    position: relative;
                    margin-right: 10px;
                    padding-right: 10px;
                    border-right: 1px solid rgba(20, 184, 166, 0.25);
                    display: flex;
                    align-items: center;
                    flex-shrink: 0;
                }
                .dm-country-btn {
                    background: transparent;
                    border: none;
                    padding: 6px 4px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    cursor: pointer;
                    border-radius: 6px;
                    transition: background 0.15s;
                    font-family: inherit;
                }
                .dm-country-btn:hover:not(:disabled) {
                    background: rgba(20, 184, 166, 0.08);
                }
                .dm-country-btn:disabled {
                    cursor: not-allowed;
                    opacity: 0.5;
                }
                .dm-country-btn > :first-child {
                    width: 24px;
                    height: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .dm-country-btn > :first-child svg,
                .dm-country-btn > :first-child img {
                    width: 24px;
                    height: 18px;
                    display: block;
                    border-radius: 2px;
                    object-fit: cover;
                }
                .dm-country-caret {
                    color: #0d7377;
                    font-size: 12px;
                    line-height: 1;
                    opacity: 0.75;
                }
                .dm-country-globe {
                    font-size: 18px;
                }

                /* Rendered via portal to document.body so it can escape the
                   modal's overflow: hidden. Position (top/left/width) is
                   computed from the button's viewport rect in JS. */
                .dm-country-dropdown {
                    position: fixed;
                    z-index: 100000;
                    background: #ffffff;
                    border: 1px solid rgba(20, 184, 166, 0.25);
                    border-radius: 12px;
                    box-shadow: 0 18px 40px rgba(13, 115, 119, 0.28);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    max-height: 320px;
                    animation: dm-country-fadein 0.15s ease-out both;
                }
                @keyframes dm-country-fadein {
                    from { opacity: 0; transform: translateY(-4px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .dm-country-search-wrap {
                    padding: 10px;
                    border-bottom: 1px solid rgba(20, 184, 166, 0.18);
                    background: #f0fdfa;
                    flex-shrink: 0;
                }
                .dm-country-search {
                    width: 100%;
                    padding: 8px 12px;
                    border: 1.5px solid #d8eeea;
                    border-radius: 8px;
                    font-size: 14px;
                    color: #0b2727;
                    background: #ffffff;
                    outline: none;
                    box-sizing: border-box;
                    font-family: inherit;
                    transition: border-color 0.15s, box-shadow 0.15s;
                }
                .dm-country-search:focus {
                    border-color: #14b8a6;
                    box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.18);
                }
                .dm-country-list {
                    list-style: none;
                    margin: 0;
                    padding: 4px 0;
                    overflow-y: auto;
                    flex: 1 1 auto;
                }
                .dm-country-list::-webkit-scrollbar {
                    width: 8px;
                }
                .dm-country-list::-webkit-scrollbar-thumb {
                    background: rgba(20, 184, 166, 0.3);
                    border-radius: 8px;
                }
                .dm-country-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 8px 12px;
                    cursor: pointer;
                    font-size: 14px;
                    color: #0b2727;
                    transition: background 0.12s;
                }
                .dm-country-item:hover {
                    background: rgba(20, 184, 166, 0.10);
                }
                .dm-country-item.is-active {
                    background: rgba(20, 184, 166, 0.16);
                    font-weight: 600;
                }
                .dm-country-flag {
                    width: 24px;
                    height: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .dm-country-flag svg,
                .dm-country-flag img {
                    width: 24px;
                    height: 18px;
                    display: block;
                    border-radius: 2px;
                    object-fit: cover;
                }
                .dm-country-name {
                    flex: 1 1 auto;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .dm-country-code {
                    color: #4f6b6b;
                    font-size: 13px;
                    flex-shrink: 0;
                }
                .dm-country-empty {
                    padding: 20px 12px;
                    text-align: center;
                    color: #94a8a8;
                    font-size: 13px;
                }

            `}</style>
        </div>
    );
}

const styles = {
    backdrop: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(6, 78, 74, 0.55)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box', backdropFilter: 'blur(6px)' },
    modal: { position: 'relative', zIndex: 9001, width: '100%', maxWidth: '460px', backgroundColor: '#ffffff', borderRadius: '18px', boxShadow: '0 25px 70px rgba(13, 115, 119, 0.35)', overflow: 'hidden', animation: 'dm-popup-slidein 0.4s cubic-bezier(0.16, 1, 0.3, 1) both' },
    topStripe: { height: '6px', background: 'linear-gradient(135deg, #0d7377 0%, #14b8a6 50%, #2dd4bf 100%)' },
    closeBtn: { position: 'absolute', top: '12px', right: '16px', background: 'none', border: 'none', fontSize: '26px', color: '#4f6b6b', cursor: 'pointer', lineHeight: 1, padding: '4px 8px', borderRadius: '4px', transition: 'color 0.2s', zIndex: 1 },
    header: { padding: '32px 32px 0', textAlign: 'center' },
    headline: { fontSize: '22px', fontWeight: '700', color: '#0b2727', margin: '0 0 10px 0', lineHeight: '1.3' },
    subtext: { fontSize: '14px', color: '#4f6b6b', margin: '0', lineHeight: '1.5' },
    form: { padding: '22px 32px 30px' },
    fieldGroup: { marginBottom: '16px' },
    label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#0b2727', marginBottom: '6px' },
    req: { color: '#e53e3e', marginLeft: '2px' },
    optional: { color: '#94a8a8', fontWeight: '400', fontSize: '12px', marginLeft: '4px' },
    input: { width: '100%', padding: '12px 16px', border: '1.5px solid #d8eeea', borderRadius: '10px', fontSize: '14px', color: '#0b2727', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s, box-shadow 0.2s', fontFamily: 'inherit', backgroundColor: '#f0fdfa' },
    inputError: { borderColor: '#e53e3e', backgroundColor: '#fff5f5' },
    errorMsg: { margin: '5px 0 0 0', fontSize: '12px', color: '#e53e3e' },
    errorBanner: { backgroundColor: '#fff5f5', border: '1px solid #fed7d7', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#c53030', marginBottom: '12px' },
    submitBtn: { width: '100%', padding: '14px', background: 'linear-gradient(135deg, #0d7377 0%, #14b8a6 50%, #2dd4bf 100%)', color: '#ffffff', border: 'none', borderRadius: '999px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s, opacity 0.2s', marginTop: '4px', fontFamily: 'inherit', boxShadow: '0 14px 30px rgba(20, 184, 166, 0.4)', letterSpacing: '0.3px' },
    dismissLink: { display: 'block', width: '100%', background: 'none', border: 'none', textAlign: 'center', marginTop: '14px', fontSize: '13px', color: '#94a8a8', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit', padding: 0 },
    successBox: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '50px 32px', textAlign: 'center' },
    checkCircle: { width: '76px', height: '76px', borderRadius: '50%', background: 'linear-gradient(135deg, #0d7377 0%, #14b8a6 50%, #2dd4bf 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '22px', boxShadow: '0 14px 32px rgba(20, 184, 166, 0.45)' },
    successTitle: { fontSize: '26px', fontWeight: '800', color: '#0b2727', margin: '0 0 10px 0' },
    successText: { fontSize: '15px', color: '#4f6b6b', margin: 0, lineHeight: '1.5' },
};
