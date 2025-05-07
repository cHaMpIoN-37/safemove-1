import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

async function openDB() {
  const db = await open({
    filename: path.resolve('./students.db'),
    driver: sqlite3.Database,
  });
  return db;
}

export async function GET(request: NextRequest) {
  try {
    const db = await openDB();

    // Count students inside hostel
    const studentsInRow = await db.get(
      "SELECT COUNT(*) as count FROM students WHERE status = 'inside hostel'"
    );
    const studentsIn = studentsInRow ? studentsInRow.count : 0;

    // Count students out of hostel
    const studentsOutRow = await db.get(
      "SELECT COUNT(*) as count FROM students WHERE status != 'inside hostel'"
    );
    const studentsOut = studentsOutRow ? studentsOutRow.count : 0;

    // Total trips completed - no trips table, so return 0 for now
    const totalTrips = 0;

    // Emergency number - no emergency data, so return 0 for now
    const emergencyNumber = 0;

    await db.close();

    return NextResponse.json({
      studentsIn,
      studentsOut,
      totalTrips,
      emergencyNumber,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
