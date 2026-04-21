import React, { useState } from 'react';

const ContactForm = () => {
    const [status, setStatus] = useState('idle');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => setStatus('success'), 1500);
    };

    return (
        <section id="contacto" className="py-32 px-6 bg-surface">
            <div className="max-w-7xl mx-auto bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-outline-variant/30 flex flex-col md:row gap-16 md:flex-row">
                <div className="flex-1 space-y-10">
                    <div className="space-y-4">
                        <h2 className="text-5xl font-black tracking-tighter italic">Hablemos <span className="text-primary">ahora.</span></h2>
                        <p className="text-lg text-on-surface-variant">Estamos aquí para resolver sus dudas y cuidar de su salud bucal.</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {/* Botón de Dirección */}
                        <div className="flex items-center gap-4 bg-white border border-outline-variant/50 px-6 py-4 rounded-2xl shadow-sm w-full md:max-w-md">
                            <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
                            <span className="text-lg font-bold text-on-surface">Av. de la Sonrisa 123, Ciudad</span>
                        </div>

                        {/* Fila de botones de contacto */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:max-w-md">
                            {/* Botón Teléfono */}
                            <a
                                href="tel:+34123456789"
                                className="flex-1 flex items-center justify-center gap-3 bg-white border border-outline-variant/50 px-6 py-4 rounded-2xl shadow-sm hover:shadow-md transition-all group"
                            >
                                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">call</span>
                                <span className="text-lg font-bold text-on-surface">+123 456 789</span>
                            </a>

                            {/* Botón WhatsApp - SVG CORREGIDO (ESTILO IMG2) */}
                            <a
                                href="https://wa.me/34123456789"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-3 bg-[#25D366] px-6 py-4 rounded-2xl shadow-lg shadow-green-500/20 hover:bg-[#20ba5a] transition-all group"
                            >
                                <svg
                                    className="w-7 h-7 fill-white group-hover:scale-110 transition-transform"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                <span className="text-lg font-bold text-white">WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    {/* Resto del formulario igual que antes... */}
                    {status === 'success' ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                            <span className="material-symbols-outlined text-7xl text-green-500">check_circle</span>
                            <h3 className="text-2xl font-bold">¡Mensaje Enviado!</h3>
                            <p className="text-on-surface-variant">Le contactaremos lo antes posible.</p>
                            <button onClick={() => setStatus('idle')} className="text-primary font-bold">Enviar otro mensaje</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input required type="text" placeholder="Nombre completo" className="w-full p-5 bg-surface border border-outline-variant rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
                            <input required type="email" placeholder="Email" className="w-full p-5 bg-surface border border-outline-variant rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
                            <textarea required placeholder="¿En qué podemos ayudarle?" rows="4" className="w-full p-5 bg-surface border border-outline-variant rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"></textarea>
                            <button
                                disabled={status === 'sending'}
                                className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:shadow-xl disabled:opacity-50 transition-all flex justify-center items-center gap-2"
                            >
                                {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactForm;