import { NextRequest, NextResponse } from 'next/server';
import { tickets } from '@/lib/data';
import { Ticket } from '@/lib/types';
import { ticketSchema } from '@/lib/validation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';

const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxRequests = 5;
  
  const requests = rateLimitMap.get(ip) || [];
  const recentRequests = requests.filter(time => now - time < windowMs);
  
  if (recentRequests.length >= maxRequests) return false;
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return true;
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');
  
  if (userId) {
    const userTickets = tickets.filter(t => t.submittedBy === userId);
    return NextResponse.json(userTickets);
  }
  
  const role = (session.user as any).role;
  if (role === 'admin') {
    return NextResponse.json(tickets);
  }
  
  const userTickets = tickets.filter(t => t.submittedBy === session.user?.email);
  return NextResponse.json(userTickets);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }
  
  const body = await request.json();
  
  const validation = ticketSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error.errors }, { status: 400 });
  }
  
  const newTicket: Ticket = {
    id: Date.now().toString(),
    title: validation.data.title,
    description: validation.data.description,
    category: validation.data.category,
    priority: validation.data.priority,
    status: 'open',
    location: validation.data.location,
    submittedBy: session.user?.email || validation.data.submittedBy,
    submittedAt: new Date(),
    notes: [],
  };
  
  tickets.push(newTicket);
  return NextResponse.json(newTicket, { status: 201 });
}
