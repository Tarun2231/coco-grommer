'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Heart, Home, Scissors, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function MobileStickyBookingBar() {
  const pathname = usePathname();
  const { currentUser } = useApp();

  // Hide sticky bar on booking page itself so it doesn't clutter wizard steps
  if (pathname === '/book') return null;

  return (
    <>
      {/* Floating Book Button for Mobile */}
      <div className="fixed bottom-20 right-4 z-40 lg:hidden">
        <Link
          href="/book"
          className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold px-5 py-3 rounded-full shadow-lg badge-glow text-sm transition-all transform active:scale-95"
        >
          <Calendar className="w-5 h-5" />
          <span>Book Now 🐾</span>
        </Link>
      </div>

      {/* Mobile Bottom Navigation Bar (Requirement #29: Home, Services, Book, My Pets, Account) */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-cream-100/95 backdrop-blur-md border-t border-brand-200 lg:hidden px-2 py-2 shadow-lg">
        <div className="flex justify-around items-center text-[10px] font-semibold text-brand-900">
          <Link
            href="/"
            className={`flex flex-col items-center gap-0.5 p-1 ${
              pathname === '/' ? 'text-brand-600 font-bold' : 'text-slate-600'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
          
          <Link
            href="/services"
            className={`flex flex-col items-center gap-0.5 p-1 ${
              pathname === '/services' ? 'text-brand-600 font-bold' : 'text-slate-600'
            }`}
          >
            <Scissors className="w-5 h-5" />
            <span>Services</span>
          </Link>

          <Link
            href="/book"
            className="flex flex-col items-center gap-0.5 p-1 -mt-4"
          >
            <div className="w-11 h-11 bg-brand-500 text-white rounded-full flex items-center justify-center shadow-md">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-brand-700 font-bold">Book</span>
          </Link>

          <Link
            href="/breeds"
            className={`flex flex-col items-center gap-0.5 p-1 ${
              pathname === '/breeds' ? 'text-brand-600 font-bold' : 'text-slate-600'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span>Breeds</span>
          </Link>

          <Link
            href={currentUser.role === 'admin' ? '/admin' : currentUser.role === 'groomer' ? '/groomer' : '/account'}
            className={`flex flex-col items-center gap-0.5 p-1 ${
              pathname.includes('/account') || pathname.includes('/admin') || pathname.includes('/groomer')
                ? 'text-brand-600 font-bold'
                : 'text-slate-600'
            }`}
          >
            <User className="w-5 h-5" />
            <span>{currentUser.role === 'admin' ? 'Admin' : currentUser.role === 'groomer' ? 'Groomer' : 'My Pets'}</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
