import { NextRequest, NextResponse } from 'next/server';
import { analyzeTicket } from '@/lib/ai';

export async function POST(request: NextRequest) {
  const { title, description } = await request.json();
  
  if (!title || !description) {
    return NextResponse.json(
      { error: 'Title and description required' },
      { status: 400 }
    );
  }
  
  const analysis = await analyzeTicket(title, description);
  return NextResponse.json(analysis);
}
