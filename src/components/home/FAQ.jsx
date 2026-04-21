import React, { useState } from 'react';

const faqs = [
    {
        question: "¿Es doloroso el tratamiento de implantes?",
        answer: "No, utilizamos anestesia local avanzada y técnicas de mínima invasión para que el paciente no sienta dolor durante el procedimiento."
    },
    {
        question: "¿Cuánto tiempo dura un blanqueamiento dental?",
        answer: "Con los cuidados adecuados y una buena higiene, los resultados pueden durar entre 1 y 3 años."
    },
    {
        question: "¿Aceptan seguros dentales?",
        answer: "Sí, trabajamos con las principales aseguradoras del país. Consulte con recepción para verificar su cobertura específica."
    },
    {
        question: "¿Desde qué edad pueden ir los niños a consulta?",
        answer: "Recomendamos la primera visita a partir del primer año de vida para asegurar un desarrollo bucal saludable desde el inicio."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section id="faq" className="py-32 px-6 bg-white">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-black text-on-surface tracking-tighter italic leading-none">
                        Preguntas <span className="text-primary">Frecuentes</span>
                    </h2>
                    <p className="text-on-surface-variant mt-4 text-lg">Resolvemos sus dudas para que su visita sea tranquila.</p>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border border-outline-variant/50 rounded-2xl overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full p-6 text-left flex justify-between items-center bg-surface hover:bg-slate-50 transition-colors"
                            >
                                <span className="font-bold text-lg">{faq.question}</span>
                                <span className={`material-symbols-outlined transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>
                                    expand_more
                                </span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-40 p-6 pt-0' : 'max-h-0'}`}>
                                <p className="text-on-surface-variant leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;