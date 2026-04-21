import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-surface border-t border-outline-variant/20 pt-16 pb-8 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                {/* Columna 1: Brand */}
                <div className="space-y-4">
                    <div className="text-2xl font-black text-primary tracking-tighter flex items-center gap-2">
                        <span className="material-symbols-outlined text-3xl">dentistry</span>
                        SONRISA VIVA
                    </div>
                    <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">
                        Excelencia dental y tecnología de vanguardia para transformar tu salud bucal en una experiencia de bienestar.
                    </p>
                </div>

                {/* Columna 2: Contacto (Feature 6.2 del PDF) */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-on-surface font-bold mb-2">Contacto y Ubicación</h4>
                    <div className="space-y-3 text-sm text-on-surface-variant">
                        <p className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                            Av. de la Sonrisa 123, Ciudad Principal
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px] text-primary">call</span>
                            +34 123 456 789
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px] text-primary">schedule</span>
                            Lunes a Sábado: 09:00 - 20:00
                        </p>
                    </div>
                </div>

                {/* Columna 3: Legal & Social */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-on-surface font-bold mb-2">Legal & Social</h4>
                    <div className="flex flex-col gap-3 text-sm">
                        <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Política de Privacidad</a>
                        <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Términos de Servicio</a>
                        <div className="flex gap-4 mt-2">
                            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Instagram</a>
                            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto pt-8 border-t border-outline-variant/10 text-center">
                <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/40">
                    © {new Date().getFullYear()} Sonrisa Viva Dental Clinic. Excelencia en cada detalle.
                </p>
            </div>
        </footer>
    );
};

export default Footer;