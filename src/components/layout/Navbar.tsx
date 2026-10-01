'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Dog, Calendar, User as UserIcon, Menu, X, Shield, Sparkles, LogIn, Heart } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, switchRole } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Small Breeds', href: '/breeds' },
    { name: 'Before & After', href: '/gallery' },
    { name: 'Packages', href: '/#packages' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-cream-100/90 backdrop-blur-md border-b border-brand-200/50 shadow-sm transition-all">
      {/* Top Banner - Small Breed Specialization Tag */}
      <div className="bg-brand-900 text-cream-100 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-brand-400" />
        <span>Exclusively Dedicated to Small-Breed Dogs & Puppies under 12kg</span>
        <span className="hidden md:inline-span font-semibold text-brand-300 ml-2">| 📍 Bandra West, Mumbai • 📞 +91 98765 43210</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-brand-500 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Dog className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold tracking-tight text-brand-900 font-serif block">
              Petite Paws
            </span>
            <span className="text-[10px] uppercase tracking-widest text-brand-600 font-semibold block -mt-1">
              Small-Breed Grooming
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand-600 ${
                  isActive ? 'text-brand-700 font-bold border-b-2 border-brand-500 pb-1' : 'text-slate-700'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA & Role Selector / OTP Login */}
        <div className="hidden lg:flex items-center gap-3">
          
          {/* Quick Role Switcher */}
          <div className="bg-brand-100/80 p-1 rounded-full border border-brand-200 flex items-center text-xs">
            <button
              onClick={() => switchRole('customer')}
              className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                currentUser.role === 'customer'
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'text-brand-800 hover:text-brand-900'
              }`}
            >
              Customer
            </button>
            <button
              onClick={() => switchRole('groomer')}
              className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                currentUser.role === 'groomer'
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'text-brand-800 hover:text-brand-900'
              }`}
            >
              Groomer
            </button>
            <button
              onClick={() => switchRole('admin')}
              className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                currentUser.role === 'admin'
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'text-brand-800 hover:text-brand-900'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Unified Email + OTP Login Button */}
          <Link
            href="/login"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 bg-white border border-brand-200 hover:bg-brand-50 transition-colors shadow-xs"
          >
            <LogIn className="w-3.5 h-3.5 text-brand-600" />
            <span>Email OTP Login</span>
          </Link>

          {/* Dashboard Direct Links */}
          {currentUser.role === 'customer' && (
            <Link
              href="/account"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-brand-900 hover:bg-brand-100 transition-colors"
            >
              <UserIcon className="w-4 h-4 text-brand-600" />
              <span>My Pets</span>
            </Link>
          )}

          {currentUser.role === 'groomer' && (
            <Link
              href="/groomer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-amber-900 bg-amber-100/80 hover:bg-amber-200 transition-colors"
            >
              <Shield className="w-4 h-4 text-amber-700" />
              <span>Groomer Portal</span>
            </Link>
          )}

          {currentUser.role === 'admin' && (
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-emerald-900 bg-emerald-100/80 hover:bg-emerald-200 transition-colors"
            >
              <Shield className="w-4 h-4 text-emerald-700" />
              <span>Admin Portal</span>
            </Link>
          )}

          {/* Primary CTA Button */}
          <Link
            href="/book"
            className="inline-flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white px-4 py-2.5 rounded-full font-bold text-xs shadow-md hover:shadow-glow transition-all transform hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Grooming</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/login"
            className="bg-white border border-brand-300 text-brand-900 px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs"
          >
            OTP Login
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-brand-900 rounded-lg hover:bg-brand-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream-100 border-b border-brand-200 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex justify-around bg-brand-100 p-1.5 rounded-xl text-xs font-semibold text-brand-900">
            <span className="text-slate-500 text-[11px] flex items-center">Mode:</span>
            <button
              onClick={() => { switchRole('customer'); setMobileMenuOpen(false); }}
              className={`px-3 py-1 rounded-lg ${currentUser.role === 'customer' ? 'bg-brand-500 text-white' : ''}`}
            >
              Customer
            </button>
            <button
              onClick={() => { switchRole('groomer'); setMobileMenuOpen(false); }}
              className={`px-3 py-1 rounded-lg ${currentUser.role === 'groomer' ? 'bg-brand-500 text-white' : ''}`}
            >
              Groomer
            </button>
            <button
              onClick={() => { switchRole('admin'); setMobileMenuOpen(false); }}
              className={`px-3 py-1 rounded-lg ${currentUser.role === 'admin' ? 'bg-brand-500 text-white' : ''}`}
            >
              Admin
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-800 hover:bg-brand-100 rounded-lg"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-brand-200 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-white border border-brand-300 text-slate-900 py-2.5 rounded-xl font-bold text-xs shadow-xs"
            >
              🔐 Email + OTP Login (Admin / Groomer / Customer)
            </Link>
            <Link
              href={currentUser.role === 'admin' ? '/admin' : currentUser.role === 'groomer' ? '/groomer' : '/account'}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-brand-100 text-brand-900 py-2.5 rounded-xl font-semibold text-sm"
            >
              {currentUser.role === 'admin' ? '⚙️ Admin Dashboard' : currentUser.role === 'groomer' ? '✂️ Groomer Portal' : '🐾 My Pets & Dashboard'}
            </Link>
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-brand-500 text-white py-2.5 rounded-xl font-semibold text-sm shadow-md"
            >
              🗓️ Book Grooming Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
