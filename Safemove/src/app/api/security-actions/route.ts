import { NextResponse } from 'next/server';

export async function GET() {
  // Mock security actions data
  const data = {
    actions: [
      {
        id: 1,
        description: 'Checked fire extinguishers',
        takenBy: 'warden',
        timestamp: new Date().toISOString(),
      },
      {
        id: 2,
        description: 'Reported suspicious activity',
        takenBy: 'student',
        timestamp: new Date().toISOString(),
      },
    ],
  };
  return NextResponse.json(data);
}
