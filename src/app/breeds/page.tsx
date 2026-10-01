'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Calendar, CheckCircle2, Heart, Sparkles } from 'lucide-react';

export default function BreedsPage() {
  const { data } = useApp();
  if (!data) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Specialized Small Breed Care</span>
        <h1 className="text-4xl font-serif font-bold text-slate-900">Supported Small Breeds</h1>
        <p className="text-sm text-slate-600">
          Our master groomers are trained in breed-standard hand scissoring, Asian Fusion teddy-bear cuts, and coat care for all small breeds under 12kg.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.breeds.map((breed) => (
          <div
            key={breed.id}
            className="bg-white rounded-3xl border border-brand-200 p-6 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={breed.image}
                  alt={breed.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-brand-200"
                />
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900">{breed.name}</h3>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full inline-block mt-1">
                    ✓ Small Breed Supported
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{breed.description}</p>

              <div className="bg-cream-100 p-3 rounded-xl border border-brand-100 text-xs">
                <span className="font-bold text-brand-900 block mb-1">Recommended Services:</span>
                <span className="text-slate-700">{breed.recommended_services.join(', ')}</span>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href={`/book?breed=${encodeURIComponent(breed.name)}`}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Grooming for {breed.name}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-brand-900 text-white p-8 rounded-3xl text-center space-y-4">
        <h3 className="text-2xl font-serif font-bold">Don't See Your Breed Listed?</h3>
        <p className="text-xs text-brand-200 max-w-xl mx-auto">
          We welcome ALL small breed dogs and puppies under 12kg! If your pup needs gentle grooming, feel free to contact us or book directly.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-white text-brand-900 font-bold px-6 py-2.5 rounded-full text-xs shadow-md"
        >
          <span>Contact Petite Paws Team</span>
        </Link>
      </div>
    </div>
  );
}
