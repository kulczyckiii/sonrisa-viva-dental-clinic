import React from 'react';

const doctors = [
    { name: 'Dra. Elena Martínez', specialty: 'Especialista en Ortodoncia', years: '12', img: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=800' },
    { name: 'Dr. Javier Solana', specialty: 'Cirujano Implantólogo', years: '15', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800' },
    { name: 'Dra. Sofía Rivas', specialty: 'Odontología Estética', years: '10', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800' }
];

const Doctors = () => {
    return (
        <section id="doctores" className="py-32 px-6 bg-surface">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <div className="mb-16">
                        {/* El label pequeño */}
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
                            Nuestro equipo
                        </span>
                        {/* El título grande itálico */}
                        <h2 className="text-6xl md:text-7xl font-black italic tracking-tighter leading-none">
                            Excelencia <span className="text-primary">Clínica</span>
                        </h2>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {doctors.map((doc, i) => (
                        <div key={i} className="relative group overflow-hidden rounded-[2.5rem] shadow-xl">
                            <img src={doc.img} alt={doc.name} className="w-full aspect-[3/4] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-2xl font-bold text-white">{doc.name}</h3>
                                <p className="text-primary font-bold text-sm mb-1">{doc.specialty}</p>

                                {/* Años de experiencia */}
                                <p className="text-white/70 text-sm mb-6 italic">+{doc.years} años de experiencia clínica</p>

                                {/* Apartado Conocer más */}
                                <div className="flex items-center text-white font-bold gap-2 group-hover:gap-4 transition-all cursor-pointer border-t border-white/10 pt-4">
                                    <span>Conocer más</span>
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Doctors;