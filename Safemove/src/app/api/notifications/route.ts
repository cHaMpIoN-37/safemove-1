import { NextResponse } from 'next/server';

let notifications = [
  { id: 1, message: 'New trip request from student A', status: 'pending' },
  { id: 2, message: 'Emergency drill scheduled', status: 'approved' },
  { id: 3, message: 'Student B returned late', status: 'disapproved' },
];

export async function GET() {
  return NextResponse.json({ notifications });
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    const index = notifications.findIndex((n) => n.id === id);
    if (index !== -1) {
      notifications[index].status = status;
      return NextResponse.json({ success: true, notification: notifications[index] });
    } else {
      return NextResponse.json({ success: false, message: 'Notification not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 });
  }
}
