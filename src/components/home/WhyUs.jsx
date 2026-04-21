import React from 'react';

const reasons = [
    {
        title: 'Tecnología de Vanguardia',
        desc: 'Equipamiento de última generación para diagnósticos precisos y tratamientos eficaces con resultados predecibles.',
        icon: 'precision_manufacturing'
    },
    {
        title: 'Atención Personalizada',
        desc: 'Entendemos que cada paciente es único. Diseñamos planes de tratamiento a medida priorizando su bienestar.',
        icon: 'person_heart'
    },
    {
        title: 'Profesionales con Experiencia',
        desc: 'Nuestro equipo clínico cuenta con años de experiencia y actualización constante en las últimas técnicas dentales.',
        icon: 'verified'
    }
];

const WhyUs = () => {
    return (
        <section className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto text-center">
                <div className="mb-20">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
                        Por qué elegirnos
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter leading-none">
                        Nuestra <span className="text-primary">Diferencia</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {reasons.map((item, i) => (
                        <div key={i} className="group flex flex-col items-center bg-white p-12 rounded-[3rem] border border-black/5 shadow-sm hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 cursor-pointer">
                            {/* Icono circular con hover animado */}
                            <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-8 border border-primary/10 group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
                                <span className="material-symbols-outlined text-primary text-4xl group-hover:text-white transition-all duration-700 group-hover:rotate-[360deg]">
                                    {item.icon}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold mb-5 tracking-tight group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                            <p className="text-on-surface-variant leading-relaxed max-w-sm group-hover:text-on-surface transition-colors duration-300">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;