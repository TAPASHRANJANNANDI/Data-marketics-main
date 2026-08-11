import React, { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Clock, ChevronDown, Sparkles } from 'lucide-react';
import blogs, { getBlogBySlug } from '../data/blogs';

function formatDate(iso) {
    try {
        return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (_) { return iso; }
}

// ---- Block renderers ----------------------------------------------------

function Para({ text }) {
    return <p style={{ fontSize: '17px', lineHeight: 1.8, color: '#2c4a4a', margin: '0 0 18px' }}>{text}</p>;
}
function H2({ text }) {
    return <h2 style={{
        fontSize: 'clamp(24px, 3.2vw, 30px)', fontWeight: 800, color: '#0b2727',
        margin: '44px 0 16px', lineHeight: 1.25, letterSpacing: '-0.01em',
        paddingLeft: '14px', borderLeft: '4px solid #14b8a6',
    }}>{text}</h2>;
}
function H3({ text }) {
    return <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0b2727', margin: '28px 0 12px', lineHeight: 1.35 }}>{text}</h3>;
}
function UL({ items }) {
    return (
        <ul style={{ margin: '0 0 22px', paddingLeft: 0, listStyle: 'none' }}>
            {items.map((it, i) => (
                <li key={i} style={{ position: 'relative', paddingLeft: '26px', margin: '8px 0', color: '#2c4a4a', fontSize: '16.5px', lineHeight: 1.7 }}>
                    <span aria-hidden="true" style={{ position: 'absolute', left: '4px', top: '11px', width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg,#0d7377,#2dd4bf)' }} />
                    {it}
                </li>
            ))}
        </ul>
    );
}
function OL({ items }) {
    return (
        <ol style={{ margin: '0 0 22px', paddingLeft: 0, listStyle: 'none', counterReset: 'dm-ol' }}>
            {items.map((it, i) => (
                <li key={i} style={{ counterIncrement: 'dm-ol', position: 'relative', paddingLeft: '38px', margin: '10px 0', color: '#2c4a4a', fontSize: '16.5px', lineHeight: 1.7 }}>
                    <span aria-hidden="true" style={{
                        position: 'absolute', left: 0, top: '2px',
                        width: '26px', height: '26px', borderRadius: '50%',
                        background: 'linear-gradient(135deg,#0d7377,#14b8a6)', color: '#fff',
                        fontSize: '12.5px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{i + 1}</span>
                    {it}
                </li>
            ))}
        </ol>
    );
}
function Table({ headers, rows }) {
    return (
        <div style={{ margin: '18px 0 26px', overflowX: 'auto', borderRadius: '14px', border: '1px solid rgba(45,212,191,0.28)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '520px' }}>
                <thead>
                    <tr>
                        {headers.map((h, i) => (
                            <th key={i} style={{
                                background: 'linear-gradient(135deg,#0d7377,#14b8a6)', color: '#fff',
                                padding: '14px 18px', fontSize: '14px', fontWeight: 700,
                                textAlign: 'left', letterSpacing: '0.02em',
                            }}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, ri) => (
                        <tr key={ri} style={{ background: ri % 2 === 0 ? '#f0fdfa' : '#ffffff' }}>
                            {row.map((cell, ci) => (
                                <td key={ci} style={{
                                    padding: '13px 18px', fontSize: '15px', color: '#0b2727',
                                    borderTop: '1px solid rgba(45,212,191,0.18)', lineHeight: 1.6,
                                }}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
function Flow({ steps }) {
    return (
        <div style={{ margin: '18px 0 26px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {steps.map((s, i) => (
                <React.Fragment key={i}>
                    <div style={{
                        display: 'flex', gap: '14px', alignItems: 'flex-start',
                        background: 'linear-gradient(135deg,#f0fdfa 0%,#ecfdf5 100%)',
                        border: '1px solid rgba(45,212,191,0.22)',
                        borderRadius: '12px', padding: '14px 18px',
                    }}>
                        <div style={{
                            flex: '0 0 auto', width: '32px', height: '32px', borderRadius: '50%',
                            background: 'linear-gradient(135deg,#0d7377,#14b8a6)', color: '#fff',
                            fontSize: '13px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>{i + 1}</div>
                        <div>
                            <p style={{ margin: '0 0 4px', fontWeight: 700, color: '#0b2727', fontSize: '15.5px' }}>{s.title}</p>
                            <p style={{ margin: 0, color: '#4f6b6b', fontSize: '15px', lineHeight: 1.65 }}>{s.text}</p>
                        </div>
                    </div>
                    {i < steps.length - 1 && (
                        <div aria-hidden="true" style={{ textAlign: 'center' }}>
                            <ChevronDown size={18} color="#0d7377" style={{ opacity: 0.55 }} />
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
function Note({ text }) {
    return (
        <div style={{
            display: 'flex', gap: '12px', alignItems: 'flex-start',
            background: 'linear-gradient(135deg,#fefce8 0%,#fef9c3 100%)',
            border: '1px solid #fde68a',
            borderRadius: '12px', padding: '14px 18px', margin: '18px 0 24px',
        }}>
            <Sparkles size={18} color="#a16207" style={{ marginTop: '3px', flexShrink: 0 }} />
            <p style={{ margin: 0, color: '#713f12', fontSize: '15px', lineHeight: 1.7 }}>{text}</p>
        </div>
    );
}
function FAQ({ items }) {
    return (
        <div style={{ margin: '18px 0 26px' }}>
            {items.map((it, i) => <FAQItem key={i} q={it.q} a={it.a} defaultOpen={i === 0} />)}
        </div>
    );
}
function FAQItem({ q, a, defaultOpen }) {
    const [open, setOpen] = useState(!!defaultOpen);
    return (
        <div style={{ borderRadius: '12px', border: `1px solid ${open ? '#2dd4bf' : 'rgba(45,212,191,0.24)'}`, marginBottom: '10px', background: '#fff', overflow: 'hidden', transition: 'border-color 0.2s' }}>
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                style={{
                    width: '100%', textAlign: 'left', background: 'transparent', border: 'none',
                    padding: '15px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
                    cursor: 'pointer', color: '#0b2727', fontWeight: 700, fontSize: '15.5px', lineHeight: 1.5, fontFamily: 'inherit',
                }}
                aria-expanded={open}
            >
                <span>{q}</span>
                <ChevronDown size={18} color="#0d7377" style={{ transition: 'transform 0.25s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }} />
            </button>
            {open && (
                <div style={{ padding: '0 18px 16px', color: '#4f6b6b', fontSize: '15px', lineHeight: 1.75 }}>{a}</div>
            )}
        </div>
    );
}
function CTA({ title, text }) {
    return (
        <div style={{
            margin: '40px 0 20px',
            padding: '34px 30px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #042f2e 0%, #0d7377 60%, #14b8a6 100%)',
            color: '#fff',
            boxShadow: '0 22px 44px rgba(13,115,119,0.28)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div aria-hidden="true" style={{ position: 'absolute', top: '-80px', right: '-40px', width: '260px', height: '260px', background: 'radial-gradient(circle, rgba(94,234,212,0.30) 0%, rgba(94,234,212,0) 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: 'clamp(22px, 3vw, 26px)', fontWeight: 800, margin: '0 0 12px', lineHeight: 1.25 }}>{title}</h3>
                <p style={{ fontSize: '16px', color: '#ccfbf1', lineHeight: 1.7, margin: '0 0 22px' }}>{text}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <Link to="/contact" className="theme-btn2" style={{ background: '#ffffff', color: '#0d7377' }}>
                        Contact Sales
                    </Link>
                    <Link to="/services" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '15px',
                        padding: '12px 18px', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: '999px',
                    }}>
                        Explore Services <ArrowRight size={15} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

function renderBlock(block, idx) {
    switch (block.type) {
        case 'p': return <Para key={idx} text={block.text} />;
        case 'h2': return <H2 key={idx} text={block.text} />;
        case 'h3': return <H3 key={idx} text={block.text} />;
        case 'ul': return <UL key={idx} items={block.items} />;
        case 'ol': return <OL key={idx} items={block.items} />;
        case 'table': return <Table key={idx} headers={block.headers} rows={block.rows} />;
        case 'flow': return <Flow key={idx} steps={block.steps} />;
        case 'note': return <Note key={idx} text={block.text} />;
        case 'faq': return <FAQ key={idx} items={block.items} />;
        case 'cta': return <CTA key={idx} title={block.title} text={block.text} />;
        default: return null;
    }
}

export default function BlogPost() {
    const { slug } = useParams();
    const post = getBlogBySlug(slug);

    useEffect(() => { window.scrollTo(0, 0); }, [slug]);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    const related = blogs.filter(b => b.slug !== post.slug).slice(0, 3);
    const canonical = `https://datamarketics.com/blog/${post.slug}`;

    // BlogPosting JSON-LD for richer search results.
    const jsonLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.metaDescription,
        image: `https://datamarketics.com${post.heroImage}`,
        datePublished: post.date,
        dateModified: post.date,
        author: { '@type': 'Organization', name: 'Data Marketics' },
        publisher: {
            '@type': 'Organization', name: 'Data Marketics',
            logo: { '@type': 'ImageObject', url: 'https://datamarketics.com/og-banner.jpg' },
        },
        mainEntityOfPage: canonical,
        keywords: [post.primaryKeyword, ...(post.secondaryKeywords || [])].join(', '),
    });

    return (
        <>
            <Helmet>
                <title>{post.metaTitle}</title>
                <meta name="description" content={post.metaDescription} />
                <link rel="canonical" href={canonical} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.metaDescription} />
                <meta property="og:url" content={canonical} />
                <meta property="og:image" content={`https://datamarketics.com${post.heroImage}`} />
                <meta property="article:published_time" content={post.date} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={post.metaDescription} />
                <meta name="twitter:image" content={`https://datamarketics.com${post.heroImage}`} />
                <script type="application/ld+json">{jsonLd}</script>
            </Helmet>

            {/* HERO */}
            <div style={{ background: 'transparent', padding: '48px 20px 24px', position: 'relative' }}>
                <div className="container" style={{ maxWidth: '1100px', position: 'relative', zIndex: 1 }}>
                    <Link to="/blog" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        color: '#0d7377', textDecoration: 'none', fontWeight: 700, fontSize: '14px', marginBottom: '18px',
                    }}>
                        <ArrowLeft size={16} /> All articles
                    </Link>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                        <span style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, #ecfdf5, #ccfbf1)',
                            border: '1px solid rgba(45,212,191,0.3)',
                            borderRadius: '999px', padding: '5px 14px',
                            fontSize: '11.5px', fontWeight: 800, color: '#0d7377',
                            letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '18px',
                        }}>{post.category}</span>
                        <h1 style={{
                            fontSize: 'clamp(30px, 4.6vw, 44px)', fontWeight: 800, lineHeight: 1.18,
                            margin: '0 0 18px', color: '#0b2727', letterSpacing: '-0.01em',
                            background: 'linear-gradient(135deg, #042f2e 0%, #0d7377 50%, #14b8a6 100%)',
                            WebkitBackgroundClip: 'text', backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>{post.title}</h1>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', fontSize: '14px', color: '#4f6b6b', marginBottom: '30px' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> {formatDate(post.date)}</span>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> {post.readTime}</span>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>By <strong style={{ color: '#0b2727' }}>Data Marketics</strong></span>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(45,212,191,0.22)', boxShadow: '0 26px 60px rgba(13,115,119,0.15)' }}>
                        <div style={{ aspectRatio: '1200 / 630', background: 'linear-gradient(135deg,#042f2e,#0d7377)' }}>
                            <img src={post.heroImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ARTICLE BODY */}
            <div style={{ padding: '40px 20px 90px' }}>
                <article className="container" style={{ maxWidth: '780px', position: 'relative', zIndex: 1 }}>
                    {post.content.map((block, i) => renderBlock(block, i))}
                </article>

                {/* RELATED */}
                {related.length > 0 && (
                    <div className="container" style={{ maxWidth: '1100px', marginTop: '72px' }}>
                        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0b2727', marginBottom: '20px' }}>Continue reading</h2>
                        <div className="row g-3">
                            {related.map(rp => (
                                <div key={rp.slug} className="col-12 col-md-6 col-lg-4">
                                    <Link to={`/blog/${rp.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                                        <div style={{
                                            display: 'flex', gap: '14px', padding: '14px', borderRadius: '14px',
                                            background: '#fff', border: '1px solid rgba(45,212,191,0.2)',
                                            boxShadow: '0 8px 22px rgba(13,115,119,0.06)', height: '100%',
                                            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                                        }}
                                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 32px rgba(13,115,119,0.12)'; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(13,115,119,0.06)'; }}
                                        >
                                            <div style={{ flex: '0 0 96px', aspectRatio: '1 / 1', borderRadius: '10px', overflow: 'hidden', background: 'linear-gradient(135deg,#042f2e,#0d7377)' }}>
                                                <img src={rp.heroImage} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <span style={{ fontSize: '10.5px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0d7377' }}>{rp.category}</span>
                                                <p style={{ margin: 0, fontSize: '14.5px', fontWeight: 700, color: '#0b2727', lineHeight: 1.35 }}>{rp.title}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
