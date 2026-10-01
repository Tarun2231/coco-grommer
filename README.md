# Petite Paws — Premium Small-Breed Puppy & Dog Grooming Website 🐾

**Petite Paws** is a modern, mobile-first, full-stack web application designed exclusively for **small-breed dogs and puppies under 12kg** (Shih Tzu, Toy Poodle, Maltese, Pomeranian, Yorkie, Chihuahua, Pug, Dachshund, French Bulldog, etc.).

---

## 🌟 Key Features & Requirements Built

1. **Brand & Hero Section**:
   - Headline: *"Premium Grooming, Made for Small Breeds."*
   - Subheading: *"Specialized grooming and gentle care for puppies and small-breed dogs."*
   - Direct CTA buttons: **Book a Grooming Appointment** & **View Services**.
   - Trust indicators for small-breed specialists, stress-free environment, and appointment-based care.
   - Sticky mobile **Book Now** floating CTA bar.

2. **Small-Breed Only Positioning**:
   - *"Why Small-Breed Grooming?"* section explaining joint/trachea handling, coat care, low-noise gentle drying, nail care, and temperament.
   - Interactive supported breed cards (Shih Tzu, Maltese, Pomeranian, Yorkie, Toy Poodle, Chihuahua, Pug, Dachshund, Lhasa Apso, Frenchie, etc.).
   - Admin panel CRUD ability to add/remove/toggle supported breeds in real time.

3. **Services Page with Expandable "What's Included?"**:
   - Signature Full Grooming (₹1,499)
   - Bath & Blow Dry (₹799)
   - Puppy Introduction Groom (₹999)
   - Maintenance Groom (₹1,199)
   - Nail Care & Paw Balm (₹399)
   - Full De-shedding Treatment (₹1,299)
   - Expandable checklist of included treatments, suitable breeds, duration, starting price, and direct booking buttons.

4. **8-Step Smart Service Selection Booking Wizard**:
   - **Step 1**: Select Pet (Saved customer pets or `+ Add New Pet`).
   - **Step 2**: Select Breed (Shih Tzu, Toy Poodle, Pomeranian, etc.).
   - **Step 3**: Select Grooming Service & view price breakdown.
   - **Step 4**: Grooming Styling Preferences (Hair length: Very Short/Short/Medium/Long, Face style: Teddy Bear/Round Face/Breed Standard/Customer Preference, Tail: Full/Trimmed, Feet: Rounded/Natural/Trimmed, Special Notes).
   - **Step 5**: Master Groomer Selection (*Any Available Groomer* or specific stylist).
   - **Step 6**: Select Date & Real-Time Calculated Slot.
   - **Step 7**: Customer Contact Details & Coupon Code entry (`WELCOME10`, `PUPPY20`, `FIRSTGROOM`).
   - **Step 8**: Review & Online Payment selection (Razorpay, UPI, Credit Card, Pay at Salon) -> Booking Confirmation!

5. **Pet Profile & Special Feature: Pet Grooming Card**:
   - Complete pet profiles storing breed, age, gender, coat type, temperament, allergies, and styling preferences.
   - Beautiful **Pet Grooming Card** displaying Pet Photo, Name, Breed, Age, Last Grooming Date, Next Recommended Date, and instant **BOOK AGAIN** button.

6. **Availability & Real-Time Booking Engine**:
   - Calculates available slots dynamically based on salon opening hours (9 AM - 7 PM), lunch break, groomer shifts, existing appointments, buffer times (15 mins), and blocked dates.
   - Prevents double bookings and race conditions.

7. **Booking Confirmation**:
   - Generates unique reference ID (e.g. `#SG102845`).
   - Features **Add to Calendar (.ics download)**, **View Booking**, **Get Directions**, and **Print Receipt**.

8. **Customer Account Dashboard**:
   - Sections for My Pets, My Bookings, Grooming History with Groomer Notes, Paw Points Loyalty Tracker, Notifications, and Receipts.

9. **Admin Dashboard**:
   - Overview metrics: Today's Appointments, Revenue, New Customers, Total Pets.
   - Booking Management (Reschedule, Cancel, Complete, Assign Groomers).
   - Service CRUD & Breed CRUD.
   - Staff/Groomer Management.
   - Coupons & Promo Code Management.
   - Waitlist Management.
   - System & Salon Settings (Hours, Cancellation policy, Tax rate, API keys).

10. **Groomer Staff Portal**:
    - Stylists can view assigned appointments, view customer haircut preferences, add post-groom notes, and mark sessions complete.

11. **Before & After Interactive Gallery**:
    - Interactive before/after drag slider comparing grooming transformations for Shih Tzus, Poodles, and Pomeranians.

12. **Loyalty Program (Paw Points)**:
    - Every ₹100 spent = 1 Paw Point. Points redeemable at checkout.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Local Execution

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

---

## 🛠️ Environment Variables (.env.local)

Create a `.env.local` file in the root directory:

```env
# Salon Configuration
NEXT_PUBLIC_BUSINESS_NAME="Petite Paws Grooming Studio"
NEXT_PUBLIC_PHONE="+91 98765 43210"
NEXT_PUBLIC_WHATSAPP="+91 98765 43210"
NEXT_PUBLIC_EMAIL="hello@petitepawsgrooming.com"

# Payment Gateway Setup (Razorpay)
NEXT_PUBLIC_RAZORPAY_KEY="rzp_test_petitepaws2026"
RAZORPAY_KEY_SECRET="your_razorpay_secret_key"

# Database Persistence Path
DATA_DB_PATH="./data/petite_paws_db.json"
```

---

## 👥 Demo Quick Role Switcher

On the header bar, you can instantly toggle between 3 roles for immediate testing:
- **Customer View**: Access pet profiles, booking wizard, loyalty points, and upcoming bookings.
- **Groomer View**: Access assigned schedule, view pet haircut preferences, and enter stylist notes.
- **Admin View**: Access revenue metrics, CRUD services, CRUD breeds, manage waitlist, and update salon settings.

---

## 📄 License
Privately built for Petite Paws Grooming Studio.
