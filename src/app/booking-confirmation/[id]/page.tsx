'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, Calendar, Clock, MapPin, Phone, User, Scissors, Download, ExternalLink, ArrowRight } from 'lucide-react';

export default function BookingConfirmationPage() {
  const params = useParams();
  const { data } = useApp();

  if (!data) return null;

  const apptId = params.id as string;
  const appt = data.appointments.find((a) => a.id === apptId || a.booking_number === apptId) || data.appointments[0];

  const handleDownloadICS = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Petite Paws Grooming Studio//NONSGML v1.0//EN
BEGIN:VEVENT
SUMMARY:Petite Paws Grooming: ${appt.pet_name} (${appt.service_name})
DESCRIPTION:Grooming appointment for ${appt.pet_name} at Petite Paws Studio with ${appt.groomer_name}.
LOCATION:74 Blooming Petale Avenue, Bandra West, Mumbai
DTSTART:${appt.date.replace(/-/g, '')}T113000Z
DTEND:${appt.date.replace(/-/g, '')}T133000Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Grooming_${appt.booking_number}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-soft-lg border border-brand-200 space-y-8 text-center sm:text-left">
        
        {/* Confirmed Banner */}
        <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-brand-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
              Booking Confirmed! 🐾
            </span>
            <h1 className="text-3xl font-serif font-bold text-slate-900 mt-1">
              {appt.pet_name}’s Grooming is Set!
            </h1>
            <p className="text-xs text-slate-600">
              A confirmation receipt and reminder details have been dispatched.
            </p>
          </div>
          <div className="sm:ml-auto bg-brand-100 p-3 rounded-2xl border border-brand-200 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Booking Reference</span>
            <span className="text-lg font-mono font-bold text-brand-900">#{appt.booking_number}</span>
          </div>
        </div>

        {/* Appointment Details Table */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-cream-100 p-4 rounded-2xl border border-brand-100 space-y-1">
            <span className="text-slate-500 font-semibold block text-[10px] uppercase">Date & Time</span>
            <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-600" />
              {appt.date} at {appt.time_slot}
            </p>
          </div>

          <div className="bg-cream-100 p-4 rounded-2xl border border-brand-100 space-y-1">
            <span className="text-slate-500 font-semibold block text-[10px] uppercase">Grooming Service</span>
            <p className="font-bold text-brand-900 text-sm flex items-center gap-1.5">
              <Scissors className="w-4 h-4 text-brand-600" />
              {appt.service_name} ({appt.duration_minutes} Mins)
            </p>
          </div>

          <div className="bg-cream-100 p-4 rounded-2xl border border-brand-100 space-y-1">
            <span className="text-slate-500 font-semibold block text-[10px] uppercase">Master Groomer</span>
            <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <User className="w-4 h-4 text-brand-600" />
              {appt.groomer_name}
            </p>
          </div>

          <div className="bg-cream-100 p-4 rounded-2xl border border-brand-100 space-y-1">
            <span className="text-slate-500 font-semibold block text-[10px] uppercase">Total Price & Status</span>
            <p className="font-bold text-slate-900 text-sm flex items-center justify-between">
              <span>₹{appt.final_price}</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-md uppercase font-bold">
                {appt.payment_status}
              </span>
            </p>
          </div>
        </div>

        {/* Styling Preferences Saved */}
        {appt.grooming_preferences && (
          <div className="bg-brand-50 p-4 rounded-2xl border border-brand-200 space-y-2 text-xs">
            <h4 className="font-bold text-brand-900 text-sm">Grooming Styling Preferences Saved:</h4>
            <div className="flex flex-wrap gap-2 text-slate-700">
              <span className="bg-white px-2.5 py-1 rounded-lg border border-brand-200">Length: <b>{appt.grooming_preferences.hair_length}</b></span>
              <span className="bg-white px-2.5 py-1 rounded-lg border border-brand-200">Face: <b>{appt.grooming_preferences.face_style}</b></span>
              <span className="bg-white px-2.5 py-1 rounded-lg border border-brand-200">Tail: <b>{appt.grooming_preferences.tail_style}</b></span>
              <span className="bg-white px-2.5 py-1 rounded-lg border border-brand-200">Feet: <b>{appt.grooming_preferences.feet_style}</b></span>
            </div>
          </div>
        )}

        {/* Action Buttons (Requirement #9) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <button
            onClick={handleDownloadICS}
            className="p-3 bg-brand-50 hover:bg-brand-100 text-brand-900 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border border-brand-200 transition-all"
          >
            <Calendar className="w-4 h-4 text-brand-600" />
            <span>Add to Calendar</span>
          </button>

          <Link
            href="/account"
            className="p-3 bg-brand-50 hover:bg-brand-100 text-brand-900 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border border-brand-200 transition-all"
          >
            <User className="w-4 h-4 text-brand-600" />
            <span>View Booking</span>
          </Link>

          <a
            href="https://maps.google.com/?q=Bandra+West+Mumbai"
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-brand-50 hover:bg-brand-100 text-brand-900 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border border-brand-200 transition-all"
          >
            <MapPin className="w-4 h-4 text-brand-600" />
            <span>Get Directions</span>
          </a>

          <Link
            href="/contact"
            className="p-3 bg-brand-50 hover:bg-brand-100 text-brand-900 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border border-brand-200 transition-all"
          >
            <Phone className="w-4 h-4 text-brand-600" />
            <span>Contact Us</span>
          </Link>
        </div>

        {/* Go to Dashboard */}
        <div className="pt-4 text-center">
          <Link
            href="/account"
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-3 rounded-full text-xs shadow-md"
          >
            <span>Go to My Account Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
