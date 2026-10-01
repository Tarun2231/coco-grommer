'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Appointment, Service, Breed, Groomer, Coupon, WaitlistEntry } from '@/lib/db';
import { Calendar, DollarSign, Users, Dog, Scissors, Plus, Trash2, Edit3, CheckCircle2, XCircle, Settings, Award, Tag, Clock, ShieldAlert } from 'lucide-react';

export default function AdminDashboardPage() {
  const { data, refreshData } = useApp();
  const [adminTab, setAdminTab] = useState<'overview' | 'bookings' | 'services' | 'breeds' | 'groomers' | 'coupons' | 'waitlist' | 'settings'>('overview');

  // Modal / Form state for Service CRUD
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [newSrvName, setNewSrvName] = useState('');
  const [newSrvPrice, setNewSrvPrice] = useState(1499);
  const [newSrvDuration, setNewSrvDuration] = useState(120);

  // Modal / Form state for Breed CRUD
  const [showBreedModal, setShowBreedModal] = useState(false);
  const [newBreedName, setNewBreedName] = useState('');
  const [newBreedDesc, setNewBreedDesc] = useState('');

  if (!data) return null;

  // Overview metrics
  const totalRevenue = data.appointments.reduce((sum, a) => (a.payment_status === 'paid' ? sum + a.final_price : sum), 0);
  const todayAppts = data.appointments.filter((a) => a.date === new Date().toISOString().split('T')[0]);
  const completedAppts = data.appointments.filter((a) => a.status === 'completed');

  // Handle Action Status Change on Booking
  const handleUpdateApptStatus = async (id: string, status: 'confirmed' | 'completed' | 'cancelled') => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: status === 'completed' ? 'complete' : status === 'cancelled' ? 'cancel' : 'update',
          appointment_id: id
        })
      });
      if (res.ok) await refreshData();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Save New Service (Service Management CRUD)
  const handleSaveService = async () => {
    if (!newSrvName) return;
    const newService: Service = {
      id: `srv_${Date.now()}`,
      name: newSrvName.toUpperCase(),
      slug: newSrvName.toLowerCase().replace(/\s+/g, '-'),
      description: 'Custom small breed grooming service.',
      starting_price: Number(newSrvPrice),
      duration_minutes: Number(newSrvDuration),
      buffer_minutes: 15,
      what_included: ['Custom Bath', 'Blow Dry', 'Sanitary Trim', 'Nail Care'],
      suitable_breeds: ['All Small Breeds'],
      image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80',
      active: true
    };

    const updatedServices = [...data.services, newService];
    const updatedData = { ...data, services: updatedServices };

    await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'save_all', data: updatedData })
    });

    setShowServiceModal(false);
    setNewSrvName('');
    await refreshData();
  };

  // Handle Save New Breed (Breed Management CRUD)
  const handleSaveBreed = async () => {
    if (!newBreedName) return;
    const newBreedItem: Breed = {
      id: `brd_${Date.now()}`,
      name: newBreedName,
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=500&q=80',
      description: newBreedDesc || 'Small breed supported for gentle grooming.',
      small_breed_supported: true,
      recommended_services: ['Full Grooming'],
      average_duration: 90,
      popular: true,
      active: true
    };

    const updatedBreeds = [...data.breeds, newBreedItem];
    const updatedData = { ...data, breeds: updatedBreeds };

    await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'save_all', data: updatedData })
    });

    setShowBreedModal(false);
    setNewBreedName('');
    await refreshData();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">Admin Management Control</span>
          <h1 className="text-3xl font-serif font-bold text-white mt-1">Petite Paws Studio Dashboard</h1>
          <p className="text-xs text-slate-400">Manage bookings, services, small breed registry, staff shifts, coupons & studio settings.</p>
        </div>
        <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700 text-right text-xs">
          <span className="text-slate-400 block text-[10px]">Logged in as Admin</span>
          <span className="font-bold text-emerald-400">System Fully Operational</span>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {(['overview', 'bookings', 'services', 'breeds', 'groomers', 'coupons', 'waitlist', 'settings'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setAdminTab(tab)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              adminTab === tab
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {adminTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft">
              <span className="text-xs font-bold text-slate-500 uppercase block">Total Revenue</span>
              <span className="text-3xl font-serif font-bold text-emerald-700">₹{totalRevenue}</span>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft">
              <span className="text-xs font-bold text-slate-500 uppercase block">Total Appointments</span>
              <span className="text-3xl font-serif font-bold text-slate-900">{data.appointments.length}</span>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft">
              <span className="text-xs font-bold text-slate-500 uppercase block">Total Pets</span>
              <span className="text-3xl font-serif font-bold text-brand-700">{data.pets.length}</span>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft">
              <span className="text-xs font-bold text-slate-500 uppercase block">Active Groomers</span>
              <span className="text-3xl font-serif font-bold text-amber-700">{data.groomers.length}</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
            <h3 className="font-serif font-bold text-slate-900 text-lg">Recent Booking Registry</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-900 font-bold border-b">
                  <tr>
                    <th className="p-3">Ref ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Pet & Breed</th>
                    <th className="p-3">Service</th>
                    <th className="p-3">Date & Time</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.appointments.map((appt) => (
                    <tr key={appt.id} className="border-b hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-brand-900">#{appt.booking_number}</td>
                      <td className="p-3 font-semibold">{appt.customer_name}</td>
                      <td className="p-3">{appt.pet_name} ({appt.breed})</td>
                      <td className="p-3">{appt.service_name}</td>
                      <td className="p-3">{appt.date} @ {appt.time_slot}</td>
                      <td className="p-3 font-bold">₹{appt.final_price}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          appt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : appt.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="p-3 flex gap-1">
                        {appt.status !== 'completed' && (
                          <button
                            onClick={() => handleUpdateApptStatus(appt.id, 'completed')}
                            className="bg-emerald-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                          >
                            Complete
                          </button>
                        )}
                        {appt.status !== 'cancelled' && (
                          <button
                            onClick={() => handleUpdateApptStatus(appt.id, 'cancelled')}
                            className="bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BOOKINGS MANAGEMENT */}
      {adminTab === 'bookings' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
          <h2 className="text-xl font-serif font-bold text-slate-900">Manage All Grooming Appointments</h2>
          <p className="text-xs text-slate-500">Edit, reschedule, or change status for any customer appointment.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold">
                <tr>
                  <th className="p-3">Ref ID</th>
                  <th className="p-3">Pet</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Stylist</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Preferences</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.appointments.map((a) => (
                  <tr key={a.id} className="border-b">
                    <td className="p-3 font-mono font-bold">#{a.booking_number}</td>
                    <td className="p-3 font-bold">{a.pet_name} ({a.breed})</td>
                    <td className="p-3">{a.service_name}</td>
                    <td className="p-3">{a.groomer_name}</td>
                    <td className="p-3">{a.date}</td>
                    <td className="p-3">{a.time_slot}</td>
                    <td className="p-3 text-[10px]">
                      Face: {a.grooming_preferences?.face_style || 'Teddy Bear'}, Hair: {a.grooming_preferences?.hair_length || 'Medium'}
                    </td>
                    <td className="p-3 space-x-1">
                      <button
                        onClick={() => handleUpdateApptStatus(a.id, 'completed')}
                        className="bg-emerald-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => handleUpdateApptStatus(a.id, 'cancelled')}
                        className="bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SERVICES MANAGEMENT (CRUD - Requirement #19) */}
      {adminTab === 'services' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-slate-900">Service Management Menu</h2>
            <button
              onClick={() => setShowServiceModal(true)}
              className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create New Service</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.services.map((srv) => (
              <div key={srv.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{srv.name}</h4>
                  <p className="text-xs text-slate-500">₹{srv.starting_price} • {srv.duration_minutes} Mins</p>
                </div>
                <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded">Active</span>
              </div>
            ))}
          </div>

          {/* Create Service Modal */}
          {showServiceModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4">
                <h3 className="font-bold text-lg text-slate-900">Add New Grooming Service</h3>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Service Name</label>
                  <input
                    type="text"
                    placeholder="e.g. TEAR STAIN TREAT & EYE TRIM"
                    value={newSrvName}
                    onChange={(e) => setNewSrvName(e.target.value)}
                    className="w-full p-2 border rounded-xl text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Price (₹)</label>
                    <input
                      type="number"
                      value={newSrvPrice}
                      onChange={(e) => setNewSrvPrice(Number(e.target.value))}
                      className="w-full p-2 border rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Duration (Mins)</label>
                    <input
                      type="number"
                      value={newSrvDuration}
                      onChange={(e) => setNewSrvDuration(Number(e.target.value))}
                      className="w-full p-2 border rounded-xl text-xs"
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setShowServiceModal(false)}
                    className="flex-1 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveService}
                    className="flex-1 py-2 bg-brand-500 text-white rounded-xl text-xs font-bold"
                  >
                    Save Service
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: BREED MANAGEMENT (Requirement #20) */}
      {adminTab === 'breeds' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-slate-900">Manage Supported Small Breeds</h2>
            <button
              onClick={() => setShowBreedModal(true)}
              className="bg-brand-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Supported Breed</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {data.breeds.map((b) => (
              <div key={b.id} className="bg-white p-3 rounded-2xl border border-slate-200 text-center space-y-1">
                <img src={b.image} alt={b.name} className="w-14 h-14 rounded-full mx-auto object-cover" />
                <h4 className="font-bold text-slate-900 text-xs">{b.name}</h4>
                <span className="text-[10px] text-emerald-600 font-bold block">✓ Supported</span>
              </div>
            ))}
          </div>

          {/* Create Breed Modal */}
          {showBreedModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4">
                <h3 className="font-bold text-lg text-slate-900">Add New Supported Small Breed</h3>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Breed Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Havapoo"
                    value={newBreedName}
                    onChange={(e) => setNewBreedName(e.target.value)}
                    className="w-full p-2 border rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Coat Care Notes</label>
                  <textarea
                    placeholder="e.g. Soft wavy coat requiring gentle detangling..."
                    value={newBreedDesc}
                    onChange={(e) => setNewBreedDesc(e.target.value)}
                    className="w-full p-2 border rounded-xl text-xs"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setShowBreedModal(false)}
                    className="flex-1 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveBreed}
                    className="flex-1 py-2 bg-brand-500 text-white rounded-xl text-xs font-bold"
                  >
                    Save Breed
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: GROOMERS & STAFF (Requirement #23) */}
      {adminTab === 'groomers' && (
        <div className="space-y-6">
          <h2 className="text-xl font-serif font-bold text-slate-900">Master Groomers & Stylists</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {data.groomers.map((grm) => (
              <div key={grm.id} className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3">
                <img src={grm.photo} alt={grm.name} className="w-16 h-16 rounded-full object-cover border-2 border-brand-200" />
                <h3 className="font-bold text-slate-900 text-base">{grm.name}</h3>
                <p className="text-xs text-brand-700 font-semibold">{grm.title}</p>
                <p className="text-xs text-slate-600">{grm.bio}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: COUPONS (Requirement #24) */}
      {adminTab === 'coupons' && (
        <div className="space-y-6">
          <h2 className="text-xl font-serif font-bold text-slate-900">Active Coupons & Offer Codes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.coupons.map((cpn) => (
              <div key={cpn.id} className="bg-white p-5 rounded-2xl border-2 border-dashed border-brand-300 space-y-2">
                <span className="text-lg font-mono font-bold text-brand-900 bg-brand-100 px-3 py-1 rounded inline-block">
                  {cpn.code}
                </span>
                <p className="text-xs text-slate-600 font-medium">
                  Discount: {cpn.discount_type === 'percent' ? `${cpn.discount_value}% Off` : `₹${cpn.discount_value} Off`}
                </p>
                <p className="text-[10px] text-slate-400">Min Order: ₹{cpn.min_booking} • Uses: {cpn.current_uses}/{cpn.max_uses}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: WAITLIST (Requirement #27) */}
      {adminTab === 'waitlist' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
          <h2 className="text-xl font-serif font-bold text-slate-900">Waitlist Requests</h2>
          {data.waitlist.length === 0 ? (
            <p className="text-xs text-slate-500">No customers currently on waitlist.</p>
          ) : (
            <div className="space-y-3 text-xs">
              {data.waitlist.map((w) => (
                <div key={w.id} className="p-4 bg-cream-100 rounded-2xl flex items-center justify-between border">
                  <div>
                    <h4 className="font-bold text-slate-900">{w.customer_name} ({w.customer_phone})</h4>
                    <p className="text-slate-600">Pet: {w.pet_name} ({w.breed}) • Date requested: {w.preferred_date} @ {w.preferred_time}</p>
                  </div>
                  <button className="px-3 py-1.5 bg-brand-500 text-white font-bold rounded-xl text-xs">
                    Notify & Book
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 8: SETTINGS (Requirement #36) */}
      {adminTab === 'settings' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6 max-w-2xl">
          <h2 className="text-xl font-serif font-bold text-slate-900">System & Salon Settings</h2>
          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Business Name</label>
              <input type="text" defaultValue={data.settings.business_name} className="w-full p-2.5 border rounded-xl" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Salon Location Address</label>
              <input type="text" defaultValue={data.settings.address} className="w-full p-2.5 border rounded-xl" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Cancellation Policy Text</label>
              <textarea rows={3} defaultValue={data.settings.cancellation_policy} className="w-full p-2.5 border rounded-xl" />
            </div>
            <button className="bg-brand-900 text-white font-bold px-6 py-2.5 rounded-xl">Save Settings</button>
          </div>
        </div>
      )}

    </div>
  );
}
