import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isMobileMenuOpen]);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-surface/80 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-6'
            }`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="text-2xl font-black text-primary tracking-tighter flex items-center gap-2">
                    <span className="material-symbols-outlined text-3xl">dentistry</span>
                    SONRISA VIVA
                </Link>

                <div className="hidden md:flex items-center space-x-10">
                    <a href="#servicios" className="text-sm font-semibold text-on-surface/70 hover:text-primary transition-colors">Servicios</a>
                    <a href="#doctores" className="text-sm font-semibold text-on-surface/70 hover:text-primary transition-colors">Doctores</a>
                    <a href="#faq" className="text-sm font-semibold text-on-surface/70 hover:text-primary transition-colors">FAQ</a>
                    <a href="#contacto" className="text-sm font-semibold text-on-surface/70 hover:text-primary transition-colors">Contacto</a>
                    <Link
                        to="/agendar"
                        className="bg-primary text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                    >
                        Agendar Cita
                    </Link>
                </div>

                <button onClick={toggleMenu} className="md:hidden text-on-surface p-2">
                    <span className="material-symbols-outlined text-3xl">
                        {isMobileMenuOpen ? 'close' : 'menu'}
                    </span>
                </button>
            </div>

            {/* Mobile Menu Overlay - CORRECCIÓN DE POSICIONAMIENTO */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-surface z-[70] flex flex-col items-center justify-center space-y-8 text-2xl font-bold transition-transform duration-500 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <button onClick={toggleMenu} className="absolute top-6 right-6">
                    <span className="material-symbols-outlined text-4xl">close</span>
                </button>
                <a href="#servicios" onClick={toggleMenu} className="hover:text-primary">Servicios</a>
                <a href="#doctores" onClick={toggleMenu} className="hover:text-primary">Doctores</a>
                <a href="#faq" onClick={toggleMenu} className="hover:text-primary">FAQ</a>
                <a href="#contacto" onClick={toggleMenu} className="hover:text-primary">Contacto</a>
                <Link to="/agendar" onClick={toggleMenu} className="bg-primary text-white px-10 py-4 rounded-full shadow-xl">
                    Agendar Cita
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;