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

export async function GET(request: NextRequest, { params }: { params: { studentId: string } }) {
  try {
    const awaitedParams = await params;
    const studentId = parseInt(awaitedParams.studentId, 10);
    if (isNaN(studentId)) {
      return NextResponse.json({ error: 'Invalid student ID' }, { status: 400 });
    }

    const db = await openDB();
    const student = await db.get('SELECT * FROM students WHERE id = ?', studentId);
    await db.close();

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json({ student });
  } catch (error) {
    console.error('Error fetching student:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
