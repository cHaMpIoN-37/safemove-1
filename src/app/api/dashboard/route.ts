import { NextResponse } from 'next/server';

export async function GET() {
  // Mock emergency number data
  const data = {
    emergencyNumber: 101
  };
  return NextResponse.json(data);
}
