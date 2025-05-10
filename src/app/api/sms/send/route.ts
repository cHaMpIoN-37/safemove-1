import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !fromPhone) {
  console.error('Twilio environment variables are not set');
}

const client = twilio(accountSid, authToken);

export async function POST(request: NextRequest) {
  try {
    const { to, message } = await request.json();

    if (!to || !message) {
      return NextResponse.json({ error: 'Missing "to" or "message" in request body' }, { status: 400 });
    }

    if (!accountSid || !authToken || !fromPhone) {
      return NextResponse.json({ error: 'Twilio environment variables are not configured' }, { status: 500 });
    }

    const response = await client.messages.create({
      body: message,
      from: fromPhone,
      to: to,
    });

    return NextResponse.json({ success: true, sid: response.sid });
  } catch (error) {
    console.error('Error sending SMS:', error);
    return NextResponse.json({ error: 'Failed to send SMS' }, { status: 500 });
  }
}
