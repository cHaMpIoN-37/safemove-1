import { NextRequest, NextResponse } from 'next/server';

// Mock function to get top 5 emergency contacts from database
async function getTopEmergencyContacts() {
  // Replace with actual DB query
  return [
    { id: 1, name: 'Contact 1', phone: '+1234567890' },
    { id: 2, name: 'Contact 2', phone: '+1234567891' },
    { id: 3, name: 'Contact 3', phone: '+1234567892' },
    { id: 4, name: 'Contact 4', phone: '+1234567893' },
    { id: 5, name: 'Contact 5', phone: '+1234567894' },
  ];
}

// Mock function to send alert to a contact
async function sendAlertToContact(contact: { id: number; name: string; phone: string }, location: { latitude: number; longitude: number }) {
  // Replace with actual notification sending logic (SMS, push, etc.)
  console.log(`Sending alert to ${contact.name} at ${contact.phone} with location: ${location.latitude}, ${location.longitude}`);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { latitude, longitude } = body;

    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return NextResponse.json({ error: 'Invalid location data' }, { status: 400 });
    }

    const contacts = await getTopEmergencyContacts();

    await Promise.all(contacts.map(contact => sendAlertToContact(contact, { latitude, longitude })));

    return NextResponse.json({ success: true, message: 'Alerts sent to emergency contacts' });
  } catch (error) {
    console.error('Error sending emergency alerts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
