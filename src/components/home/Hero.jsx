import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-surface">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-8 animate-fade-in">
                    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-primary text-sm font-bold tracking-wide">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        TECNOLOGÍA DENTAL DE VANGUARDIA
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-on-surface leading-[0.9] tracking-tighter italic">
                        El santuario de su <span className="text-primary">sonrisa.</span>
                    </h1>
                    <p className="text-xl text-on-surface-variant leading-relaxed max-w-lg">
                        Experimente la odontología del futuro con un enfoque humano. Resultados excepcionales en un entorno de máxima tranquilidad.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link
                            to="/agendar"
                            className="bg-primary text-white px-10 py-5 rounded-full text-lg font-bold shadow-2xl shadow-primary/30 hover:scale-105 hover:bg-primary/95 transition-all duration-300"
                        >
                            Agendar Cita
                        </Link>
                    </div>
                </div>
                <div className="relative w-full max-w-5xl mx-auto mt-20 px-6">
                    <div className="relative p-6 -m-6 overflow-visible">
                        <div className="aspect-[4/5] bg-white rounded-[3rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.15)] border border-black/5 overflow-hidden">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw7M8LRGdsS9QFl2OBMedkCCiF4GHAfHS4QUs2i2DqvVaEG__ShG3UiPZiOeBA9fRyzyoKb3MmpYOHxLZBi6Ulkq1ttl7hr7_oWyHUrKNRp9DUT-GgO5gAZTqudUX5uenHcJSGQjv2vStUXmlnVW_Oa_739dqag4ebyBKPJRhCekMlMTIyTXVXBFDiKqdfAZ78VAUXVGRfboG87s0TwmsXVMXDiJa4-v8GkFbNp6vj-jaIk41C_96vuXIBYzv85m7MX-BYBD0cSJ-d"
                                alt="Clínica Sonrisa Viva"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;