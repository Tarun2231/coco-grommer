'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SchemaData, User, Pet, Service, Breed, Groomer, Appointment, Review, Coupon } from '@/lib/db';

interface AppContextType {
  data: SchemaData | null;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  refreshData: () => Promise<void>;
  loading: boolean;
  switchRole: (role: 'customer' | 'groomer' | 'admin') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SchemaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User>({
    id: 'usr_cust_1',
    name: 'Ananya Sharma',
    email: 'user@example.com',
    phone: '+91 98765 43210',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    created_at: '2026-01-15'
  });

  const refreshData = async () => {
    try {
      const res = await fetch('/api/data');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const switchRole = (role: 'customer' | 'groomer' | 'admin') => {
    if (!data) return;
    const foundUser = data.users.find((u) => u.role === role);
    if (foundUser) {
      setCurrentUser(foundUser);
    } else {
      setCurrentUser({
        id: `usr_${role}_demo`,
        name: role === 'admin' ? 'Petite Admin' : role === 'groomer' ? 'Sarah Jenkins' : 'Ananya Sharma',
        email: `${role}@example.com`,
        phone: '+91 98765 43210',
        role,
        created_at: '2026-01-01'
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        data,
        currentUser,
        setCurrentUser,
        refreshData,
        loading,
        switchRole
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
