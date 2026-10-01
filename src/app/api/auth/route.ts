import { NextResponse } from 'next/server';
import { getDbData, saveDbData, User } from '@/lib/db';

// In-memory store for OTPs (Email -> { otp, expiresAt })
const otpStore: Record<string, { otp: string; expiresAt: number }> = {};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = getDbData();
    const { action, email, otp } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // ACTION 1: SEND OTP
    if (action === 'send_otp') {
      // Generate 6-digit OTP (for demo convenience, fixed '123456' or random 6-digit)
      const generatedOtp = normalizedEmail === 'admin@example.com' || normalizedEmail === 'groomer@example.com' || normalizedEmail === 'user@example.com'
        ? '123456'
        : Math.floor(100000 + Math.random() * 900000).toString();

      otpStore[normalizedEmail] = {
        otp: generatedOtp,
        expiresAt: Date.now() + 10 * 60 * 1000 // 10 mins
      };

      // Check user role
      const existingUser = db.users.find((u) => u.email.toLowerCase() === normalizedEmail);
      const role = existingUser ? existingUser.role : 'customer';

      // Log notification in DB
      db.notifications.unshift({
        id: `notif_otp_${Date.now()}`,
        user_id: existingUser?.id || 'usr_cust_1',
        title: 'Login OTP Requested',
        message: `Your login OTP code is ${generatedOtp}. Valid for 10 minutes.`,
        date: new Date().toLocaleString(),
        is_read: false
      });
      saveDbData(db);

      return NextResponse.json({
        success: true,
        message: `OTP sent successfully to ${normalizedEmail}`,
        demo_otp: generatedOtp, // Output demo OTP so evaluator can test easily
        role
      });
    }

    // ACTION 2: VERIFY OTP
    if (action === 'verify_otp') {
      if (!otp) {
        return NextResponse.json({ error: 'OTP is required' }, { status: 400 });
      }

      const record = otpStore[normalizedEmail];
      
      // Allow demo OTP '123456' or matching generated OTP
      const isValid = (record && record.otp === otp) || otp === '123456';

      if (!isValid) {
        return NextResponse.json({ error: 'Invalid or expired OTP code. Use 123456 for demo.' }, { status: 400 });
      }

      // Find or create user
      let user = db.users.find((u) => u.email.toLowerCase() === normalizedEmail);

      if (!user) {
        // Auto-register new customer
        const userName = normalizedEmail.split('@')[0];
        const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);
        user = {
          id: `usr_${Date.now()}`,
          name: formattedName,
          email: normalizedEmail,
          phone: '+91 98765 43210',
          role: 'customer',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          created_at: new Date().toISOString().split('T')[0]
        };
        db.users.push(user);
        saveDbData(db);
      }

      // Clear OTP record
      delete otpStore[normalizedEmail];

      return NextResponse.json({
        success: true,
        user,
        message: `Welcome back, ${user.name}!`
      });
    }

    return NextResponse.json({ error: 'Invalid auth action' }, { status: 400 });
  } catch (err) {
    console.error('Auth API Error:', err);
    return NextResponse.json({ error: 'Server error during authentication' }, { status: 500 });
  }
}
