import { NextResponse } from 'next/server';
import { getDbData, saveDbData, Appointment, Pet } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = getDbData();

    if (body.action === 'create') {
      const {
        user_id = 'usr_cust_1',
        customer_name,
        customer_phone,
        customer_email,
        pet_id,
        pet_name,
        breed,
        service_id,
        service_name,
        groomer_id,
        groomer_name,
        date,
        time_slot,
        duration_minutes = 120,
        price,
        discount_amount = 0,
        final_price,
        payment_status = 'salon',
        payment_method = 'Pay at Salon',
        grooming_preferences,
        notes = ''
      } = body;

      // Double-booking check
      const conflict = db.appointments.find(
        (a) =>
          a.date === date &&
          a.time_slot === time_slot &&
          a.groomer_id === groomer_id &&
          a.status !== 'cancelled'
      );

      if (conflict) {
        return NextResponse.json(
          { error: 'This time slot was just taken. Please select another available slot.' },
          { status: 409 }
        );
      }

      // Generate unique booking number
      const randomDigits = Math.floor(100000 + Math.random() * 900000);
      const booking_number = `SG${randomDigits}`;

      const newAppt: Appointment = {
        id: `apt_${Date.now()}`,
        booking_number,
        user_id,
        customer_name: customer_name || 'Ananya Sharma',
        customer_phone: customer_phone || '+91 98765 43210',
        customer_email: customer_email || 'user@example.com',
        pet_id,
        pet_name,
        breed,
        service_id,
        service_name,
        groomer_id: groomer_id || 'grm_sarah',
        groomer_name: groomer_name || 'Sarah Jenkins',
        date,
        time_slot,
        duration_minutes,
        price,
        discount_amount,
        final_price,
        payment_status,
        payment_method,
        status: 'confirmed',
        grooming_preferences: grooming_preferences || {
          hair_length: 'Medium',
          face_style: 'Teddy Bear',
          tail_style: 'Full',
          feet_style: 'Rounded',
          special_notes: ''
        },
        notes,
        created_at: new Date().toISOString().split('T')[0]
      };

      db.appointments.unshift(newAppt);

      // Update pet profile recommended grooming date (+30 days)
      const targetPet = db.pets.find((p) => p.id === pet_id || p.name.toLowerCase() === pet_name.toLowerCase());
      if (targetPet) {
        targetPet.last_grooming = date;
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 30);
        targetPet.next_recommended = nextDate.toISOString().split('T')[0];
        
        // Save grooming preferences to pet profile for future appointments
        if (grooming_preferences) {
          targetPet.hair_length = grooming_preferences.hair_length || targetPet.hair_length;
          targetPet.face_style = grooming_preferences.face_style || targetPet.face_style;
          targetPet.tail_style = grooming_preferences.tail_style || targetPet.tail_style;
          targetPet.feet_style = grooming_preferences.feet_style || targetPet.feet_style;
        }
      }

      // Award loyalty paw points (1 point per ₹100 spent)
      const earnedPoints = Math.floor(final_price / 100);
      if (!db.loyalty[user_id]) {
        db.loyalty[user_id] = { user_id, points: 0, history: [] };
      }
      db.loyalty[user_id].points += earnedPoints;
      db.loyalty[user_id].history.unshift({
        date: new Date().toISOString().split('T')[0],
        action: `Earned from Booking #${booking_number}`,
        points: earnedPoints
      });

      // Add Notification
      db.notifications.unshift({
        id: `notif_${Date.now()}`,
        user_id,
        title: 'Booking Confirmed! 🐾',
        message: `${pet_name}’s grooming appointment (#${booking_number}) on ${date} at ${time_slot} is confirmed.`,
        date: new Date().toLocaleString(),
        is_read: false
      });

      saveDbData(db);

      return NextResponse.json({
        success: true,
        booking: newAppt,
        message: 'Booking created successfully!'
      });
    }

    if (body.action === 'cancel') {
      const { appointment_id } = body;
      const appt = db.appointments.find((a) => a.id === appointment_id);
      if (!appt) {
        return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
      }
      appt.status = 'cancelled';
      saveDbData(db);
      return NextResponse.json({ success: true, message: 'Appointment cancelled' });
    }

    if (body.action === 'reschedule') {
      const { appointment_id, new_date, new_time } = body;
      const appt = db.appointments.find((a) => a.id === appointment_id);
      if (!appt) {
        return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
      }
      appt.date = new_date;
      appt.time_slot = new_time;
      saveDbData(db);
      return NextResponse.json({ success: true, message: 'Appointment rescheduled' });
    }

    if (body.action === 'complete') {
      const { appointment_id, groomer_notes } = body;
      const appt = db.appointments.find((a) => a.id === appointment_id);
      if (!appt) {
        return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
      }
      appt.status = 'completed';
      appt.payment_status = 'paid';

      // Add to grooming history
      db.grooming_history.unshift({
        id: `gh_${Date.now()}`,
        pet_id: appt.pet_id,
        pet_name: appt.pet_name,
        appointment_id: appt.id,
        date: appt.date,
        service_name: appt.service_name,
        price: appt.final_price,
        groomer_name: appt.groomer_name,
        groomer_notes: groomer_notes || 'Completed with great care. Pet was calm and happy.'
      });

      saveDbData(db);
      return NextResponse.json({ success: true, message: 'Appointment completed' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    console.error('Booking API Error:', err);
    return NextResponse.json({ error: 'Server error processing booking' }, { status: 500 });
  }
}
