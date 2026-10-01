import { NextResponse } from 'next/server';
import { getAvailableSlotsForDate } from '@/lib/booking-engine';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  const durationStr = searchParams.get('duration');
  const groomerId = searchParams.get('groomerId') || 'any';

  if (!date) {
    return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 });
  }

  const duration = durationStr ? parseInt(durationStr, 10) : 120;
  const slots = getAvailableSlotsForDate(date, duration, groomerId);

  return NextResponse.json({ date, slots });
}
