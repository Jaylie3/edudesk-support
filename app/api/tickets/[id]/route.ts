import { NextRequest, NextResponse } from 'next/server';
import { tickets } from '@/lib/data';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const role = (session.user as any).role;
  if (role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  
  const { id } = await params;
  const body = await request.json();
  const ticket = tickets.find(t => t.id === id);
  
  if (!ticket) {
    return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
  }
  
  Object.assign(ticket, body);
  return NextResponse.json(ticket);
}
