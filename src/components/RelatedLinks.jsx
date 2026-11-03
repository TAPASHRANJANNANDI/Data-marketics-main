import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import blogs from '../data/blogs';
import { SERVICES } from '../data/services';

// Two-way internal linking between the blog and the service pages. Crawlers
// discover and weigh pages by the links pointing at them, and before this the
// blog and the services sat in separate silos.
//
// `relatedServices` on each post in blogs.js is the single source of truth:
// RelatedServices reads it forwards, RelatedPosts reads it backwards.

const heading = {
    fontSize: '11.5px',
    fontWeight: 800,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: '#0d7377',
    margin: '0 0 16px 0',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
};

const card = {
    display: 'block',
    height: '100%',
    padding: '18px 20px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #f0fdfa 0%, #ecfdf5 100%)',
    border: '1px solid rgba(45, 212, 191, 0.24)',
    textDecoration: 'none',
    color: 'inherit',
};

const cardTitle = {
    margin: '0 0 6px 0',
    fontSize: '15.5px',
    fontWeight: 700,
    color: '#0b2727',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
};

const cardText = {
    margin: 0,
    fontSize: '13.5px',
    color: '#4f6b6b',
    lineHeight: 1.6,
};

// Rendered at the end of a blog post: the services the post is about.
export function RelatedServices({ paths = [] }) {
    const services = paths.filter(path => SERVICES[path]);
    if (!services.length) return null;

    return (
        <section
            style={{
                marginTop: '56px',
                paddingTop: '32px',
                borderTop: '1px solid rgba(45, 212, 191, 0.22)',
            }}
        >
            <p style={heading}>How Data Marketics can help</p>
            <div className="row g-3">
                {services.map(path => (
                    <div key={path} className="col-12 col-md-6">
                        <Link to={path} style={card}>
                            <p style={cardTitle}>
                                {SERVICES[path].label} <ArrowRight size={15} />
                            </p>
                            <p style={cardText}>{SERVICES[path].blurb}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}

// Rendered on a service page: the posts that name this service. `limit`
// keeps the section short on services that several posts point at.
export function RelatedPosts({ service, limit = 3 }) {
    const posts = blogs
        .filter(post => (post.relatedServices || []).includes(service))
        .slice(0, limit);

    if (!posts.length) return null;

    return (
        <div className="container" style={{ maxWidth: '1100px', padding: '0 20px 80px' }}>
            <p style={heading}>
                <BookOpen size={13} /> From the blog
            </p>
            <div className="row g-3">
                {posts.map(post => (
                    <div key={post.slug} className="col-12 col-md-6 col-lg-4">
                        <Link to={`/blog/${post.slug}`} style={card}>
                            <p style={cardTitle}>
                                {post.title} <ArrowRight size={15} />
                            </p>
                            <p style={cardText}>{post.excerpt}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
