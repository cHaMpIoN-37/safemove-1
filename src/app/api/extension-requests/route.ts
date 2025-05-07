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

// Initialize extension_requests table if not exists
async function initDB() {
  const db = await openDB();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS extension_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      extend_minutes INTEGER NOT NULL,
      personal_message TEXT,
      status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await db.close();
}

export async function POST(request: NextRequest) {
  try {
    await initDB();
    const body = await request.json();
    const { studentId, extendMinutes, personalMessage } = body;

    if (!studentId || !extendMinutes) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await openDB();
    const result = await db.run(
      `INSERT INTO extension_requests (student_id, extend_minutes, personal_message, status) VALUES (?, ?, ?, 'pending')`,
      [studentId, extendMinutes, personalMessage || '']
    );
    await db.close();

    return NextResponse.json({ message: 'Extension request submitted', requestId: result.lastID });
  } catch (error) {
    console.error('Error handling extension request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await initDB();
    const db = await openDB();

    // For admin: fetch all pending extension requests
    const requests = await db.all(
      `SELECT er.id, er.student_id, s.name as student_name, er.extend_minutes, er.personal_message, er.status, er.created_at
       FROM extension_requests er
       JOIN students s ON er.student_id = s.id
       WHERE er.status = 'pending'
       ORDER BY er.created_at DESC`
    );

    await db.close();

    return NextResponse.json({ requests });
  } catch (error) {
    console.error('Error fetching extension requests:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH handler to approve or reject requests
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { requestId, action } = body; // action: 'approve' or 'reject'

    if (!requestId || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const db = await openDB();

    if (action === 'approve') {
      // Update the student's trip time (assuming a trips table or students table has time info)
      // For now, just update the request status to approved
      await db.run(`UPDATE extension_requests SET status = 'approved' WHERE id = ?`, [requestId]);
      // TODO: Implement actual trip time extension logic here
    } else if (action === 'reject') {
      await db.run(`UPDATE extension_requests SET status = 'rejected' WHERE id = ?`, [requestId]);
    }

    await db.close();

    return NextResponse.json({ message: `Request ${action}d successfully` });
  } catch (error) {
    console.error('Error updating extension request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
