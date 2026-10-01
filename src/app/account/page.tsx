'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import PetGroomingCard from '@/components/ui/PetGroomingCard';
import { Calendar, RefreshCw, Scissors, User, Heart, Bell, Award, Download, Clock, CheckCircle2, AlertCircle, Plus } from 'lucide-react';

export default function AccountPage() {
  const { data, currentUser, refreshData } = useApp();
  const [activeTab, setActiveTab] = useState<'pets' | 'bookings' | 'history' | 'loyalty' | 'notifications'>('pets');

  if (!data) return null;

  const myPets = data.pets.filter((p) => p.user_id === currentUser.id || true); // show all customer pets for demo
  const myAppts = data.appointments.filter((a) => a.user_id === currentUser.id || true);
  const myLoyalty = data.loyalty[currentUser.id] || { points: 150, history: [] };
  const myNotifs = data.notifications.filter((n) => n.user_id === currentUser.id || true);

  const upcomingAppts = myAppts.filter((a) => a.status === 'confirmed' || a.status === 'pending');
  const pastAppts = myAppts.filter((a) => a.status === 'completed' || a.status === 'cancelled');

  const handleCancelAppt = async (apptId: string) => {
    if (!confirm('Are you sure you want to cancel this grooming appointment?')) return;
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cancel', appointment_id: apptId })
      });
      if (res.ok) {
        await refreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Customer Header Info */}
      <div className="bg-brand-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
            alt={currentUser.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-brand-300"
          />
          <div>
            <h1 className="text-2xl font-serif font-bold text-white">{currentUser.name}</h1>
            <p className="text-xs text-brand-300">{currentUser.email} • {currentUser.phone}</p>
            <span className="inline-block bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full mt-1">
              🐾 VIP Small Breed Parent
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-brand-800 p-4 rounded-2xl border border-brand-700">
          <Award className="w-8 h-8 text-amber-400 shrink-0" />
          <div>
            <span className="text-[10px] text-brand-300 uppercase font-bold block">Paw Points Balance</span>
            <span className="text-2xl font-serif font-bold text-white">{myLoyalty.points} Paw Points</span>
            <span className="text-[10px] text-emerald-400 block">₹{myLoyalty.points} Redeemable Value</span>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap gap-2 border-b border-brand-200 pb-2">
        <button
          onClick={() => setActiveTab('pets')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
            activeTab === 'pets' ? 'bg-brand-500 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-brand-100'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>MY PETS ({myPets.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
            activeTab === 'bookings' ? 'bg-brand-500 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-brand-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>MY BOOKINGS ({myAppts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
            activeTab === 'history' ? 'bg-brand-500 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-brand-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>GROOMING HISTORY</span>
        </button>

        <button
          onClick={() => setActiveTab('loyalty')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
            activeTab === 'loyalty' ? 'bg-brand-500 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-brand-100'
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>PAW POINTS</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
            activeTab === 'notifications' ? 'bg-brand-500 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-brand-100'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>NOTIFICATIONS ({myNotifs.length})</span>
        </button>
      </div>

      {/* TAB CONTENT: MY PETS (Requirement #39 Pet Grooming Card) */}
      {activeTab === 'pets' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-slate-900">Registered Pet Profiles</h2>
            <Link
              href="/book"
              className="inline-flex items-center gap-1.5 bg-brand-900 text-white font-bold px-4 py-2 rounded-xl text-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Register New Pet</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myPets.map((pet) => (
              <PetGroomingCard key={pet.id} pet={pet} />
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: MY BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <h2 className="text-xl font-serif font-bold text-slate-900">Upcoming & Recent Bookings</h2>

          {upcomingAppts.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Upcoming Appointments:</h3>
              {upcomingAppts.map((appt) => (
                <div key={appt.id} className="bg-white p-6 rounded-3xl border-2 border-brand-500 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full uppercase">
                      CONFIRMED • #{appt.booking_number}
                    </span>
                    <h4 className="text-lg font-serif font-bold text-slate-900">{appt.pet_name} — {appt.service_name}</h4>
                    <p className="text-xs text-slate-600 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-brand-600" />
                      <span><b>Date:</b> {appt.date} at {appt.time_slot}</span>
                      <span>•</span>
                      <span><b>Stylist:</b> {appt.groomer_name}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleCancelAppt(appt.id)}
                      className="px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-xl text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <Link
                      href={`/booking-confirmation/${appt.id}`}
                      className="px-4 py-2 bg-brand-500 text-white rounded-xl text-xs font-bold"
                    >
                      View Receipt
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {pastAppts.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Past Appointments:</h3>
              {pastAppts.map((appt) => (
                <div key={appt.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{appt.pet_name} ({appt.breed})</span>
                    <p className="text-slate-500">{appt.service_name} • {appt.date} • ₹{appt.final_price}</p>
                  </div>
                  <Link
                    href={`/book?petId=${appt.pet_id}&breed=${encodeURIComponent(appt.breed)}`}
                    className="inline-flex items-center gap-1 bg-brand-100 text-brand-900 font-bold px-3 py-1.5 rounded-xl text-xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Book Again</span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: GROOMING HISTORY (Requirement #13) */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <h2 className="text-xl font-serif font-bold text-slate-900">Per-Pet Grooming History & Notes</h2>

          <div className="space-y-4">
            {data.grooming_history.map((record) => (
              <div key={record.id} className="bg-white p-6 rounded-3xl border border-brand-200 shadow-soft space-y-3">
                <div className="flex items-center justify-between border-b border-brand-100 pb-3">
                  <div>
                    <h3 className="font-serif font-bold text-slate-900 text-base">{record.pet_name}</h3>
                    <span className="text-xs text-slate-500">{record.service_name} • {record.date}</span>
                  </div>
                  <span className="text-sm font-serif font-bold text-brand-900">₹{record.price}</span>
                </div>

                <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-xs text-amber-900">
                  <span className="font-bold block text-[10px] uppercase text-amber-800">Stylist Note ({record.groomer_name}):</span>
                  <p className="mt-0.5">"{record.groomer_notes}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: PAW POINTS (Requirement #25) */}
      {activeTab === 'loyalty' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-brand-900 to-amber-900 text-white p-8 rounded-3xl space-y-3">
            <h2 className="text-3xl font-serif font-bold">Paw Points Rewards</h2>
            <p className="text-xs text-brand-200">
              Every ₹100 spent = 1 Paw Point. Redeem points for instant discounts on future grooming appointments!
            </p>

            <div className="pt-2 flex items-center gap-4">
              <span className="text-4xl font-serif font-bold text-amber-400">{myLoyalty.points} Paw Points</span>
              <span className="bg-amber-400 text-brand-900 text-xs font-bold px-3 py-1 rounded-full">
                Value: ₹{myLoyalty.points} Off Next Groom
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-brand-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Paw Points Activity Log:</h3>
            <ul className="space-y-2 text-xs">
              {myLoyalty.history.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-700">{item.action} ({item.date})</span>
                  <span className="font-bold text-emerald-600">+{item.points} Points</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* TAB CONTENT: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <div className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-slate-900">Notifications & Reminders</h2>
          <div className="space-y-3">
            {myNotifs.map((notif) => (
              <div key={notif.id} className="bg-white p-4 rounded-2xl border border-brand-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-brand-900 text-sm">{notif.title}</h4>
                  <span className="text-[10px] text-slate-400">{notif.date}</span>
                </div>
                <p className="text-slate-600">{notif.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
