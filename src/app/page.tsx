'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import PetGroomingCard from '@/components/ui/PetGroomingCard';
import { Dog, Calendar, Scissors, Sparkles, CheckCircle2, ShieldCheck, Heart, Star, ChevronDown, Clock, MapPin, Phone, MessageCircle, Award, Check } from 'lucide-react';

export default function HomePage() {
  const { data } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  if (!data) return null;

  const faqs = [
    {
      q: "How long does a grooming session take for a small breed?",
      a: "Standard full grooming for a small breed takes approximately 90 to 120 minutes. We never rush; our gentle pacing ensures your pup feels calm, comfortable, and safe throughout."
    },
    {
      q: "What age can puppies start grooming?",
      a: "Puppies can begin as early as 8 to 10 weeks old (after their first vaccinations). Our Puppy Introduction Groom is specifically designed to create a positive, playful, and stress-free habit for a lifetime."
    },
    {
      q: "Do you groom anxious or timid small dogs?",
      a: "Yes! We specialize in anxious handling. We use low-noise warm air dryers, soft touch techniques, and individual private styling stations so timid pups never feel overwhelmed by large barking dogs."
    },
    {
      q: "Can I stay during my dog's grooming appointment?",
      a: "Yes! We have a comfortable glass-viewing lounge where you can relax with a coffee while watching your pup receive gentle care."
    },
    {
      q: "Why do you specialize ONLY in small breeds?",
      a: "Small breeds (under 12kg) have distinct skin thickness, delicate cartilage, specific coat types (like double-coat Pomeranians or curly Poodles), and sensitive temperaments. Specializing allows us to maintain a quiet, hygienic, and safe environment tailored just for them."
    },
    {
      q: "Do you handle matted coats on Shih Tzus or Poodles?",
      a: "Yes! We use specialized leave-in detangling silk conditioners and high-precision scissoring to gently loosen mats without causing skin irritation or pulling."
    },
    {
      q: "How often should my small dog be groomed?",
      a: "For breeds like Shih Tzus, Toy Poodles, and Maltese, we recommend full grooming every 4 to 6 weeks. For short-haired breeds like Pugs or Chihuahuas, bath & nail care every 3 to 4 weeks is ideal."
    },
    {
      q: "What if I need to cancel or reschedule?",
      a: "You can easily reschedule or cancel up to 24 hours prior to your appointment directly through your customer dashboard with zero fees."
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION (Requirement #1) */}
      <section className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-gradient-to-b from-cream-100 via-brand-50/50 to-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-900 border border-brand-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider badge-glow">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Exclusively For Small-Breed Dogs & Puppies</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.15]">
                Premium Grooming, <br />
                <span className="text-brand-600 italic">Made for Small Breeds.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 max-w-2xl leading-relaxed">
                Specialized grooming and gentle care for puppies and small-breed dogs. Stress-free, appointment-only boutique experience in Bandra West.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/book"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-4 rounded-full text-base shadow-lg hover:shadow-glow transition-all transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book a Grooming Appointment</span>
                </Link>

                <Link
                  href="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-brand-50 text-brand-900 font-bold px-8 py-4 rounded-full text-base border-2 border-brand-200 shadow-sm transition-all"
                >
                  <Scissors className="w-5 h-5 text-brand-600" />
                  <span>View Services & Prices</span>
                </Link>
              </div>

              {/* Trust Indicators (Requirement #1) */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-semibold text-slate-800">
                <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-brand-200">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>Small-Breed Specialists</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-brand-200">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>Gentle & Stress-Free</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-brand-200">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>Experienced Groomers</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-brand-200">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>Hygienic Environment</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-brand-200">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>Appointment-Based</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-brand-200">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>Zero Large Dogs</span>
                </div>
              </div>

            </div>

            {/* Hero Right Media / Puppy Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-1 hover:rotate-0 transition-transform">
                  <img
                    src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80"
                    alt="Freshly groomed small breed puppy"
                    className="w-full h-[450px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-6">
                    <div className="text-white space-y-1">
                      <span className="bg-brand-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        Signature Teddy Bear Cut
                      </span>
                      <h3 className="text-2xl font-serif font-bold">Bella • Shih Tzu (2 Yrs)</h3>
                      <p className="text-xs text-brand-200">Groomed with organic silk oat conditioner</p>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-brand-200 flex items-center gap-3 animate-float">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    ★ 4.9
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">500+ Happy Pups</span>
                    <span className="text-[10px] text-slate-500">Rated #1 Small Breed Salon</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. WHY SMALL-BREED SPECIALISTS (Requirement #2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Why Small-Breed Grooming?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Small dogs and puppies are not just smaller dogs—they require specialized physical handling, coat texture care, low-noise gentle drying, cartilage protection, and calm temperamental pacing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-brand-200/80 shadow-soft hover:shadow-soft-lg transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900">Gentle Handling & Pacing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Toy breeds have delicate joints and trachea. We use soft padded neck loops and individual hand scissoring to avoid stress.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-brand-200/80 shadow-soft hover:shadow-soft-lg transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900">Coat-Specific Techniques</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              From double-coated Pomeranians to curly Toy Poodles and fine-haired Yorkies, each coat receives tailor-made organic shampoos and blow-outs.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-brand-200/80 shadow-soft hover:shadow-soft-lg transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900">Quiet & Hygienic Atmosphere</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No chaos, no loud barking from giant breeds. An appointment-only, calm salon where your pup feels like royalty.
            </p>
          </div>
        </div>
      </section>

      {/* 3. POPULAR SERVICES (Requirement #3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Tailored Care</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">Popular Grooming Services</h2>
          </div>
          <Link
            href="/services"
            className="text-sm font-bold text-brand-700 hover:text-brand-900 underline flex items-center gap-1"
          >
            View All Services & Whats Included →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.services.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-brand-200/80 overflow-hidden shadow-soft flex flex-col justify-between hover:shadow-soft-lg transition-all"
            >
              <div>
                <div className="relative h-48 w-full">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  {service.badge && (
                    <span className="absolute top-3 left-3 bg-brand-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {service.badge}
                    </span>
                  )}
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-serif font-bold text-slate-900">{service.name}</h3>
                    <span className="text-xl font-serif font-bold text-brand-900">₹{service.starting_price}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{service.description}</p>
                  
                  <div className="pt-2 border-t border-brand-100">
                    <span className="text-[11px] font-bold text-slate-800 block mb-1">Includes:</span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {service.what_included.slice(0, 4).map((inc, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/book?serviceId=${service.id}`}
                  className="w-full bg-brand-500 hover:bg-brand-600 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book {service.name}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SUPPORTED BREEDS (Requirement #2 & #20) */}
      <section className="bg-cream-200/60 py-16 border-y border-brand-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Small Breed Salon</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">Supported Small Breeds</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              We groom all toy, miniature, and small breeds under 12kg.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {data.breeds.slice(0, 12).map((breed) => (
              <Link
                key={breed.id}
                href={`/book?breed=${encodeURIComponent(breed.name)}`}
                className="bg-white p-4 rounded-2xl border border-brand-200/80 text-center hover:shadow-md hover:scale-105 transition-all group"
              >
                <img
                  src={breed.image}
                  alt={breed.name}
                  className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-brand-200 group-hover:border-brand-500 transition-colors"
                />
                <h4 className="font-bold text-slate-900 text-xs mt-2">{breed.name}</h4>
                <span className="text-[10px] text-brand-700 font-semibold block mt-0.5">Book Groom →</span>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs font-semibold text-slate-700">
              Don’t see your breed listed? <Link href="/contact" className="text-brand-700 underline font-bold">Contact us</Link>—if your pup is under 12kg, they are warmly welcome!
            </p>
          </div>
        </div>
      </section>

      {/* 5. BEFORE & AFTER GALLERY (Requirement #14) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Transformations</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">Before & After Gallery</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Drag the interactive slider handle to see real grooming transformations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BeforeAfterSlider
            beforeImg="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80"
            afterImg="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80"
            petName="Bella"
            breed="Shih Tzu"
            service="Full Signature Grooming"
          />

          <BeforeAfterSlider
            beforeImg="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80"
            afterImg="https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=600&q=80"
            petName="Milo"
            breed="Toy Poodle"
            service="Teddy Bear Scissoring"
          />

          <BeforeAfterSlider
            beforeImg="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&q=80"
            afterImg="https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=600&q=80"
            petName="Fluffy"
            breed="Pomeranian"
            service="Undercoat De-shedding"
          />
        </div>
      </section>

      {/* 6. HOW IT WORKS (Requirement #38) */}
      <section className="bg-brand-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-300">Simple 3-Step Process</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">How It Works</h2>
            <p className="text-xs sm:text-sm text-brand-200">
              Booking your pup’s pampering session is fast, simple, and transparent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-800/80 p-8 rounded-3xl border border-brand-700 text-center space-y-4">
              <div className="w-14 h-14 bg-brand-500 text-white rounded-2xl mx-auto flex items-center justify-center font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-serif font-bold">1. Choose Your Service</h3>
              <p className="text-xs text-brand-200 leading-relaxed">
                Select your pet, breed, haircut preferences, and luxury grooming package online.
              </p>
            </div>

            <div className="bg-brand-800/80 p-8 rounded-3xl border border-brand-700 text-center space-y-4">
              <div className="w-14 h-14 bg-brand-500 text-white rounded-2xl mx-auto flex items-center justify-center font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-serif font-bold">2. Pick Your Time</h3>
              <p className="text-xs text-brand-200 leading-relaxed">
                Choose a convenient real-time time slot with your preferred master stylist.
              </p>
            </div>

            <div className="bg-brand-800/80 p-8 rounded-3xl border border-brand-700 text-center space-y-4">
              <div className="w-14 h-14 bg-brand-500 text-white rounded-2xl mx-auto flex items-center justify-center font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-serif font-bold">3. Bring Your Pup</h3>
              <p className="text-xs text-brand-200 leading-relaxed">
                Bring your fur baby to our Bandra West studio and relax while we pamper them!
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-4 rounded-full text-sm shadow-lg badge-glow transition-all"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Your Pup's Grooming Now</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. GROOMING PACKAGES / SUBSCRIPTIONS (Requirement #26) */}
      <section id="packages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Savings & Memberships</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">Grooming Packages</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Save on regular grooming with our monthly care packages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl border-2 border-brand-200 p-8 flex flex-col justify-between hover:border-brand-500 hover:shadow-soft-lg transition-all relative"
            >
              {pkg.badge && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {pkg.badge}
                </span>
              )}

              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-slate-900">{pkg.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-serif font-bold text-brand-900">₹{pkg.price}</span>
                  <span className="text-sm text-slate-400 line-through">₹{pkg.original_price}</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 pt-2 border-t border-brand-100">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <Link
                  href="/book"
                  className="w-full bg-brand-900 hover:bg-brand-800 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <span>Select {pkg.name}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS (Requirement #15) */}
      <section className="bg-cream-200/50 py-16 border-y border-brand-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Loved by Pet Parents</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">Verified Reviews</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.reviews.filter((r) => r.status === 'approved').map((rev) => (
              <div key={rev.id} className="bg-white p-6 rounded-3xl border border-brand-200 shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500 gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    Verified Customer ✓
                  </span>
                </div>
                <p className="text-xs text-slate-700 italic leading-relaxed">"{rev.comment}"</p>
                <div className="pt-2 border-t border-brand-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{rev.user_name}</h4>
                    <p className="text-[10px] text-brand-700 font-semibold">{rev.pet_name} ({rev.breed})</p>
                  </div>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQs (Requirement #16) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Got Questions?</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-brand-200/80 overflow-hidden shadow-soft transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left font-bold text-slate-900 text-sm flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-brand-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-brand-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. FINAL CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="bg-brand-800 text-brand-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Book Today & Treat Your Pup
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold">
              Give Your Small Pup the Luxury Care They Deserve.
            </h2>
            <p className="text-brand-200 text-sm">
              Appointment-only slots fill fast. Reserve your spot in under 2 minutes online!
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold px-10 py-4 rounded-full text-base shadow-lg badge-glow transition-all transform hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Appointment Now 🐾</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
