'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Service } from '@/lib/db';
import { Calendar, Clock, Check, ChevronDown, Sparkles, Dog, ShieldCheck } from 'lucide-react';

export default function ServicesPage() {
  const { data } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>('srv_full_groom');

  if (!data) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Boutique Spa Menu</span>
        <h1 className="text-4xl font-serif font-bold text-slate-900">Small-Breed Grooming Services</h1>
        <p className="text-sm text-slate-600">
          Every service is customized for small-breed coats, sensitive skin, and gentle handling. Expand any card to see full inclusions.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.services.map((service) => {
          const isExpanded = expandedId === service.id;
          return (
            <div
              key={service.id}
              id={service.slug}
              className="bg-white rounded-3xl border border-brand-200 shadow-soft overflow-hidden flex flex-col justify-between hover:shadow-soft-lg transition-all"
            >
              <div>
                <div className="relative h-56 w-full">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  {service.badge && (
                    <span className="absolute top-4 left-4 bg-brand-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {service.badge}
                    </span>
                  )}
                  <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold">
                    Starting at ₹{service.starting_price}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-serif font-bold text-slate-900">{service.name}</h3>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-600" />
                      {service.duration_minutes} mins
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{service.description}</p>

                  <div className="bg-cream-100 p-3 rounded-xl border border-brand-100 text-xs font-medium text-slate-700">
                    <span className="font-bold text-brand-900 block mb-1">Suitable Breeds:</span>
                    <span>{service.suitable_breeds.join(', ')}</span>
                  </div>

                  {/* Expandable What's Included Accordion */}
                  <div className="border-t border-brand-100 pt-3">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : service.id)}
                      className="w-full text-left flex items-center justify-between text-xs font-bold text-brand-900 hover:text-brand-600 py-1"
                    >
                      <span>{isExpanded ? 'Hide What\'s Included ▲' : 'What\'s Included? (Click to view full list) ▼'}</span>
                    </button>

                    {isExpanded && (
                      <div className="mt-3 bg-brand-50/50 p-4 rounded-xl border border-brand-200 animate-in fade-in duration-200">
                        <ul className="space-y-2 text-xs text-slate-700">
                          {service.what_included.map((inc, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/book?serviceId=${service.id}`}
                  className="w-full bg-brand-500 hover:bg-brand-600 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>BOOK THIS SERVICE NOW</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
