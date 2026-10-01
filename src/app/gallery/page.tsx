'use client';

import React, { useState } from 'react';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import Link from 'next/link';

export default function GalleryPage() {
  const [filter, setFilter] = useState('All');

  const galleryItems = [
    {
      before: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
      after: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
      petName: 'Bella',
      breed: 'Shih Tzu',
      service: 'Full Signature Grooming'
    },
    {
      before: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80',
      after: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=600&q=80',
      petName: 'Milo',
      breed: 'Toy Poodle',
      service: 'Teddy Bear Scissoring'
    },
    {
      before: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&q=80',
      after: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=600&q=80',
      petName: 'Fluffy',
      breed: 'Pomeranian',
      service: 'Full De-shedding Treatment'
    },
    {
      before: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80',
      after: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=600&q=80',
      petName: 'Charlie',
      breed: 'Maltese',
      service: 'Puppy Intro Grooming'
    }
  ];

  const categories = ['All', 'Shih Tzu', 'Toy Poodle', 'Pomeranian', 'Maltese', 'Puppy Grooming'];

  const filteredItems = filter === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.breed === filter || (filter === 'Puppy Grooming' && item.service.includes('Puppy')));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Grooming Transformations</span>
        <h1 className="text-4xl font-serif font-bold text-slate-900">Before & After Gallery</h1>
        <p className="text-sm text-slate-600">
          Drag the interactive slider handle left or right to see how our master groomers style small breeds.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              filter === cat
                ? 'bg-brand-500 text-white shadow-md'
                : 'bg-white text-slate-700 border border-brand-200 hover:bg-brand-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredItems.map((item, i) => (
          <BeforeAfterSlider
            key={i}
            beforeImg={item.before}
            afterImg={item.after}
            petName={item.petName}
            breed={item.breed}
            service={item.service}
          />
        ))}
      </div>

      <div className="bg-cream-200/80 p-8 rounded-3xl border border-brand-200 text-center space-y-4">
        <h3 className="text-xl font-serif font-bold text-slate-900">Ready to Transform Your Pup?</h3>
        <p className="text-xs text-slate-600">
          Book an appointment today and give your small breed dog a fresh, comfortable haircut!
        </p>
        <Link
          href="/book"
          className="inline-block bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-3 rounded-full text-xs shadow-md"
        >
          Book Grooming Appointment Now 🐾
        </Link>
      </div>
    </div>
  );
}
