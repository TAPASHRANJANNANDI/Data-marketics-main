import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import blogs from '../data/blogs';
import { pageSchema } from '../data/schema';

const cardVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
    }),
};

function formatDate(iso) {
    try {
        return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (_) {
        return iso;
    }
}

export default function Blog() {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <>
            <Helmet>
                <title>B2B Lead Generation &amp; Data Insights Blog | Datamarketics</title>
                <meta name="description" content="Explore insights on lead generation, prospecting, business data, demand generation, sales strategies and marketing trends from Datamarketics." />
                <meta name="keywords" content="B2B lead generation blog, B2B prospecting data, B2B sales leads, B2B data provider, demand generation" />
                <link rel="canonical" href="https://datamarketics.com/blog" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Data Marketics Blog | B2B Data & Lead Generation Insights" />
                <meta property="og:description" content="Practical guides, playbooks, and insights on B2B lead generation, demand generation, intent data, and sales pipeline growth." />
                <meta property="og:url" content="https://datamarketics.com/blog" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Data Marketics Blog | B2B Data & Lead Generation Insights" />
                <meta name="twitter:description" content="Practical guides, playbooks, and insights on B2B lead generation, demand generation, intent data, and sales pipeline growth." />
                <script type="application/ld+json">{pageSchema('/blog')}</script>
            </Helmet>

            <div style={{ background: 'transparent', position: 'relative', padding: '90px 20px 120px' }}>
                <div aria-hidden="true" style={{ position: 'absolute', top: '5%', right: '8%', width: '360px', height: '360px', background: 'radial-gradient(circle, rgba(45,212,191,0.22) 0%, rgba(45,212,191,0) 70%)', pointerEvents: 'none' }} />
                <div aria-hidden="true" style={{ position: 'absolute', bottom: '5%', left: '5%', width: '320px', height: '320px', background: 'radial-gradient(circle, rgba(94,234,212,0.18) 0%, rgba(94,234,212,0) 70%)', pointerEvents: 'none' }} />

                <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1240px' }}>

                    {/* Header */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} style={{ textAlign: 'center', marginBottom: '56px', maxWidth: '780px', marginLeft: 'auto', marginRight: 'auto' }}>
                        <span style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, #ecfdf5, #ccfbf1)',
                            border: '1px solid rgba(45,212,191,0.3)',
                            borderRadius: '999px',
                            padding: '6px 16px',
                            fontSize: '12.5px',
                            fontWeight: 800,
                            color: '#0d7377',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            marginBottom: '20px'
                        }}>Insights &amp; Playbooks</span>
                        <h1 style={{
                            fontSize: 'clamp(34px, 5vw, 48px)',
                            fontWeight: 800,
                            lineHeight: 1.15,
                            margin: '0 0 16px',
                            background: 'linear-gradient(135deg, #042f2e 0%, #0d7377 50%, #14b8a6 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            color: 'transparent',
                            letterSpacing: '-0.01em'
                        }}>
                            The Data Marketics Blog
                        </h1>
                        <p style={{ fontSize: '17px', color: '#4f6b6b', lineHeight: 1.75, margin: 0 }}>
                            Field-tested guides on B2B lead generation, demand generation, intent data, and the operating tactics behind a predictable sales pipeline.
                        </p>
                    </motion.div>

                    {/* Grid */}
                    <div className="row g-4">
                        {blogs.map((post, i) => (
                            <motion.div
                                key={post.slug}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-40px' }}
                                variants={cardVariants}
                                className="col-12 col-md-6 col-lg-4"
                            >
                                <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                                    <article style={{
                                        background: '#ffffff',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        border: '1px solid rgba(45,212,191,0.20)',
                                        boxShadow: '0 10px 30px rgba(13,115,119,0.08)',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-6px)';
                                        e.currentTarget.style.boxShadow = '0 22px 44px rgba(13,115,119,0.16)';
                                        e.currentTarget.style.borderColor = 'rgba(45,212,191,0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(13,115,119,0.08)';
                                        e.currentTarget.style.borderColor = 'rgba(45,212,191,0.20)';
                                    }}
                                    >
                                        <div style={{ aspectRatio: '1200 / 630', overflow: 'hidden', background: 'linear-gradient(135deg,#042f2e,#0d7377)' }}>
                                            <img src={post.heroImage} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                        </div>
                                        <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', gap: '12px', flex: '1 1 auto' }}>
                                            <span style={{ alignSelf: 'flex-start', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0d7377', background: 'rgba(45,212,191,0.10)', padding: '4px 10px', borderRadius: '999px' }}>{post.category}</span>
                                            <h2 style={{ fontSize: '19px', fontWeight: 800, lineHeight: 1.35, color: '#0b2727', margin: 0 }}>{post.title}</h2>
                                            <p style={{ fontSize: '14px', color: '#4f6b6b', lineHeight: 1.65, margin: 0, flex: '1 1 auto' }}>{post.excerpt}</p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12.5px', color: '#4f6b6b', marginTop: '6px' }}>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><Calendar size={13} /> {formatDate(post.date)}</span>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><Clock size={13} /> {post.readTime}</span>
                                            </div>
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#0d7377', fontSize: '14px', marginTop: '4px' }}>
                                                Read article <ArrowRight size={15} />
                                            </span>
                                        </div>
                                    </article>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
