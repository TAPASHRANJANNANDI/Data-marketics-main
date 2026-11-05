// GA4 conversion events.
//
// gtag.js is loaded in index.html, so `generate_lead` just needs pushing when
// a form actually succeeds. Mark it as a conversion in GA4 under
// Admin > Events > Mark as key event, then import it into Google Ads if the
// campaigns need it.
//
// Safe to call before gtag has loaded and on the pre-rendered server pass:
// both simply no-op.
export const trackFormSubmission = (formName) => {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

    window.gtag('event', 'generate_lead', {
        form_name: formName,
        page_path: window.location.pathname,
    });
};
