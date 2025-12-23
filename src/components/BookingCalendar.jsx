import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { availabilityConfig } from '../data/availability';

const BookingCalendar = ({ onSelect }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    // Función para obtener slots según el día seleccionado
    const getTimeSlotsForDate = (date) => {
        if (!date) return [];
        const dayOfWeek = date.getDay();
        return availabilityConfig.specificDayConfig[dayOfWeek] || availabilityConfig.defaultTimeSlots;
    };

    const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

    const handleDateClick = (day) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handleTimeClick = (time) => {
        setSelectedTime(time);
        if (onSelect) {
            onSelect({ date: selectedDate, time });
        }
    };

    const renderDays = () => {
        const days = [];
        const totalDays = daysInMonth(currentDate);
        const startDay = firstDayOfMonth(currentDate);

        // Padding for the start of the month
        for (let i = 0; i < (startDay === 0 ? 6 : startDay - 1); i++) {
            days.push(<div key={`empty-${i}`} className="h-10 md:h-12 w-full"></div>);
        }

        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dateString = date.toISOString().split('T')[0];
            const isToday = new Date().toDateString() === date.toDateString();
            const isSelected = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === currentDate.getMonth();
            const isPast = date < new Date().setHours(0, 0, 0, 0);

            // Reglas de negocio de availabilityConfig
            const isAllowedDay = availabilityConfig.allowedDays.includes(date.getDay());
            const isBlocked = availabilityConfig.blockedDates.includes(dateString);

            days.push(
                <button
                    key={day}
                    disabled={isPast || !isAllowedDay || isBlocked}
                    onClick={() => handleDateClick(day)}
                    className={`h-10 md:h-12 w-full rounded-lg text-sm font-medium transition-all flex items-center justify-center
                        ${isSelected ? 'bg-primary text-gray-900' : isToday ? 'text-primary border border-primary/30' : 'text-gray-400 hover:bg-white/5'}
                        ${(isPast || !isAllowedDay || isBlocked) ? 'opacity-10 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                >
                    {day}
                </button>
            );
        }
        return days;
    };

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Calendar Grid */}
            <div className="flex-1 bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-bold text-white uppercase tracking-widest font-mono">
                        {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h3>
                    <div className="flex gap-2">
                        <button onClick={handlePrevMonth} className="p-2 rounded-lg hover:bg-white/10 text-gray-400">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={handleNextMonth} className="p-2 rounded-lg hover:bg-white/10 text-gray-400">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-4">
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(day => (
                        <div key={day} className="h-8 flex items-center justify-center text-[10px] font-mono text-gray-600 uppercase">
                            {day}
                        </div>
                    ))}
                    {renderDays()}
                </div>
            </div>

            {/* Time Slots */}
            <AnimatePresence mode="wait">
                {selectedDate && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full md:w-48 space-y-4"
                    >
                        <div className="flex items-center gap-2 text-primary mb-6">
                            <Clock className="w-4 h-4" />
                            <span className="text-xs font-mono uppercase tracking-widest font-bold">Horas disponibles</span>
                        </div>
                        <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
                            {getTimeSlotsForDate(selectedDate).map(time => (
                                <button
                                    key={time}
                                    onClick={() => handleTimeClick(time)}
                                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-all text-center
                                        ${selectedTime === time ? 'bg-primary text-gray-900 shadow-lg shadow-primary/20' : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'}
                                    `}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BookingCalendar;
