import Header from './Header';
import Footer from './Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
