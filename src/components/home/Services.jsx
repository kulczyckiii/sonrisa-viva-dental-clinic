import React from 'react';

const services = [
    { title: 'Limpieza Dental', icon: 'cleaning_services', desc: 'Mantenimiento preventivo profesional para una salud bucal óptima y duradera.' },
    { title: 'Ortodoncia', icon: 'align_center', desc: 'Alineación precisa mediante tecnología invisible o brackets tradicionales.' },
    { title: 'Endodoncia', icon: 'dentistry', desc: 'Tratamientos de conducto avanzados para salvar piezas dentales naturales.' },
    { title: 'Blanqueamiento', icon: 'auto_fix_high', desc: 'Resultados radiantes en una sesión con tecnología láser de mínima sensibilidad.' },
    { title: 'Implantes', icon: 'medical_services', desc: 'Restauración permanente con materiales de grado médico premium.' },
    { title: 'Odontología General', icon: 'health_and_safety', desc: 'Cuidado integral para toda la familia con un enfoque preventivo.' }
];

const Services = () => {
    return (
        <section id="servicios" className="py-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    {/* El label pequeño encima */}
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
                        Especialidades
                    </span>
                    {/* El título grande itálico */}
                    <h2 className="text-6xl md:text-7xl font-black italic tracking-tighter leading-none">
                        Nuestra <span className="text-primary">Especialidad</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((s, i) => (
                        <div key={i} className="group bg-white p-10 rounded-[3rem] shadow-sm border border-black/5 hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 flex flex-col h-full cursor-pointer">
                            {/* Icono circular con hover animado (Estilo WhyUs) */}
                            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-8 border border-primary/10 group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
                                <span className="material-symbols-outlined text-4xl text-primary group-hover:text-white group-hover:rotate-[360deg] transition-all duration-700">
                                    {s.icon}
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
                                {s.title}
                            </h3>
                            <p className="text-on-surface-variant leading-relaxed mb-8 flex-grow group-hover:text-on-surface transition-colors duration-300">
                                {s.desc}
                            </p>

                            {/* Apartado Conocer más */}
                            <div className="flex items-center text-primary font-bold gap-2 group-hover:gap-4 transition-all pt-4 border-t border-black/5">
                                <span>Conocer más</span>
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;