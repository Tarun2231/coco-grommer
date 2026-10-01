'use client';

import React from 'react';
import Link from 'next/link';
import { Dog, MapPin, Phone, Mail, Clock, Heart, ShieldCheck, Sparkles, Instagram, Facebook, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-cream-100 pt-16 pb-24 lg:pb-12 border-t border-brand-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-brand-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-500 text-white flex items-center justify-center font-bold">
                <Dog className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold font-serif text-white tracking-tight">Petite Paws</span>
            </Link>
            <p className="text-brand-200 text-sm leading-relaxed">
              Mumbai’s premier boutique grooming studio dedicated exclusively to puppies and small-breed dogs under 12kg. Stress-free, appointment-only gentle care.
            </p>
            <div className="flex items-center gap-3 pt-2 text-brand-300">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-brand-800 hover:bg-brand-700 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-brand-800 hover:bg-brand-700 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-brand-800 hover:bg-brand-700 flex items-center justify-center transition-colors">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-bold text-brand-100">Grooming Services</h4>
            <ul className="space-y-2.5 text-sm text-brand-200">
              <li><Link href="/services#full-grooming" className="hover:text-white transition-colors">Full Signature Grooming</Link></li>
              <li><Link href="/services#bath-blow-dry" className="hover:text-white transition-colors">Bath & Fluff Blow Dry</Link></li>
              <li><Link href="/services#puppy-intro" className="hover:text-white transition-colors">Puppy Introduction Groom</Link></li>
              <li><Link href="/services#maintenance" className="hover:text-white transition-colors">Maintenance Grooming</Link></li>
              <li><Link href="/services#deshedding" className="hover:text-white transition-colors">Undercoat De-shedding</Link></li>
              <li><Link href="/services#nail-care" className="hover:text-white transition-colors">Nail Care & Paw Balm</Link></li>
            </ul>
          </div>

          {/* Supported Small Breeds */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-bold text-brand-100">Specialized Breeds</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {['Shih Tzu', 'Toy Poodle', 'Maltese', 'Pomeranian', 'Yorkie', 'Chihuahua', 'Pug', 'Frenchie', 'Dachshund', 'Lhasa Apso', 'Cavalier'].map((b) => (
                <Link
                  key={b}
                  href="/breeds"
                  className="bg-brand-800 hover:bg-brand-700 text-brand-200 px-2.5 py-1 rounded-full transition-colors"
                >
                  {b}
                </Link>
              ))}
            </div>
            <p className="text-xs text-brand-300 italic pt-2">
              Don’t see your breed? All small breeds under 12kg are warmly welcome!
            </p>
          </div>

          {/* Studio Location & Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-bold text-brand-100">Visit Petite Paws</h4>
            <ul className="space-y-3 text-sm text-brand-200">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>74 Blooming Petale Avenue, Bandra West, Mumbai 400050</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <span>hello@petitepawsgrooming.com</span>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-brand-100">Monday — Sunday</span>
                  <span className="text-xs text-brand-300">9:00 AM — 7:00 PM (Appointment Only)</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-brand-300 gap-4">
          <p>© 2026 Petite Paws Grooming Studio. All rights reserved. Exclusively for small breeds & puppies.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-white">Cancellation Policy</Link>
            <Link href="/contact" className="hover:text-white">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
