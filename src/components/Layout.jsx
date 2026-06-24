import Header from './Header';
import Footer from './Footer';
import ThreeDBackground from './ThreeDBackground';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        // Clear existing classes that might interfere
        document.body.className = '';

        // Add default body classes
        document.body.classList.add('body2', 'body');

        // Add specific classes based on route if needed
        if (location.pathname === '/features') {
            document.body.classList.add('unic-body');
        }
    }, [location]);

    return (
        <>
            {/* Global interactive 3D particle background */}
            <ThreeDBackground />

            <Header />
            
            {/* Page route fade/slide entrance transition */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                    <main style={{ position: 'relative', zIndex: 1 }}>
                        {children}
                    </main>
                </motion.div>
            </AnimatePresence>

            <Footer />
        </>
    );
};

export default Layout;

