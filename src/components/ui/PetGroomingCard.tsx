'use client';

import React from 'react';
import Link from 'next/link';
import { Pet } from '@/lib/db';
import { Calendar, RefreshCw, Scissors, Sparkles, AlertCircle } from 'lucide-react';

interface PetGroomingCardProps {
  pet: Pet;
  onBookAgain?: (pet: Pet) => void;
}

export default function PetGroomingCard({ pet, onBookAgain }: PetGroomingCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft border border-brand-200/70 hover:shadow-soft-lg transition-all relative overflow-hidden group">
      <div className="absolute top-0 right-0 bg-brand-100 text-brand-900 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
        Small Breed Profile
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        {/* Pet Photo */}
        <div className="relative w-28 h-28 rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-brand-200 group-hover:scale-105 transition-transform">
          <img
            src={pet.photo_url || 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80'}
            alt={pet.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-1 right-1 bg-white/90 backdrop-blur-xs text-[10px] px-2 py-0.5 rounded-md font-semibold text-brand-900">
            {pet.gender}
          </div>
        </div>

        {/* Pet Information */}
        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h3 className="text-2xl font-serif font-bold text-slate-900">{pet.name}</h3>
            <span className="bg-amber-100 text-amber-900 text-xs px-2.5 py-0.5 rounded-full font-bold">
              {pet.breed}
            </span>
          </div>

          <p className="text-xs text-slate-600 font-medium">
            {pet.age} • {pet.weight} • {pet.coat_type}
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="bg-cream-100 p-2.5 rounded-xl border border-brand-100">
              <span className="text-slate-600 block text-[10px] uppercase font-semibold">Last Grooming</span>
              <span className="font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-brand-600" />
                {pet.last_grooming || 'First Groom Pending'}
              </span>
            </div>

            <div className="bg-brand-50 p-2.5 rounded-xl border border-brand-200">
              <span className="text-brand-800 block text-[10px] uppercase font-semibold">Next Recommended</span>
              <span className="font-bold text-brand-900 flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                {pet.next_recommended || 'Ready for Booking'}
              </span>
            </div>
          </div>

          {/* Grooming Styling Badges */}
          <div className="pt-2 flex flex-wrap gap-1.5 justify-center sm:justify-start text-[11px]">
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
              Face: <b>{pet.face_style}</b>
            </span>
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
              Length: <b>{pet.hair_length}</b>
            </span>
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
              Tail: <b>{pet.tail_style}</b>
            </span>
          </div>

          {pet.special_instructions && (
            <p className="text-xs text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200 flex items-start gap-1.5 mt-2">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span><b>Special Note:</b> "{pet.special_instructions}"</span>
            </p>
          )}

          {/* Book Again Button */}
          <div className="pt-3">
            {onBookAgain ? (
              <button
                onClick={() => onBookAgain(pet)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>BOOK AGAIN</span>
              </button>
            ) : (
              <Link
                href={`/book?petId=${pet.id}&breed=${encodeURIComponent(pet.breed)}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>BOOK AGAIN</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
