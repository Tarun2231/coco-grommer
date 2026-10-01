'use client';

import React, { Suspense } from 'react';
import BookingWizard from '@/components/booking/BookingWizard';

export default function BookPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center max-w-xl mx-auto space-y-2 mb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Online Scheduling</span>
        <h1 className="text-3xl font-serif font-bold text-slate-900">Book Small-Breed Grooming</h1>
        <p className="text-xs text-slate-600">
          Fast 8-step booking process. Exclusively for small-breed dogs and puppies under 12kg.
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-20 text-xs font-bold text-brand-800">Loading wizard...</div>}>
        <BookingWizard />
      </Suspense>
    </div>
  );
}
