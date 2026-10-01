import { getDbData, Appointment, Groomer } from './db';

export interface TimeSlot {
  time: string; // e.g. "10:00 AM"
  available: boolean;
  reason?: string;
  groomerId?: string;
  groomerName?: string;
}

// Helper to convert HH:MM AM/PM to minutes from midnight
export function timeToMinutes(timeStr: string): number {
  const [time, modifier] = timeStr.trim().split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  
  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  
  return hours * 60 + minutes;
}

// Helper to convert minutes from midnight to HH:MM AM/PM
export function minutesToTime(totalMins: number): string {
  let hours = Math.floor(totalMins / 60);
  const minutes = totalMins % 60;
  const modifier = hours >= 12 ? 'PM' : 'AM';
  
  if (hours > 12) hours -= 12;
  if (hours === 0) hours = 12;
  
  const minsPadded = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hours}:${minsPadded} ${modifier}`;
}

export function getAvailableSlotsForDate(
  dateStr: string, // YYYY-MM-DD
  serviceDurationMins: number = 120,
  groomerId: string = 'any'
): TimeSlot[] {
  const db = getDbData();
  const bufferMins = db.settings.buffer_time_minutes || 15;
  const totalServiceTimeNeeded = serviceDurationMins + bufferMins;

  // Operating bounds (9:00 AM to 7:00 PM -> 540 mins to 1140 mins)
  const dayStartMins = 9 * 60; // 9:00 AM (540)
  const dayEndMins = 19 * 60; // 7:00 PM (1140)
  const lunchStart = 13 * 60; // 1:00 PM Break
  const lunchEnd = 14 * 60; // 2:00 PM Break

  // Generate candidate time slots every 30 minutes
  const candidateSlots: string[] = [];
  for (let mins = dayStartMins; mins + serviceDurationMins <= dayEndMins; mins += 30) {
    // Skip if slot spans across lunch break or after closing
    if (mins < lunchEnd && (mins + serviceDurationMins) > lunchStart) {
      // Overlaps lunch break
      continue;
    }
    candidateSlots.push(minutesToTime(mins));
  }

  // Active appointments on this date (excluding cancelled)
  const existingAppts = db.appointments.filter(
    (a) => a.date === dateStr && a.status !== 'cancelled'
  );

  // Active groomers
  let availableGroomers = db.groomers.filter((g) => g.active);
  if (groomerId !== 'any') {
    availableGroomers = availableGroomers.filter((g) => g.id === groomerId);
  }

  if (availableGroomers.length === 0) {
    return candidateSlots.map((slot) => ({
      time: slot,
      available: false,
      reason: 'No groomer available on this date',
    }));
  }

  const resultSlots: TimeSlot[] = candidateSlots.map((slot) => {
    const slotStartMins = timeToMinutes(slot);
    const slotEndMins = slotStartMins + totalServiceTimeNeeded;

    // Check if AT LEAST ONE groomer is free during slotStartMins to slotEndMins
    let assignedGroomer: Groomer | null = null;

    for (const g of availableGroomers) {
      // Find existing appointments for this specific groomer
      const groomerAppts = existingAppts.filter((a) => a.groomer_id === g.id);

      const hasConflict = groomerAppts.some((appt) => {
        const apptStartMins = timeToMinutes(appt.time_slot);
        const apptEndMins = apptStartMins + appt.duration_minutes + bufferMins;

        // Check time collision
        return slotStartMins < apptEndMins && slotEndMins > apptStartMins;
      });

      if (!hasConflict) {
        assignedGroomer = g;
        break; // found an available groomer!
      }
    }

    if (assignedGroomer) {
      return {
        time: slot,
        available: true,
        groomerId: assignedGroomer.id,
        groomerName: assignedGroomer.name,
      };
    } else {
      return {
        time: slot,
        available: false,
        reason: 'Fully Booked',
      };
    }
  });

  return resultSlots;
}
