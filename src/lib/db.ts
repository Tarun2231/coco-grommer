import fs from 'fs';
import path from 'path';

// Define DB Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'groomer' | 'admin';
  avatar?: string;
  created_at: string;
}

export interface Pet {
  id: string;
  user_id: string;
  name: string;
  breed: string;
  age: string;
  gender: 'Male' | 'Female';
  weight: string;
  dob?: string;
  coat_type: string;
  grooming_frequency: string;
  previous_experience: string;
  temperament: string;
  allergies: string;
  sensitivities: string;
  special_instructions: string;
  hair_length: 'Very Short' | 'Short' | 'Medium' | 'Long';
  face_style: 'Teddy Bear' | 'Round Face' | 'Breed Standard' | 'Customer Preference';
  tail_style: 'Full' | 'Trimmed';
  feet_style: 'Rounded' | 'Natural' | 'Trimmed';
  photo_url?: string;
  last_grooming?: string;
  next_recommended?: string;
}

export interface Breed {
  id: string;
  name: string;
  image: string;
  description: string;
  small_breed_supported: boolean;
  recommended_services: string[];
  average_duration: number; // mins
  popular: boolean;
  active: boolean;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  starting_price: number; // in INR ₹
  duration_minutes: number;
  buffer_minutes: number;
  what_included: string[];
  suitable_breeds: string[];
  image: string;
  active: boolean;
  badge?: string;
}

export interface Groomer {
  id: string;
  name: string;
  title: string;
  photo: string;
  experience_years: number;
  specialties: string[];
  supported_breeds: string[];
  bio: string;
  rating: number;
  active: boolean;
}

export interface Appointment {
  id: string;
  booking_number: string;
  user_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  pet_id: string;
  pet_name: string;
  breed: string;
  service_id: string;
  service_name: string;
  groomer_id: string;
  groomer_name: string;
  date: string; // YYYY-MM-DD
  time_slot: string; // HH:MM AM/PM
  duration_minutes: number;
  price: number;
  discount_amount?: number;
  final_price: number;
  payment_status: 'pending' | 'paid' | 'deposit' | 'salon';
  payment_method: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  grooming_preferences: {
    hair_length: string;
    face_style: string;
    tail_style: string;
    feet_style: string;
    special_notes?: string;
  };
  notes?: string;
  created_at: string;
}

export interface GroomingHistoryRecord {
  id: string;
  pet_id: string;
  pet_name: string;
  appointment_id: string;
  date: string;
  service_name: string;
  price: number;
  groomer_name: string;
  groomer_notes: string;
}

export interface Review {
  id: string;
  user_name: string;
  pet_name: string;
  breed: string;
  rating: number;
  comment: string;
  service_name: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
  photo_url?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'percent' | 'fixed';
  discount_value: number;
  min_booking: number;
  expiry: string;
  max_uses: number;
  current_uses: number;
  active: boolean;
}

export interface LoyaltyAccount {
  user_id: string;
  points: number;
  history: { date: string; action: string; points: number }[];
}

export interface GroomingPackage {
  id: string;
  name: string;
  badge?: string;
  price: number;
  original_price: number;
  duration_months: number;
  sessions_count: number;
  features: string[];
  active: boolean;
}

export interface WaitlistEntry {
  id: string;
  user_id?: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  pet_name: string;
  breed: string;
  preferred_date: string;
  preferred_time: string;
  service_name: string;
  notes?: string;
  created_at: string;
  status: 'pending' | 'notified' | 'fulfilled';
}

export interface SystemSettings {
  business_name: string;
  tagline: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  opening_hours: string;
  buffer_time_minutes: number;
  max_appointments_per_day: number;
  cancellation_policy: string;
  tax_percent: number;
  payment_currency: string;
  razorpay_key: string;
  notifications_enabled: {
    email: boolean;
    whatsapp: boolean;
    sms: boolean;
  };
}

export interface SchemaData {
  users: User[];
  pets: Pet[];
  breeds: Breed[];
  services: Service[];
  groomers: Groomer[];
  appointments: Appointment[];
  grooming_history: GroomingHistoryRecord[];
  reviews: Review[];
  coupons: Coupon[];
  loyalty: Record<string, LoyaltyAccount>;
  packages: GroomingPackage[];
  waitlist: WaitlistEntry[];
  settings: SystemSettings;
  notifications: { id: string; user_id: string; title: string; message: string; date: string; is_read: boolean }[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'petite_paws_db.json');

const INITIAL_DATA: SchemaData = {
  users: [
    {
      id: 'usr_cust_1',
      name: 'Ananya Sharma',
      email: 'user@example.com',
      phone: '+91 98765 43210',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      created_at: '2026-01-15'
    },
    {
      id: 'usr_groomer_1',
      name: 'Sarah Jenkins',
      email: 'groomer@example.com',
      phone: '+91 98765 11111',
      role: 'groomer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      created_at: '2026-01-01'
    },
    {
      id: 'usr_admin_1',
      name: 'Petite Admin',
      email: 'admin@example.com',
      phone: '+91 98765 00000',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      created_at: '2026-01-01'
    }
  ],
  pets: [
    {
      id: 'pet_bella',
      user_id: 'usr_cust_1',
      name: 'Bella',
      breed: 'Shih Tzu',
      age: '2 Years',
      gender: 'Female',
      weight: '4.8 kg',
      dob: '2024-04-12',
      coat_type: 'Double Coat (Silky Hair)',
      grooming_frequency: 'Every 4 Weeks',
      previous_experience: 'Regular Grooming',
      temperament: 'Calm & Friendly',
      allergies: 'None',
      sensitivities: 'Sensitive around ears',
      special_instructions: 'Keep face rounded (teddy bear style) and do not cut too short on the ears or legs.',
      hair_length: 'Medium',
      face_style: 'Teddy Bear',
      tail_style: 'Full',
      feet_style: 'Rounded',
      photo_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
      last_grooming: '2026-09-10',
      next_recommended: '2026-10-10'
    },
    {
      id: 'pet_milo',
      user_id: 'usr_cust_1',
      name: 'Milo',
      breed: 'Toy Poodle',
      age: '8 Months',
      gender: 'Male',
      weight: '2.5 kg',
      dob: '2026-01-20',
      coat_type: 'Curly',
      grooming_frequency: 'Every 6 Weeks',
      previous_experience: 'Puppy Intro Groom Completed',
      temperament: 'Playful & Curious',
      allergies: 'None',
      sensitivities: 'Slightly timid around loud dryer sounds',
      special_instructions: 'Use low-noise dryer and give gentle puppy treats.',
      hair_length: 'Short',
      face_style: 'Round Face',
      tail_style: 'Trimmed',
      feet_style: 'Natural',
      photo_url: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=600&q=80',
      last_grooming: '2026-08-20',
      next_recommended: '2026-10-05'
    }
  ],
  breeds: [
    {
      id: 'brd_shihtzu',
      name: 'Shih Tzu',
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=500&q=80',
      description: 'Require gentle coat detangling, teddy-bear face scissoring, and eye area sanitizing.',
      small_breed_supported: true,
      recommended_services: ['Full Grooming', 'Maintenance Groom'],
      average_duration: 120,
      popular: true,
      active: true
    },
    {
      id: 'brd_poodle',
      name: 'Toy Poodle',
      image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=500&q=80',
      description: 'Curly coats require expert blow-out fluffing, sanitary trims, and precision clip work.',
      small_breed_supported: true,
      recommended_services: ['Full Grooming', 'Bath & Blow Dry'],
      average_duration: 120,
      popular: true,
      active: true
    },
    {
      id: 'brd_maltese',
      name: 'Maltese',
      image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=500&q=80',
      description: 'Ultra-soft white coat needs tear stain treatment, silk conditioner, and gentle brushing.',
      small_breed_supported: true,
      recommended_services: ['Full Grooming', 'Bath & Blow Dry'],
      average_duration: 90,
      popular: true,
      active: true
    },
    {
      id: 'brd_pomeranian',
      name: 'Pomeranian',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=500&q=80',
      description: 'Double coat requires deep undercoat deshedding, rounded hand scissoring, and zero harsh shave-downs.',
      small_breed_supported: true,
      recommended_services: ['Full Grooming', 'De-shedding Treatment'],
      average_duration: 105,
      popular: true,
      active: true
    },
    {
      id: 'brd_yorkie',
      name: 'Yorkshire Terrier',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=500&q=80',
      description: 'Fine hair coat benefits from hygiene paw styling, ear plucking, and silk shine bath.',
      small_breed_supported: true,
      recommended_services: ['Full Grooming', 'Paw & Sanitary Trim'],
      average_duration: 90,
      popular: true,
      active: true
    },
    {
      id: 'brd_chihuahua',
      name: 'Chihuahua',
      image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=500&q=80',
      description: 'Sensitive small pups need warm soothing baths, nail smooth filing, and gentle towel wrap dry.',
      small_breed_supported: true,
      recommended_services: ['Bath & Blow Dry', 'Nail Care & Paw Trim'],
      average_duration: 45,
      popular: true,
      active: true
    },
    {
      id: 'brd_pug',
      name: 'Pug',
      image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=500&q=80',
      description: 'Facial wrinkle deep cleaning, deshedding brush out, and paw pad balm application.',
      small_breed_supported: true,
      recommended_services: ['Bath & Blow Dry', 'De-shedding Treatment'],
      average_duration: 60,
      popular: true,
      active: true
    },
    {
      id: 'brd_frenchie',
      name: 'French Bulldog',
      image: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=500&q=80',
      description: 'Hypoallergenic soothing spa bath, fold fold sanitization, and nail grinding.',
      small_breed_supported: true,
      recommended_services: ['Bath & Blow Dry', 'Nail Care & Paw Trim'],
      average_duration: 60,
      popular: true,
      active: true
    },
    {
      id: 'brd_lhasa',
      name: 'Lhasa Apso',
      image: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=500&q=80',
      description: 'Dense double coat styling, sanitary area trim, and face cap sculpting.',
      small_breed_supported: true,
      recommended_services: ['Full Grooming'],
      average_duration: 110,
      popular: false,
      active: true
    },
    {
      id: 'brd_dachshund',
      name: 'Dachshund (Miniature)',
      image: 'https://images.unsplash.com/photo-1612536057832-2ff7ead58194?auto=format&fit=crop&w=500&q=80',
      description: 'Gentle handling for back-conscious small breeds, ear check, and nail clipping.',
      small_breed_supported: true,
      recommended_services: ['Bath & Blow Dry', 'Nail Care & Paw Trim'],
      average_duration: 50,
      popular: false,
      active: true
    },
    {
      id: 'brd_cavalier',
      name: 'Cavalier King Charles',
      image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=500&q=80',
      description: 'Feathering hair conditioning, ear canal cleaning, and foot tuft trimming.',
      small_breed_supported: true,
      recommended_services: ['Full Grooming', 'Maintenance Groom'],
      average_duration: 95,
      popular: true,
      active: true
    },
    {
      id: 'brd_cockerspaniel',
      name: 'Cocker Spaniel (Small)',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=80',
      description: 'Ear health drying, hand scissoring of skirt and paws, and silk coat shine treatment.',
      small_breed_supported: true,
      recommended_services: ['Full Grooming'],
      average_duration: 120,
      popular: false,
      active: true
    }
  ],
  services: [
    {
      id: 'srv_full_groom',
      name: 'FULL GROOMING',
      slug: 'full-grooming',
      description: 'Our signature head-to-paw luxury styling package tailored specifically for small breeds.',
      starting_price: 1499,
      duration_minutes: 120,
      buffer_minutes: 15,
      what_included: [
        'Warm Hydrating Hydro-Bath with Organic Oatmeal Shampoo',
        'Deep Conditioning Coat Treatment',
        'Gentle Warm Air Blow Dry & Fluff Brush Out',
        'Custom Breed Haircut & Hand Scissoring',
        'Precision Paw Pad & Sanitary Hygiene Trim',
        'Nail Clipping & Edge Smoothing',
        'Ear Canal Inspection & Gentle Cleaning',
        'Eye Area Hygiene & Tear Stain Cleanse',
        'Complimentary Organic Paw Balm & Finishing Bandana'
      ],
      suitable_breeds: ['Shih Tzu', 'Toy Poodle', 'Maltese', 'Pomeranian', 'Yorkshire Terrier', 'Lhasa Apso', 'Cavalier King Charles'],
      image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80',
      active: true,
      badge: 'MOST POPULAR'
    },
    {
      id: 'srv_bath_blow',
      name: 'BATH & BLOW DRY',
      slug: 'bath-blow-dry',
      description: 'A refreshing bath and fluff dry for dogs that need a clean boost between haircut sessions.',
      starting_price: 799,
      duration_minutes: 60,
      buffer_minutes: 15,
      what_included: [
        'Premium Small-Breed Shampoo Bath',
        'Coat Conditioning Mask',
        'Gentle Warm Blow Dry',
        'Full Body Brush Out',
        'Nail Trim',
        'Ear Hygiene Check',
        'Sweet Lavender Fragrance Spritz'
      ],
      suitable_breeds: ['All Small Breeds & Puppies'],
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80',
      active: true
    },
    {
      id: 'srv_puppy_intro',
      name: 'PUPPY INTRODUCTION GROOM',
      slug: 'puppy-intro-groom',
      description: 'Specially designed gentle experience for puppies under 6 months for a stress-free lifetime grooming habit.',
      starting_price: 999,
      duration_minutes: 75,
      buffer_minutes: 15,
      what_included: [
        'Extra Gentle Hypoallergenic Puppy Bath',
        'Low-Noise Warm Air Drying',
        'Soft Bristle Coat Brushing',
        'Positive Clipper Noise & Vibration Desensitization',
        'Paw Handling & Soft Nail Tip Trimming',
        'Ear Cleaning & Checkup',
        'Puppy Play Break & Positive Reward Treats',
        'First Groom Graduation Certificate & Photo!'
      ],
      suitable_breeds: ['Puppies of any small breed (2 to 6 months old)'],
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
      active: true,
      badge: 'PUPPY FAVORITE'
    },
    {
      id: 'srv_maintenance',
      name: 'MAINTENANCE GROOM',
      slug: 'maintenance-groom',
      description: 'Ideal monthly touch-up to maintain face shape, hygiene areas, and prevent matting.',
      starting_price: 1199,
      duration_minutes: 90,
      buffer_minutes: 15,
      what_included: [
        'Hydro-Bath & Fluff Blow Dry',
        'Face & Teddy Bear Scissoring Touch Up',
        'Eye Area Trim for Clear Sight',
        'Sanitary Hygiene Area Trim',
        'Paw Pad Hair Clearance & Nail Filing',
        'Coat De-tangling Brush Out'
      ],
      suitable_breeds: ['Shih Tzu', 'Poodle', 'Maltese', 'Yorkie', 'Lhasa Apso'],
      image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=600&q=80',
      active: true
    },
    {
      id: 'srv_nail_care',
      name: 'NAIL CARE & PAW BALM',
      slug: 'nail-care',
      description: 'Quick nail trim, filing smooth edges, and organic paw pad massage.',
      starting_price: 399,
      duration_minutes: 30,
      buffer_minutes: 10,
      what_included: [
        'Nail Clipping to safe quick margin',
        'Precision Edge Smoothing/Filing',
        'Paw Pad Hair Clearance',
        'Nourishing Organic Coconut Paw Balm'
      ],
      suitable_breeds: ['All Small Breeds'],
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
      active: true
    },
    {
      id: 'srv_deshedding',
      name: 'FULL DE-SHEDDING TREATMENT',
      slug: 'full-deshedding',
      description: 'Special undercoat release treatment for shedding small breeds like Pomeranians and Pugs.',
      starting_price: 1299,
      duration_minutes: 90,
      buffer_minutes: 15,
      what_included: [
        'Undercoat Loosening Natural Spa Shampoo',
        'De-Shedding Conditioner Treatment',
        'High-Velocity Warm Air Undercoat Blow-Out',
        'Furminator & Rake Brush Out',
        'Nail & Ear Sanitation'
      ],
      suitable_breeds: ['Pomeranian', 'Pug', 'French Bulldog', 'Chihuahua', 'Dachshund'],
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80',
      active: true
    }
  ],
  groomers: [
    {
      id: 'grm_sarah',
      name: 'Sarah Jenkins',
      title: 'Senior Small-Breed Master Stylist',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      experience_years: 8,
      specialties: ['Teddy Bear Cuts', 'Toy Poodle Curly Coats', 'Anxious Dog Handling'],
      supported_breeds: ['Shih Tzu', 'Toy Poodle', 'Maltese', 'Yorkshire Terrier', 'Pomeranian'],
      bio: 'Certified master groomer with 8+ years experience specializing exclusively in small toy breeds and Asian Fusion styling.',
      rating: 4.98,
      active: true
    },
    {
      id: 'grm_michael',
      name: 'Michael Chang',
      title: 'Puppy Specialist & Gentle Care Lead',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      experience_years: 5,
      specialties: ['Puppy First-Groom Desensitization', 'Shih Tzu Scissoring', 'Gentle Drying'],
      supported_breeds: ['Puppies of all breeds', 'Shih Tzu', 'Pug', 'French Bulldog', 'Chihuahua'],
      bio: 'Patient and calm handler focused on positive reinforcement and building lifelong trust with timid puppies.',
      rating: 4.95,
      active: true
    },
    {
      id: 'grm_elena',
      name: 'Elena Rostova',
      title: 'Pomeranian & Double-Coat Specialist',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      experience_years: 6,
      specialties: ['Pomeranian Scissoring', 'De-shedding', 'Skin & Coat Spa Therapies'],
      supported_breeds: ['Pomeranian', 'Maltese', 'Lhasa Apso', 'Cavalier King Charles', 'Dachshund'],
      bio: 'Expert in preserving double coat integrity and restoring soft silk shine to high-maintenance small coats.',
      rating: 4.96,
      active: true
    }
  ],
  appointments: [
    {
      id: 'apt_1001',
      booking_number: 'SG102845',
      user_id: 'usr_cust_1',
      customer_name: 'Ananya Sharma',
      customer_phone: '+91 98765 43210',
      customer_email: 'user@example.com',
      pet_id: 'pet_bella',
      pet_name: 'Bella',
      breed: 'Shih Tzu',
      service_id: 'srv_full_groom',
      service_name: 'FULL GROOMING',
      groomer_id: 'grm_sarah',
      groomer_name: 'Sarah Jenkins',
      date: '2026-10-10',
      time_slot: '11:30 AM',
      duration_minutes: 120,
      price: 1499,
      discount_amount: 0,
      final_price: 1499,
      payment_status: 'paid',
      payment_method: 'UPI / Online',
      status: 'confirmed',
      grooming_preferences: {
        hair_length: 'Medium',
        face_style: 'Teddy Bear',
        tail_style: 'Full',
        feet_style: 'Rounded',
        special_notes: 'Keep face fluffy, gentle drying please!'
      },
      notes: 'Customer confirmed via online booking.',
      created_at: '2026-09-28'
    },
    {
      id: 'apt_1000',
      booking_number: 'SG102710',
      user_id: 'usr_cust_1',
      customer_name: 'Ananya Sharma',
      customer_phone: '+91 98765 43210',
      customer_email: 'user@example.com',
      pet_id: 'pet_bella',
      pet_name: 'Bella',
      breed: 'Shih Tzu',
      service_id: 'srv_full_groom',
      service_name: 'FULL GROOMING',
      groomer_id: 'grm_sarah',
      groomer_name: 'Sarah Jenkins',
      date: '2026-09-10',
      time_slot: '10:00 AM',
      duration_minutes: 120,
      price: 1499,
      discount_amount: 0,
      final_price: 1499,
      payment_status: 'paid',
      payment_method: 'Credit Card',
      status: 'completed',
      grooming_preferences: {
        hair_length: 'Medium',
        face_style: 'Teddy Bear',
        tail_style: 'Full',
        feet_style: 'Rounded'
      },
      notes: 'Completed cleanly. Coat was in good condition.',
      created_at: '2026-09-01'
    }
  ],
  grooming_history: [
    {
      id: 'gh_1',
      pet_id: 'pet_bella',
      pet_name: 'Bella',
      appointment_id: 'apt_1000',
      date: '2026-09-10',
      service_name: 'Full Grooming',
      price: 1499,
      groomer_name: 'Sarah Jenkins',
      groomer_notes: 'Bella was extremely calm. Customer prefers rounded teddy-bear face style. Applied hypoallergenic coconut paw balm.'
    },
    {
      id: 'gh_2',
      pet_id: 'pet_bella',
      pet_name: 'Bella',
      appointment_id: 'apt_990',
      date: '2026-08-12',
      service_name: 'Bath & Blow Dry',
      price: 799,
      groomer_name: 'Michael Chang',
      groomer_notes: 'Quick refresh session between haircuts. Coat clean and tangle-free.'
    },
    {
      id: 'gh_3',
      pet_id: 'pet_bella',
      pet_name: 'Bella',
      appointment_id: 'apt_980',
      date: '2026-06-15',
      service_name: 'Full Grooming',
      price: 1499,
      groomer_name: 'Sarah Jenkins',
      groomer_notes: 'First full scissor trim at Petite Paws! Excellent puppy temperament.'
    }
  ],
  reviews: [
    {
      id: 'rev_1',
      user_name: 'Priya Mukherjee',
      pet_name: 'Milo',
      breed: 'Toy Poodle',
      rating: 5,
      comment: 'The absolute best grooming salon for small dogs! Sarah knew exactly how to fluff Milo’s curly coat without making him nervous. He came home looking like a teddy bear!',
      service_name: 'Full Grooming',
      date: '2026-09-22',
      status: 'approved',
      photo_url: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'rev_2',
      user_name: 'Rahul Verma',
      pet_name: 'Coco',
      breed: 'Shih Tzu',
      rating: 5,
      comment: 'Loved the appointment-only system. No chaos, no large aggressive dogs barking around. Super hygienic and clean atmosphere. Highly recommend!',
      service_name: 'Maintenance Groom',
      date: '2026-09-18',
      status: 'approved',
      photo_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'rev_3',
      user_name: 'Sneha Kapoor',
      pet_name: 'Fluffy',
      breed: 'Pomeranian',
      rating: 5,
      comment: 'Elena did a marvelous hand-scissoring job on my Pomeranian’s double coat. She was so gentle with the blow dryer. 10/10 service!',
      service_name: 'Full De-shedding Treatment',
      date: '2026-09-15',
      status: 'approved',
      photo_url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=300&q=80'
    }
  ],
  coupons: [
    {
      id: 'cpn_welcome10',
      code: 'WELCOME10',
      discount_type: 'percent',
      discount_value: 10,
      min_booking: 500,
      expiry: '2026-12-31',
      max_uses: 100,
      current_uses: 14,
      active: true
    },
    {
      id: 'cpn_puppy20',
      code: 'PUPPY20',
      discount_type: 'percent',
      discount_value: 20,
      min_booking: 800,
      expiry: '2026-11-30',
      max_uses: 50,
      current_uses: 8,
      active: true
    },
    {
      id: 'cpn_firstgroom',
      code: 'FIRSTGROOM',
      discount_type: 'fixed',
      discount_value: 200,
      min_booking: 1000,
      expiry: '2026-12-31',
      max_uses: 200,
      current_uses: 45,
      active: true
    }
  ],
  loyalty: {
    'usr_cust_1': {
      user_id: 'usr_cust_1',
      points: 150,
      history: [
        { date: '2026-09-10', action: 'Earned from Booking #SG102710', points: 150 }
      ]
    }
  },
  packages: [
    {
      id: 'pkg_puppy',
      name: 'PUPPY CARE PLAN',
      badge: 'POPULAR FOR NEW PUPS',
      price: 3499,
      original_price: 3996,
      duration_months: 6,
      sessions_count: 4,
      features: [
        '4 Introductory or Full Grooming Sessions',
        '10% Discount on all additional add-ons',
        'Priority Slot Booking Guaranteed',
        'Complimentary Nail Trimming between sessions'
      ],
      active: true
    },
    {
      id: 'pkg_monthly',
      name: 'MONTHLY MAINTENANCE PLAN',
      badge: 'BEST VALUE',
      price: 1999,
      original_price: 2298,
      duration_months: 1,
      sessions_count: 2,
      features: [
        '1 Full Grooming + 1 Bath & Blow Dry per month',
        'Complimentary Organic Paw Balm application',
        'Free rescheduling up to 12 hours prior',
        '5% Cashback in Paw Points'
      ],
      active: true
    },
    {
      id: 'pkg_premium',
      name: 'PREMIUM PAW VIP PLAN',
      price: 4999,
      original_price: 5996,
      duration_months: 6,
      sessions_count: 4,
      features: [
        '4 Premium Full Groomings + De-shedding',
        'Unlimited Paw & Sanitary Trims between sessions',
        'Dedicated Master Groomer assignment',
        'Free Pickup & Drop-off Service (within 5km)'
      ],
      active: true
    }
  ],
  waitlist: [
    {
      id: 'wt_1',
      customer_name: 'Karan Mehta',
      customer_phone: '+91 99887 76655',
      customer_email: 'karan@example.com',
      pet_name: 'Teddy',
      breed: 'Maltese',
      preferred_date: '2026-10-10',
      preferred_time: '01:00 PM',
      service_name: 'Full Grooming',
      notes: 'Hoping for afternoon slot!',
      created_at: '2026-09-29',
      status: 'pending'
    }
  ],
  settings: {
    business_name: 'Petite Paws Grooming Studio',
    tagline: 'Specialized Grooming & Gentle Care for Puppies & Small Breeds',
    address: '74 Blooming Petale Avenue, Bandra West, Mumbai 400050',
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    email: 'hello@petitepawsgrooming.com',
    opening_hours: 'Mon - Sun: 9:00 AM - 7:00 PM',
    buffer_time_minutes: 15,
    max_appointments_per_day: 12,
    cancellation_policy: 'Free cancellation up to 24 hours before your appointment time. Cancellations within 24 hours or no-shows may forfeit the booking deposit.',
    tax_percent: 5,
    payment_currency: '₹',
    razorpay_key: 'rzp_test_petitepaws2026',
    notifications_enabled: {
      email: true,
      whatsapp: true,
      sms: true
    }
  },
  notifications: [
    {
      id: 'notif_1',
      user_id: 'usr_cust_1',
      title: 'Booking Confirmed! 🐾',
      message: 'Bella’s appointment for Saturday, Oct 10 at 11:30 AM is confirmed.',
      date: '2026-09-28 14:30',
      is_read: false
    }
  ]
};

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
  }
}

export function getDbData(): SchemaData {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw) as SchemaData;
  } catch (err) {
    console.error('Error reading DB data, resetting to initial standard dataset:', err);
    saveDbData(INITIAL_DATA);
    return INITIAL_DATA;
  }
}

export function saveDbData(data: SchemaData): void {
  ensureDataFile();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}
