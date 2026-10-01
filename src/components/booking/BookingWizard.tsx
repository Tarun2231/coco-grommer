'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Pet, Service, Breed, Groomer } from '@/lib/db';
import { TimeSlot } from '@/lib/booking-engine';
import { Calendar as CalendarIcon, Clock, Check, Plus, Dog, Scissors, Sparkles, Shield, User, ArrowLeft, ArrowRight, Tag, CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';

export default function BookingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, currentUser, refreshData } = useApp();

  const preselectedPetId = searchParams.get('petId');
  const preselectedBreed = searchParams.get('breed');
  const preselectedServiceId = searchParams.get('serviceId');

  // Step state (1 to 9)
  const [step, setStep] = useState(1);

  // Form states
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isNewPet, setIsNewPet] = useState(false);
  const [newPetName, setNewPetName] = useState('');
  const [newPetAge, setNewPetAge] = useState('1 Year');
  const [newPetWeight, setNewPetWeight] = useState('4 kg');

  const [selectedBreed, setSelectedBreed] = useState<string>(preselectedBreed || '');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Grooming Preferences
  const [hairLength, setHairLength] = useState<'Very Short' | 'Short' | 'Medium' | 'Long'>('Medium');
  const [faceStyle, setFaceStyle] = useState<'Teddy Bear' | 'Round Face' | 'Breed Standard' | 'Customer Preference'>('Teddy Bear');
  const [tailStyle, setTailStyle] = useState<'Full' | 'Trimmed'>('Full');
  const [feetStyle, setFeetStyle] = useState<'Rounded' | 'Natural' | 'Trimmed'>('Rounded');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Groomer & Date/Time
  const [selectedGroomer, setSelectedGroomer] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0] // Tomorrow as default
  );
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [slotsLoading, setSlotsLoading] = useState(false);

  // Customer Contact Details
  const [customerName, setCustomerName] = useState(currentUser?.name || 'Ananya Sharma');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || 'user@example.com');

  // Coupon
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'salon'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Preload initial selections if query params present
  useEffect(() => {
    if (!data) return;

    if (preselectedPetId) {
      const p = data.pets.find((item) => item.id === preselectedPetId);
      if (p) {
        setSelectedPet(p);
        setSelectedBreed(p.breed);
        setHairLength(p.hair_length || 'Medium');
        setFaceStyle(p.face_style || 'Teddy Bear');
        setTailStyle(p.tail_style || 'Full');
        setFeetStyle(p.feet_style || 'Rounded');
        setSpecialInstructions(p.special_instructions || '');
      }
    }

    if (preselectedServiceId) {
      const s = data.services.find((item) => item.id === preselectedServiceId);
      if (s) setSelectedService(s);
    } else if (!selectedService && data.services.length > 0) {
      setSelectedService(data.services[0]);
    }
  }, [data, preselectedPetId, preselectedServiceId]);

  // Fetch real-time available time slots whenever date, service duration, or groomer changes
  useEffect(() => {
    if (!selectedDate) return;
    const fetchSlots = async () => {
      setSlotsLoading(true);
      try {
        const duration = selectedService ? selectedService.duration_minutes : 120;
        const res = await fetch(`/api/availability?date=${selectedDate}&duration=${duration}&groomerId=${selectedGroomer}`);
        if (res.ok) {
          const json = await res.json();
          setAvailableSlots(json.slots || []);
        }
      } catch (err) {
        console.error('Failed to load slots:', err);
      } finally {
        setSlotsLoading(false);
      }
    };
    fetchSlots();
  }, [selectedDate, selectedService, selectedGroomer]);

  if (!data) {
    return (
      <div className="text-center py-20 text-brand-800 font-medium">
        Loading grooming booking system...
      </div>
    );
  }

  // Handle Coupon Application
  const handleApplyCoupon = () => {
    if (!selectedService) return;
    const cleanCode = couponCode.trim().toUpperCase();
    const found = data.coupons.find((c) => c.code === cleanCode && c.active);

    if (found) {
      if (found.discount_type === 'percent') {
        const disc = Math.round((selectedService.starting_price * found.discount_value) / 100);
        setAppliedDiscount(disc);
        setCouponMessage(`✅ ${found.discount_value}% Discount Applied (-₹${disc})`);
      } else {
        setAppliedDiscount(found.discount_value);
        setCouponMessage(`✅ ₹${found.discount_value} Discount Applied`);
      }
    } else {
      setAppliedDiscount(0);
      setCouponMessage('❌ Invalid or expired coupon code. Try WELCOME10 or PUPPY20');
    }
  };

  const finalPrice = selectedService
    ? Math.max(0, selectedService.starting_price - appliedDiscount)
    : 0;

  // Handle Booking Final Submission
  const handleConfirmBooking = async () => {
    if (!selectedService || !selectedSlot) {
      setErrorMessage('Please complete all steps and select an available time slot.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const petNameFinal = isNewPet ? newPetName : selectedPet ? selectedPet.name : 'Little Pup';
      const petIdFinal = selectedPet ? selectedPet.id : `pet_new_${Date.now()}`;

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          user_id: currentUser.id,
          customer_name: customerName,
          customer_phone: customerPhone,
          customer_email: customerEmail,
          pet_id: petIdFinal,
          pet_name: petNameFinal,
          breed: selectedBreed || 'Small Breed',
          service_id: selectedService.id,
          service_name: selectedService.name,
          groomer_id: selectedGroomer === 'any' ? 'grm_sarah' : selectedGroomer,
          groomer_name:
            selectedGroomer === 'any'
              ? 'Sarah Jenkins (Master Stylist)'
              : data.groomers.find((g) => g.id === selectedGroomer)?.name || 'Sarah Jenkins',
          date: selectedDate,
          time_slot: selectedSlot,
          duration_minutes: selectedService.duration_minutes,
          price: selectedService.starting_price,
          discount_amount: appliedDiscount,
          final_price: finalPrice,
          payment_status: paymentMethod === 'salon' ? 'salon' : 'paid',
          payment_method: paymentMethod === 'upi' ? 'UPI' : paymentMethod === 'card' ? 'Credit/Debit Card' : 'Pay at Salon',
          grooming_preferences: {
            hair_length: hairLength,
            face_style: faceStyle,
            tail_style: tailStyle,
            feet_style: feetStyle,
            special_notes: specialInstructions
          }
        })
      });

      const result = await res.json();
      if (res.ok && result.booking) {
        await refreshData();
        router.push(`/booking-confirmation/${result.booking.id}`);
      } else {
        setErrorMessage(result.error || 'Booking failed. Please try another slot.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-soft border border-brand-200/80 overflow-hidden my-6">
      {/* Wizard Header Progress Bar */}
      <div className="bg-brand-900 text-cream-100 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-semibold text-brand-300 uppercase tracking-widest block">
              Step {step} of 8
            </span>
            <h2 className="text-2xl font-serif font-bold text-white">
              {step === 1 && '1. Select Your Pet'}
              {step === 2 && '2. Select Dog Breed'}
              {step === 3 && '3. Choose Grooming Service'}
              {step === 4 && '4. Grooming Styling Preferences'}
              {step === 5 && '5. Choose Master Groomer'}
              {step === 6 && '6. Select Date & Time Slot'}
              {step === 7 && '7. Customer Details & Coupon'}
              {step === 8 && '8. Review & Confirm Booking'}
            </h2>
          </div>
          <div className="w-12 h-12 bg-brand-800 rounded-2xl flex items-center justify-center text-brand-400 font-bold text-lg">
            {step}/8
          </div>
        </div>

        {/* Progress Bar Indicator */}
        <div className="w-full bg-brand-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-brand-500 h-full transition-all duration-300 ease-out"
            style={{ width: `${(step / 8) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Wizard Content Area */}
      <div className="p-6 sm:p-8 space-y-6">

        {/* STEP 1: Select Pet */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <p className="text-sm text-slate-600">
              Select an existing pet profile from your account or add a new small-breed pup.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.pets.map((pet) => {
                const isSelected = selectedPet?.id === pet.id && !isNewPet;
                return (
                  <div
                    key={pet.id}
                    onClick={() => {
                      setSelectedPet(pet);
                      setIsNewPet(false);
                      setSelectedBreed(pet.breed);
                      setHairLength(pet.hair_length || 'Medium');
                      setFaceStyle(pet.face_style || 'Teddy Bear');
                    }}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-brand-300'
                    }`}
                  >
                    <img
                      src={pet.photo_url || 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=200&q=80'}
                      alt={pet.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{pet.name}</h4>
                      <p className="text-xs text-brand-700 font-semibold">{pet.breed} • {pet.age}</p>
                      <p className="text-[11px] text-slate-500 mt-1">Face: {pet.face_style}</p>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-6 h-6 text-brand-500 ml-auto shrink-0" />
                    )}
                  </div>
                );
              })}

              {/* Add New Pet Option */}
              <div
                onClick={() => {
                  setIsNewPet(true);
                  setSelectedPet(null);
                }}
                className={`p-4 rounded-2xl border-2 border-dashed cursor-pointer transition-all flex items-center gap-4 justify-center ${
                  isNewPet
                    ? 'border-brand-500 bg-brand-50/50'
                    : 'border-brand-300 hover:border-brand-400 bg-cream-50'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center">
                  <Plus className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-900 text-sm">+ Add New Small Pup</h4>
                  <p className="text-xs text-slate-500">First time at Petite Paws?</p>
                </div>
              </div>
            </div>

            {/* New Pet Fields if IsNewPet is selected */}
            {isNewPet && (
              <div className="bg-brand-50/60 p-5 rounded-2xl border border-brand-200 space-y-4 pt-4">
                <h4 className="font-bold text-brand-900 text-sm flex items-center gap-2">
                  <Dog className="w-4 h-4 text-brand-600" />
                  New Pet Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Pet Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Coco"
                      value={newPetName}
                      onChange={(e) => setNewPetName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-brand-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Age</label>
                    <input
                      type="text"
                      placeholder="e.g. 5 Months"
                      value={newPetAge}
                      onChange={(e) => setNewPetAge(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-brand-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Weight (kg)</label>
                    <input
                      type="text"
                      placeholder="e.g. 3.5 kg"
                      value={newPetWeight}
                      onChange={(e) => setNewPetWeight(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-brand-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Select Breed */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <p className="text-sm text-slate-600">
              Select your dog’s breed. Petite Paws specializes ONLY in small-breed dogs and puppies under 12kg.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {data.breeds.map((breed) => {
                const isSelected = selectedBreed === breed.name;
                return (
                  <div
                    key={breed.id}
                    onClick={() => setSelectedBreed(breed.name)}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition-all text-center ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50 shadow-sm'
                        : 'border-slate-200 hover:border-brand-300'
                    }`}
                  >
                    <img
                      src={breed.image}
                      alt={breed.name}
                      className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-brand-100"
                    />
                    <h5 className="font-bold text-slate-900 text-xs mt-2">{breed.name}</h5>
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                      ✓ Supported
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
              <span>Don't see your specific breed? As long as your dog is under 12kg, we warmly groom them!</span>
              <button
                onClick={() => setSelectedBreed('Other Small Breed')}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs ${
                  selectedBreed === 'Other Small Breed' ? 'bg-amber-800 text-white' : 'bg-amber-200 text-amber-900'
                }`}
              >
                Select Other Small Breed
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Choose Service */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <p className="text-sm text-slate-600">
              Select a luxury grooming service for <b>{selectedBreed || 'your pup'}</b>. Expand details to view what's included.
            </p>

            <div className="space-y-4">
              {data.services.map((service) => {
                const isSelected = selectedService?.id === service.id;
                return (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/60 shadow-sm'
                        : 'border-slate-200 hover:border-brand-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-16 h-16 rounded-xl object-cover shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-base">{service.name}</h4>
                            {service.badge && (
                              <span className="bg-brand-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                                {service.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 mt-1">{service.description}</p>
                          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mt-2">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-brand-600" />
                              {service.duration_minutes} mins
                            </span>
                            <span>•</span>
                            <span>Suitable for: {service.suitable_breeds[0]}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs text-slate-500 block">Starting at</span>
                        <span className="text-2xl font-bold font-serif text-brand-900">₹{service.starting_price}</span>
                        {isSelected && (
                          <span className="block text-xs font-bold text-brand-600 mt-1">Selected ✓</span>
                        )}
                      </div>
                    </div>

                    {/* Expandable What's Included */}
                    <div className="mt-4 pt-3 border-t border-brand-200/50 text-xs">
                      <span className="font-bold text-slate-800 block mb-1">What's Included:</span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-700">
                        {service.what_included.slice(0, 6).map((inc, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Grooming Preferences (Requirement #6) */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-lg font-serif font-bold text-slate-900">Custom Grooming Preferences</h3>
              <p className="text-xs text-slate-600">
                Specify exactly how you would like our stylists to cut and style {selectedPet?.name || 'your pet'}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Hair Length */}
              <div>
                <label className="text-xs font-bold text-slate-900 block mb-2">Hair Length</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Very Short', 'Short', 'Medium', 'Long'] as const).map((len) => (
                    <button
                      key={len}
                      type="button"
                      onClick={() => setHairLength(len)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border ${
                        hairLength === len
                          ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                          : 'bg-cream-50 text-slate-700 border-slate-200 hover:bg-brand-100'
                      }`}
                    >
                      {len}
                    </button>
                  ))}
                </div>
              </div>

              {/* Face Style */}
              <div>
                <label className="text-xs font-bold text-slate-900 block mb-2">Face Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Teddy Bear', 'Round Face', 'Breed Standard', 'Customer Preference'] as const).map((face) => (
                    <button
                      key={face}
                      type="button"
                      onClick={() => setFaceStyle(face)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border ${
                        faceStyle === face
                          ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                          : 'bg-cream-50 text-slate-700 border-slate-200 hover:bg-brand-100'
                      }`}
                    >
                      {face}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tail Style */}
              <div>
                <label className="text-xs font-bold text-slate-900 block mb-2">Tail Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Full', 'Trimmed'] as const).map((tail) => (
                    <button
                      key={tail}
                      type="button"
                      onClick={() => setTailStyle(tail)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border ${
                        tailStyle === tail
                          ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                          : 'bg-cream-50 text-slate-700 border-slate-200 hover:bg-brand-100'
                      }`}
                    >
                      {tail}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feet Style */}
              <div>
                <label className="text-xs font-bold text-slate-900 block mb-2">Feet Style</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Rounded', 'Natural', 'Trimmed'] as const).map((foot) => (
                    <button
                      key={foot}
                      type="button"
                      onClick={() => setFeetStyle(foot)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border ${
                        feetStyle === foot
                          ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                          : 'bg-cream-50 text-slate-700 border-slate-200 hover:bg-brand-100'
                      }`}
                    >
                      {foot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Free Text Note */}
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">
                Special Instructions & Temperament Notes
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Keep face rounded and extra fluffy. She is timid around blow dryers so please use low heat."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-brand-500"
              />
            </div>
          </div>
        )}

        {/* STEP 5: Choose Groomer */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <p className="text-sm text-slate-600">
              Select a preferred master groomer or choose "Any Available Groomer" for maximum time flexibility.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Any Groomer */}
              <div
                onClick={() => setSelectedGroomer('any')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                  selectedGroomer === 'any'
                    ? 'border-brand-500 bg-brand-50 shadow-sm'
                    : 'border-slate-200 hover:border-brand-300'
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-brand-200 text-brand-900 flex items-center justify-center font-bold text-lg">
                  🐾
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Any Available Groomer</h4>
                  <p className="text-xs text-slate-500">Fastest booking availability</p>
                </div>
              </div>

              {data.groomers.map((grm) => {
                const isSelected = selectedGroomer === grm.id;
                return (
                  <div
                    key={grm.id}
                    onClick={() => setSelectedGroomer(grm.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50 shadow-sm'
                        : 'border-slate-200 hover:border-brand-300'
                    }`}
                  >
                    <img
                      src={grm.photo}
                      alt={grm.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-brand-200"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{grm.name}</h4>
                      <p className="text-xs text-brand-700 font-medium">{grm.title}</p>
                      <p className="text-[11px] text-amber-700 font-bold mt-0.5">★ {grm.rating} ({grm.experience_years} yrs exp)</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6: Select Date & Available Slots */}
        {step === 6 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-slate-900">Select Grooming Date</h3>
                <p className="text-xs text-slate-600">Our studio operates 7 days a week from 9:00 AM to 7:00 PM.</p>
              </div>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border-2 border-brand-300 rounded-xl font-bold text-sm text-brand-900 focus:outline-brand-500"
              />
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Real-Time Available Slots for {selectedDate}:
              </h4>

              {slotsLoading ? (
                <div className="py-10 text-center text-xs text-slate-500">Checking groomer availability...</div>
              ) : availableSlots.length === 0 ? (
                <div className="p-6 bg-red-50 text-red-800 rounded-2xl text-center text-xs">
                  No slots available on this date. Please pick another date.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {availableSlots.map((slot, idx) => {
                    const isSelected = selectedSlot === slot.time;
                    return (
                      <button
                        key={idx}
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot.time)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                          !slot.available
                            ? 'bg-slate-100 text-slate-400 border-slate-200 line-through cursor-not-allowed'
                            : isSelected
                            ? 'bg-brand-500 text-white border-brand-500 shadow-md scale-105'
                            : 'bg-cream-50 text-slate-800 border-slate-200 hover:border-brand-400 hover:bg-brand-50'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{slot.time}</span>
                        </div>
                        <span className="text-[10px] block font-normal mt-0.5 opacity-90">
                          {slot.available ? slot.groomerName || 'Available' : 'Booked'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 7: Customer Details & Coupon */}
        {step === 7 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="text-lg font-serif font-bold text-slate-900">Customer Contact & Offer Code</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number (WhatsApp)</label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-sm"
                />
              </div>
            </div>

            {/* Coupon Promo Box */}
            <div className="bg-brand-50 p-4 rounded-2xl border border-brand-200 space-y-2">
              <label className="text-xs font-bold text-brand-900 block flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-brand-600" />
                Have a Coupon or Offer Code? (Try: WELCOME10 or PUPPY20)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. WELCOME10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="px-3 py-2 border rounded-xl text-xs uppercase font-bold focus:outline-brand-500 flex-1"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="bg-brand-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-brand-800"
                >
                  Apply Code
                </button>
              </div>
              {couponMessage && <p className="text-xs font-semibold text-brand-800 mt-1">{couponMessage}</p>}
            </div>
          </div>
        )}

        {/* STEP 8: Review & Confirm */}
        {step === 8 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="text-xl font-serif font-bold text-slate-900">Review Your Grooming Appointment</h3>

            <div className="bg-cream-100 p-6 rounded-2xl border border-brand-200 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block uppercase font-bold text-[10px]">Pet Name & Breed</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {isNewPet ? newPetName : selectedPet ? selectedPet.name : 'Little Pup'} ({selectedBreed})
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase font-bold text-[10px]">Service</span>
                  <span className="font-bold text-brand-900 text-sm">{selectedService?.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase font-bold text-[10px]">Date & Time</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedDate} @ {selectedSlot}</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase font-bold text-[10px]">Groomer</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {selectedGroomer === 'any' ? 'Sarah Jenkins' : data.groomers.find((g) => g.id === selectedGroomer)?.name}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-brand-200 flex flex-wrap gap-4 text-xs text-slate-700">
                <span>Hair: <b>{hairLength}</b></span>
                <span>Face: <b>{faceStyle}</b></span>
                <span>Tail: <b>{tailStyle}</b></span>
                <span>Feet: <b>{feetStyle}</b></span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3">Select Payment Method</h4>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-xs font-bold text-center ${
                    paymentMethod === 'upi' ? 'bg-brand-500 text-white border-brand-500' : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  Razorpay / UPI Instant
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-bold text-center ${
                    paymentMethod === 'card' ? 'bg-brand-500 text-white border-brand-500' : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  Credit / Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('salon')}
                  className={`p-3 rounded-xl border text-xs font-bold text-center ${
                    paymentMethod === 'salon' ? 'bg-brand-500 text-white border-brand-500' : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  Pay at Salon
                </button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-brand-900 text-white p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs text-brand-300 block">Total Amount Due</span>
                {appliedDiscount > 0 && (
                  <span className="text-xs text-emerald-400 font-bold block">Coupon Savings: -₹{appliedDiscount}</span>
                )}
              </div>
              <span className="text-3xl font-serif font-bold text-white">₹{finalPrice}</span>
            </div>

            {errorMessage && (
              <div className="p-4 bg-red-50 text-red-800 text-xs rounded-xl flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="pt-6 border-t border-brand-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 8 ? (
            <button
              type="button"
              onClick={() => {
                if (step === 6 && !selectedSlot) {
                  alert('Please select an available time slot before continuing.');
                  return;
                }
                setStep(step + 1);
              }}
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold px-7 py-2.5 rounded-xl text-xs shadow-md transition-all"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleConfirmBooking}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl text-sm shadow-lg badge-glow transition-all"
            >
              {isSubmitting ? (
                <span>Confirming Booking...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>CONFIRM & BOOK APPOINTMENT</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
