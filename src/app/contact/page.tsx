'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation, ShieldCheck, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Get In Touch</span>
        <h1 className="text-4xl font-serif font-bold text-slate-900">Visit Petite Paws Studio</h1>
        <p className="text-sm text-slate-600">
          Located in Bandra West, Mumbai. Appointment-only grooming salon for small-breed dogs and puppies under 12kg.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-brand-200 shadow-soft space-y-6">
            <h3 className="text-xl font-serif font-bold text-slate-900">Contact Details</h3>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-sm">Studio Address</span>
                  <span>74 Blooming Petale Avenue, Bandra West, Mumbai 400050</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-sm">Phone Helpline</span>
                  <span>+91 98765 43210</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-sm">WhatsApp Concierge</span>
                  <span>+91 98765 43210</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-sm">Operating Hours</span>
                  <span>Monday — Sunday: 9:00 AM — 7:00 PM</span>
                  <span className="block text-brand-600 font-semibold mt-0.5">(Appointment-Only System)</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href="tel:+919876543210"
                className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Cancellation Policy Box */}
          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-200 text-xs text-amber-900 space-y-2">
            <h4 className="font-bold flex items-center gap-1.5 text-sm">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              Studio Cancellation & Rescheduling Policy
            </h4>
            <p className="leading-relaxed">
              We operate an appointment-only salon to guarantee a peaceful, non-chaotic environment for every puppy. Free cancellation is available up to 24 hours before your slot.
            </p>
          </div>
        </div>

        {/* Map Placeholder & Direct Booking Box */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-brand-200 overflow-hidden shadow-soft">
            <div className="p-4 bg-brand-900 text-white flex items-center justify-between text-xs">
              <span className="font-bold flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-brand-400" />
                Google Maps Studio Location
              </span>
              <a
                href="https://maps.google.com/?q=Bandra+West+Mumbai"
                target="_blank"
                rel="noreferrer"
                className="bg-brand-500 text-white px-3 py-1 rounded-full font-bold hover:bg-brand-600"
              >
                Get Directions ↗
              </a>
            </div>

            {/* Embedded Visual Map Preview */}
            <div className="relative h-80 bg-slate-100 flex items-center justify-center text-center p-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-brand-500 text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
                  📍
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-base">Petite Paws Grooming Studio</h4>
                <p className="text-xs text-slate-600 max-w-sm">
                  74 Blooming Petale Avenue, Bandra West, Mumbai 400050
                </p>
                <a
                  href="https://maps.google.com/?q=Bandra+West+Mumbai"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block bg-brand-900 text-white px-5 py-2 rounded-xl text-xs font-bold"
                >
                  Open in Google Maps Application
                </a>
              </div>
            </div>
          </div>

          <div className="bg-brand-50 p-8 rounded-3xl border border-brand-200 text-center space-y-4">
            <h3 className="text-2xl font-serif font-bold text-slate-900">Ready to Schedule a Visit?</h3>
            <p className="text-xs text-slate-600">
              Skip phone wait times and reserve your small pup’s slot online in 2 minutes.
            </p>
            <Link
              href="/book"
              className="inline-block bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-3.5 rounded-full text-xs shadow-md"
            >
              Book Grooming Appointment Online 🐾
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
