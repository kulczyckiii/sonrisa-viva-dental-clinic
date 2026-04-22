import React, { useState, useEffect } from 'react';

const Booking = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // --- 1. LÓGICA DE LOCALSTORAGE (INICIALIZACIÓN) ---
    const [formData, setFormData] = useState(() => {
        const savedDraft = localStorage.getItem('booking_draft');
        if (savedDraft) {
            const parsed = JSON.parse(savedDraft);
            return { ...parsed, date: new Date(parsed.date) };
        }
        return {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            service: 'limpieza',
            date: new Date(),
            time: '',
            specialist: '',
            comments: ''
        };
    });

    // --- 2. GUARDAR BORRADOR AUTOMÁTICAMENTE ---
    useEffect(() => {
        localStorage.setItem('booking_draft', JSON.stringify(formData));
    }, [formData]);

    const services = [
        { id: 'limpieza', name: 'Limpieza Dental', icon: 'medical_services' },
        { id: 'ortodoncia', name: 'Ortodoncia', icon: 'health_and_safety' },
        { id: 'endodoncia', name: 'Endodoncia', icon: 'science' },
        { id: 'blanqueamiento', name: 'Blanqueamiento', icon: 'face_retouching_natural' },
        { id: 'implante', name: 'Implantes', icon: 'vaccines' },
        { id: 'general', name: 'Odontología General', icon: 'dentistry' },
    ];

    const specialists = [
        { id: 'dra-martinez', name: 'Dra. Elena Martínez' },
        { id: 'dr-lopez', name: 'Dr. Carlos López' },
        { id: 'dra-garcia', name: 'Dra. Ana García' }
    ];

    const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '16:00', '16:30'];

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/[^0-9+]/g, '');
        setFormData({ ...formData, phone: value });
    };

    // --- CORRECCIÓN: Validación de hora en tiempo real ---
    const isTimeDisabled = (slot, date = formData.date) => {
        const now = new Date();
        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0);

        if (selectedDate > today) return false;
        if (selectedDate < today) return true;

        const [h, m] = slot.split(':').map(Number);
        const slotTime = new Date();
        slotTime.setHours(h, m, 0, 0);

        return slotTime <= now;
    };

    // Función para saber si a un día le quedan horas libres (usada en el calendario)
    const hasAvailableSlots = (date) => {
        return timeSlots.some(slot => !isTimeDisabled(slot, date));
    };

    const isFormValid = () => {
        const { firstName, lastName, email, phone, time, date } = formData;
        // La hora seleccionada no debe estar deshabilitada (por si se quedó guardada una de ayer)
        const timeValid = time !== '' && !isTimeDisabled(time, date);

        return firstName.trim() !== '' &&
            lastName.trim() !== '' &&
            email.includes('@') &&
            phone.trim().length >= 9 &&
            timeValid;
    };

    const isSameDay = (d1, d2) => d1.toDateString() === d2.toDateString();
    const changeMonth = (offset) => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));

    const renderDays = () => {
        const days = [];
        const totalDays = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
        const startDay = (new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() + 6) % 7;

        for (let i = 0; i < startDay; i++) days.push(<div key={`empty-${i}`} className="p-2"></div>);
        for (let day = 1; day <= totalDays; day++) {
            const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);

            // CORRECCIÓN: Si es hoy y ya pasaron todas las horas, se deshabilita el día
            const isPast = dateObj < today;
            const isTodayButFinished = isSameDay(dateObj, today) && !hasAvailableSlots(dateObj);
            const isDisabled = isPast || isTodayButFinished;

            const isSelected = isSameDay(dateObj, formData.date);

            days.push(
                <button key={day} type="button" disabled={isDisabled} onClick={() => setFormData({ ...formData, date: dateObj, time: '' })}
                    className={`w-9 h-9 mx-auto rounded-full text-sm transition-all flex items-center justify-center ${isDisabled ? 'opacity-20 cursor-not-allowed' : 'hover:bg-primary/10'} ${isSelected && !isDisabled ? 'bg-primary text-white font-bold' : 'text-on-surface'}`}>
                    {day}
                </button>
            );
        }
        return days;
    };

    // --- 3. CONFIRMACIÓN Y PERSISTENCIA FINAL ---
    const handleConfirm = () => {
        if (!isFormValid()) return;
        setIsSubmitting(true);

        setTimeout(() => {
            const existingHistory = JSON.parse(localStorage.getItem('appointments_history') || '[]');
            const newAppointment = {
                ...formData,
                id: Date.now(),
                createdAt: new Date().toISOString()
            };
            localStorage.setItem('appointments_history', JSON.stringify([...existingHistory, newAppointment]));
            localStorage.removeItem('booking_draft');

            setIsSubmitting(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="pt-40 pb-32 px-6 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-6xl">check_circle</span>
                </div>
                <h2 className="text-4xl font-bold text-on-surface mb-4">¡Cita Confirmada!</h2>
                <p className="text-on-surface-variant max-w-md mb-8">Gracias, {formData.firstName}. Tu cita ha sido agendada y guardada en tu historial local para el {formData.date.toLocaleDateString()} a las {formData.time}h.</p>
                <button onClick={() => window.location.reload()} className="px-10 py-4 bg-primary text-white rounded-full font-bold shadow-lg hover:shadow-primary/30 transition-all">Finalizar</button>
            </div>
        );
    }

    const selectedServiceName = services.find(s => s.id === formData.service)?.name;
    const selectedSpecName = specialists.find(s => s.id === formData.specialist)?.name;

    return (
        <main className="pt-32 pb-32 px-6 max-w-7xl mx-auto min-h-screen relative">
            <div className="mb-12 max-w-3xl">
                <span className="text-sm font-bold tracking-widest text-secondary uppercase mb-4 block">Agenda Tu Visita</span>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-on-surface leading-tight">Tu bienestar comienza aquí.</h1>
                <p className="text-lg text-on-surface-variant font-light mt-6">Complete el formulario para asegurar su espacio con nuestros especialistas.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                <div className="lg:col-span-7 xl:col-span-8 space-y-10">
                    {/* 1. Datos Personales */}
                    <section className="bg-white rounded-2xl p-8 shadow-sm border border-outline-variant/30">
                        <h2 className="text-2xl font-semibold text-on-surface">1. Datos Personales</h2>
                        <p className="text-[15px] text-on-surface-variant/80 mt-2 mb-8">Introduzca sus datos para identificar su ficha de paciente.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-on-surface-variant mb-2">Nombre *</label>
                                <input value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full bg-surface border border-outline-variant/30 rounded-lg px-4 py-3 outline-none" placeholder="Ej. María" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-on-surface-variant mb-2">Apellidos *</label>
                                <input value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full bg-surface border border-outline-variant/30 rounded-lg px-4 py-3 outline-none" placeholder="Ej. García López" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-on-surface-variant mb-2">Correo Electrónico *</label>
                                <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-surface border border-outline-variant/30 rounded-lg px-4 py-3 outline-none" placeholder="maria@ejemplo.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-on-surface-variant mb-2">Teléfono *</label>
                                <input value={formData.phone} onChange={handlePhoneChange} className="w-full bg-surface border border-outline-variant/30 rounded-lg px-4 py-3 outline-none" placeholder="Ej. 600000000" />
                            </div>
                        </div>
                    </section>

                    {/* 2. Detalles de la Cita */}
                    <section className="bg-white rounded-2xl p-8 shadow-sm border border-outline-variant/30">
                        <h2 className="text-2xl font-semibold text-on-surface">2. Detalles de la Cita</h2>
                        <p className="text-[15px] text-on-surface-variant/80 mt-2 mb-8">Seleccione el tratamiento que desea recibir.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                            {services.map((s) => (
                                <label key={s.id} className="cursor-pointer group">
                                    <input type="radio" className="peer sr-only" checked={formData.service === s.id} onChange={() => setFormData({ ...formData, service: s.id })} />
                                    <div className="h-full rounded-xl border border-outline-variant/30 p-4 text-center transition-all group-active:scale-95 peer-checked:bg-primary peer-checked:border-primary">
                                        <span className={`material-symbols-outlined mb-2 block text-3xl ${formData.service === s.id ? 'text-white' : 'text-on-surface-variant'}`}>{s.icon}</span>
                                        <span className={`block text-sm font-medium ${formData.service === s.id ? 'text-white' : 'text-on-surface'}`}>{s.name}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                        <label className="block text-sm font-medium text-on-surface-variant mb-2">Especialista (Opcional)</label>
                        <select value={formData.specialist} onChange={(e) => setFormData({ ...formData, specialist: e.target.value })} className="w-full bg-surface border border-outline-variant/30 rounded-lg px-4 py-3 appearance-none outline-none">
                            <option value="">Cualquier especialista disponible</option>
                            {specialists.map(sp => <option key={sp.id} value={sp.id}>{sp.name}</option>)}
                        </select>
                    </section>

                    {/* 3. Fecha y Hora */}
                    <section className="bg-white rounded-2xl p-8 shadow-sm border border-outline-variant/30">
                        <h2 className="text-2xl font-semibold text-on-surface">3. Fecha y Hora</h2>
                        <p className="text-[15px] text-on-surface-variant/80 mt-2 mb-8">Navegue por el calendario para elegir su cita.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="border border-outline-variant/30 rounded-xl p-6 bg-surface">
                                <div className="flex justify-between items-center mb-6">
                                    <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-white rounded-full"><span className="material-symbols-outlined">chevron_left</span></button>
                                    <span className="font-semibold text-on-surface capitalize">{currentMonth.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</span>
                                    <button onClick={() => changeMonth(1)} className="p-2 hover:bg-white rounded-full"><span className="material-symbols-outlined">chevron_right</span></button>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center mb-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                                    {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => <div key={d} className="py-2">{d}</div>)}
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center">{renderDays()}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 h-fit">
                                {timeSlots.map(t => (
                                    <button key={t} disabled={isTimeDisabled(t)} onClick={() => setFormData({ ...formData, time: t })}
                                        className={`py-3 rounded-lg border text-sm transition-all ${isTimeDisabled(t) ? 'opacity-20 cursor-not-allowed' : formData.time === t ? 'bg-primary text-white border-primary shadow-lg' : 'border-outline-variant/30 hover:border-primary'}`}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 4. Comentarios */}
                    <section className="bg-white rounded-2xl p-8 shadow-sm border border-outline-variant/30">
                        <h2 className="text-2xl font-semibold text-on-surface">4. Comentarios Adicionales</h2>
                        <p className="text-[15px] text-on-surface-variant/80 mt-2 mb-6">Indique cualquier observación previa para el doctor.</p>
                        <textarea value={formData.comments} onChange={(e) => setFormData({ ...formData, comments: e.target.value })} className="w-full bg-surface border border-outline-variant/30 rounded-lg px-4 py-3 outline-none resize-none" placeholder="Escriba aquí..." rows="3"></textarea>
                    </section>
                </div>

                {/* SIDEBAR STICKY (DERECHA) */}
                <aside className="hidden lg:block lg:col-span-5 xl:col-span-4 h-full">
                    <div className="sticky top-32 bg-white rounded-3xl p-8 border border-outline-variant/40 shadow-xl">
                        <h3 className="text-xl font-semibold mb-6 text-on-surface border-b pb-4">Resumen de tu Cita</h3>
                        <div className="space-y-6">
                            <SummaryItem icon="medical_services" label="Servicio" value={selectedServiceName} />
                            <SummaryItem icon="calendar_month" label="Fecha y Hora" value={formData.date.toLocaleDateString('es-ES')} subValue={formData.time ? `${formData.time} h` : 'Hora no seleccionada'} />
                            {formData.specialist && <SummaryItem icon="stethoscope" label="Especialista" value={selectedSpecName} />}
                            <SummaryItem icon="location_on" label="Ubicación" value="Clínica Sonrisa Viva" />
                        </div>
                        <div className="mt-10">
                            <button
                                onClick={handleConfirm}
                                disabled={!isFormValid() || isSubmitting}
                                className={`w-full flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-br from-primary to-primary-container text-white font-medium text-lg transition-all shadow-lg group ${!isFormValid() ? 'opacity-40 grayscale cursor-not-allowed' : 'hover:opacity-90 active:scale-95'}`}
                            >
                                {isSubmitting ? 'Procesando...' : 'Confirmar Reserva'}
                            </button>
                            <p className="text-[11px] text-center text-on-surface-variant mt-4">
                                Al confirmar, aceptas nuestros <a href="#" className="underline font-bold">Términos y Condiciones</a>.
                            </p>
                        </div>
                    </div>
                </aside>
            </div>

            {/* DRAWER MÓVIL */}
            <div className={`lg:hidden fixed inset-x-0 bottom-0 z-[100] transition-all duration-500 ease-in-out ${isDrawerOpen ? 'translate-y-0' : 'translate-y-[calc(100%-85px)]'}`}>
                <div className="bg-white border-t border-outline-variant/40 shadow-[0_-15px_40px_rgba(0,0,0,0.12)] rounded-t-[40px] px-8 pb-8 pt-2">
                    <button onClick={() => setIsDrawerOpen(!isDrawerOpen)} className="w-full flex flex-col items-center py-2 mb-2">
                        <span className={`material-symbols-outlined text-primary transition-transform duration-300 ${isDrawerOpen ? 'rotate-180' : ''}`}>
                            keyboard_arrow_up
                        </span>
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest mt-1">Resumen de Cita</span>
                    </button>
                    <div className={`transition-all duration-300 ${isDrawerOpen ? 'opacity-100 h-auto mb-8' : 'opacity-0 h-0 overflow-hidden'}`}>
                        <div className="grid grid-cols-1 gap-6">
                            <SummaryItem icon="medical_services" label="Servicio" value={selectedServiceName} />
                            <SummaryItem icon="calendar_month" label="Cita" value={`${formData.date.toLocaleDateString('es-ES')} - ${formData.time || '--'}h`} />
                        </div>
                    </div>
                    <button
                        onClick={handleConfirm}
                        disabled={!isFormValid() || isSubmitting}
                        className={`w-full flex items-center justify-center py-4 rounded-full bg-gradient-to-br from-primary to-primary-container text-white font-bold text-lg shadow-lg active:scale-95 transition-all ${!isFormValid() ? 'opacity-40 grayscale' : ''}`}
                    >
                        {isSubmitting ? 'Enviando...' : 'Confirmar Reserva'}
                    </button>
                </div>
            </div>
        </main>
    );
};

const SummaryItem = ({ icon, label, value, subValue }) => (
    <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0 border border-white shadow-sm">
            <span className="material-symbols-outlined text-on-secondary-fixed text-xl">{icon}</span>
        </div>
        <div>
            <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">{label}</p>
            <p className="text-sm text-on-surface font-bold leading-tight">{value}</p>
            {subValue && <p className="text-xs text-on-surface-variant mt-0.5">{subValue}</p>}
        </div>
    </div>
);

export default Booking;