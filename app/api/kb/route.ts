import { NextRequest, NextResponse } from 'next/server';
import { kbArticles } from '@/lib/data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  
  let filtered = kbArticles;
  
  if (category) {
    filtered = filtered.filter(a => a.category === category);
  }
  
  if (search) {
    const query = search.toLowerCase();
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(query) ||
      a.content.toLowerCase().includes(query) ||
      a.tags.some(t => t.toLowerCase().includes(query))
    );
  }
  
  return NextResponse.json(filtered);
}
