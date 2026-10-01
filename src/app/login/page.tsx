'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Dog, Mail, KeyRound, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentUser, refreshData } = useApp();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [demoOtpHint, setDemoOtpHint] = useState('');

  // Step 1: Send OTP
  const handleSendOtp = async (e?: React.FormEvent, overrideEmail?: string) => {
    if (e) e.preventDefault();
    const targetEmail = overrideEmail || email;
    if (!targetEmail || !targetEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setMessage('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send_otp', email: targetEmail })
      });
      const data = await res.json();

      if (res.ok) {
        setEmail(targetEmail);
        setStep('otp');
        setMessage(`OTP sent to ${targetEmail}.`);
        setDemoOtpHint(data.demo_otp || '123456');
        setOtp(data.demo_otp || '123456'); // Pre-fill 123456 for instant demo convenience
      } else {
        setErrorMessage(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setErrorMessage('Network error sending OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP & Sign In
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setErrorMessage('Please enter the 6-digit OTP');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify_otp', email, otp })
      });
      const data = await res.json();

      if (res.ok && data.user) {
        setCurrentUser(data.user);
        await refreshData();

        // Redirect based on role
        if (data.user.role === 'admin') {
          router.push('/admin');
        } else if (data.user.role === 'groomer') {
          router.push('/groomer');
        } else {
          router.push('/account');
        }
      } else {
        setErrorMessage(data.error || 'Invalid OTP code');
      }
    } catch (err) {
      setErrorMessage('Network error verifying OTP.');
    } finally {
      setLoading(false);
    }
  };

  // Quick Demo Email Selector Handler
  const handleQuickDemoFill = (demoEmail: string) => {
    setEmail(demoEmail);
    handleSendOtp(undefined, demoEmail);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-soft-lg border border-brand-200 space-y-6">
        
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-brand-500 text-white mx-auto flex items-center justify-center shadow-md">
            <Dog className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Petite Paws Sign In</h1>
          <p className="text-xs text-slate-600">
            Unified Email + OTP Login for Admin, Groomer, and Pet Parents.
          </p>
        </div>

        {/* Quick Demo Fill Buttons for Testing */}
        <div className="bg-cream-100 p-3.5 rounded-2xl border border-brand-200 text-center space-y-2">
          <span className="text-[11px] font-bold text-brand-900 uppercase tracking-wider block flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Quick Demo Login Accounts:
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoFill('admin@example.com')}
              className="py-1.5 px-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl text-[11px] font-bold border border-emerald-300 transition-colors"
            >
              👑 Admin
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoFill('groomer@example.com')}
              className="py-1.5 px-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-[11px] font-bold border border-amber-300 transition-colors"
            >
              ✂️ Groomer
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoFill('user@example.com')}
              className="py-1.5 px-2 bg-brand-100 hover:bg-brand-200 text-brand-900 rounded-xl text-[11px] font-bold border border-brand-300 transition-colors"
            >
              🐾 Customer
            </button>
          </div>
        </div>

        {/* Step 1: Email Form */}
        {step === 'email' && (
          <form onSubmit={(e) => handleSendOtp(e)} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Enter Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="e.g. admin@example.com or user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-brand-500 font-medium"
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              {loading ? (
                <span>Sending One-Time Password...</span>
              ) : (
                <>
                  <span>SEND LOGIN OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Step 2: OTP Verification Form */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in duration-200">
            <div className="bg-brand-50 p-3 rounded-xl border border-brand-200 text-xs text-brand-900 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold block text-brand-700">Email: {email}</span>
                <span className="font-bold">Use Demo OTP Code: <code className="bg-white px-2 py-0.5 rounded font-mono text-emerald-700">{demoOtpHint}</code></span>
              </div>
              <button
                type="button"
                onClick={() => setStep('email')}
                className="text-[10px] text-slate-500 underline"
              >
                Change
              </button>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Enter 6-Digit One-Time Password (OTP)
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm font-mono font-bold tracking-widest text-center focus:outline-brand-500"
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              {loading ? (
                <span>Verifying OTP...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>VERIFY OTP & SIGN IN</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
