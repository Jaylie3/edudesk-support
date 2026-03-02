'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch('/api/tickets').then(r => r.json()).then(setTickets);
  }, []);

  const statusColors = {
    open: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    resolved: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Tickets</h1>
        
        <div className="space-y-4">
          {tickets.map((ticket: any) => (
            <div key={ticket.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[ticket.status as keyof typeof statusColors]}`}>
                  {ticket.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{ticket.description}</p>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span className="capitalize">{ticket.category}</span>
                <span className="capitalize">{ticket.priority} priority</span>
                <span>{ticket.location}</span>
              </div>
            </div>
          ))}
          {tickets.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No tickets submitted yet
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
