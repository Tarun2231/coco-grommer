'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Calendar, CheckCircle2, Clock, AlertCircle, Scissors, User } from 'lucide-react';

export default function GroomerPortalPage() {
  const { data, currentUser, refreshData } = useApp();
  const [selectedApptId, setSelectedApptId] = useState<string | null>(null);
  const [groomerNote, setGroomerNote] = useState('');

  if (!data) return null;

  // Appointments assigned to Sarah Jenkins or current groomer
  const assignedAppts = data.appointments.filter(
    (a) => a.groomer_id === currentUser.id || a.groomer_name.includes('Sarah') || true
  );

  const handleCompleteGrooming = async (apptId: string) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'complete',
          appointment_id: apptId,
          groomer_notes: groomerNote || 'Groomed with organic silk oat shampoo. Customer prefers rounded teddy bear face.'
        })
      });
      if (res.ok) {
        setSelectedApptId(null);
        setGroomerNote('');
        await refreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="bg-amber-900 text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'}
            alt={currentUser.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-amber-300"
          />
          <div>
            <span className="text-xs font-bold text-amber-300 uppercase">Groomer Staff Portal</span>
            <h1 className="text-2xl font-serif font-bold text-white">{currentUser.name}</h1>
            <p className="text-xs text-amber-200">Senior Small-Breed Master Stylist</p>
          </div>
        </div>

        <div className="bg-amber-800 p-4 rounded-2xl text-center text-xs">
          <span className="text-amber-200 block text-[10px]">Today's Shift</span>
          <span className="font-bold text-white text-base">9:00 AM — 6:00 PM</span>
        </div>
      </div>

      {/* Assigned Appointments Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-serif font-bold text-slate-900">Your Assigned Grooming Schedule</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assignedAppts.map((appt) => (
            <div
              key={appt.id}
              className={`bg-white p-6 rounded-3xl border-2 shadow-soft space-y-4 ${
                appt.status === 'completed' ? 'border-slate-200 opacity-80' : 'border-amber-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                  #{appt.booking_number}
                </span>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                  appt.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {appt.status}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-slate-900">{appt.pet_name}</h3>
                <p className="text-xs text-amber-800 font-bold">{appt.breed} • {appt.service_name}</p>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span><b>Slot:</b> {appt.date} at {appt.time_slot}</span>
                </p>
              </div>

              {/* Styling Preferences for Groomer */}
              <div className="bg-cream-100 p-4 rounded-2xl border border-brand-200 space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Scissors className="w-4 h-4 text-amber-700" />
                  Pet Parent Haircut Preferences:
                </h4>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div>Face: <b>{appt.grooming_preferences?.face_style || 'Teddy Bear'}</b></div>
                  <div>Length: <b>{appt.grooming_preferences?.hair_length || 'Medium'}</b></div>
                  <div>Tail: <b>{appt.grooming_preferences?.tail_style || 'Full'}</b></div>
                  <div>Feet: <b>{appt.grooming_preferences?.feet_style || 'Rounded'}</b></div>
                </div>
                {appt.grooming_preferences?.special_notes && (
                  <p className="text-amber-900 font-semibold bg-amber-50 p-2 rounded-lg border border-amber-200 mt-1">
                    " {appt.grooming_preferences.special_notes} "
                  </p>
                )}
              </div>

              {/* Complete Action & Note Input */}
              {appt.status !== 'completed' && (
                <div className="space-y-3 pt-2">
                  <textarea
                    rows={2}
                    placeholder="Add groomer notes for pet history (e.g. Bella was very calm. Applied organic paw balm)..."
                    value={selectedApptId === appt.id ? groomerNote : ''}
                    onChange={(e) => {
                      setSelectedApptId(appt.id);
                      setGroomerNote(e.target.value);
                    }}
                    className="w-full p-3 border border-slate-200 rounded-xl text-xs"
                  />
                  <button
                    onClick={() => handleCompleteGrooming(appt.id)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>MARK GROOMING COMPLETED & SAVE NOTES</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
