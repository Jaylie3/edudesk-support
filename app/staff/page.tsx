'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function StaffPortal() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [staff, setStaff] = useState<Array<{id: string; name: string}>>([]);
  const [filter, setFilter] = useState('all');
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');

  useEffect(() => {
    loadTickets();
    const savedStaff = localStorage.getItem('staff');
    if (savedStaff) setStaff(JSON.parse(savedStaff));
  }, []);

  const loadTickets = async () => {
    const res = await fetch('/api/tickets');
    const data = await res.json();
    setTickets(data);
  };

  const addStaff = () => {
    if (!newStaffName.trim()) return;
    const newStaff = { id: Date.now().toString(), name: newStaffName };
    const updated = [...staff, newStaff];
    setStaff(updated);
    localStorage.setItem('staff', JSON.stringify(updated));
    setNewStaffName('');
    setShowAddStaff(false);
  };

  const assignTicket = async (ticketId: string, staffName: string) => {
    const res = await fetch(`/api/tickets/${ticketId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assignedTo: staffName }),
    });
    
    if (res.ok) {
      setTickets(tickets.map((t: any) => 
        t.id === ticketId ? { ...t, assignedTo: staffName } : t
      ));
    }
  };

  const updateStatus = async (ticketId: string, status: string) => {
    const res = await fetch(`/api/tickets/${ticketId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    
    if (res.ok) {
      setTickets(tickets.map((t: any) => 
        t.id === ticketId ? { ...t, status } : t
      ));
    }
  };

  const filteredTickets = filter === 'all' ? tickets : tickets.filter((t: any) => t.status === filter);

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Staff Portal</h1>
          <button
            onClick={() => setShowAddStaff(!showAddStaff)}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Staff
          </button>
        </div>

        {showAddStaff && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="font-semibold mb-4">Add Staff Member</h3>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Staff name"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
                value={newStaffName}
                onChange={(e) => setNewStaffName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addStaff()}
              />
              <button
                onClick={addStaff}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Add
              </button>
            </div>
          </div>
        )}
        
        <div className="mb-6 flex gap-2">
          {['all', 'open', 'in-progress', 'resolved'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-md capitalize ${filter === f ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {tickets.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No tickets submitted yet
          </div>
        )}

        <div className="space-y-4">
          {filteredTickets.map((ticket: any) => (
            <div key={ticket.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{ticket.title}</h3>
                  <p className="text-sm text-gray-600">Submitted by {ticket.submittedBy}</p>
                </div>
                <span className="capitalize px-3 py-1 bg-gray-100 rounded text-sm">{ticket.status}</span>
              </div>
              
              <p className="text-gray-700 mb-4">{ticket.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="capitalize">{ticket.category}</span>
                <span className="capitalize">{ticket.priority}</span>
                <span>{ticket.location}</span>
              </div>

              <div className="flex gap-3">
                <select
                  onChange={(e) => e.target.value && assignTicket(ticket.id, e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  value={ticket.assignedTo || ''}
                  disabled={staff.length === 0}
                >
                  <option value="">{staff.length === 0 ? 'Add staff first' : 'Assign to...'}</option>
                  {staff.map((s: any) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>

                <select
                  onChange={(e) => updateStatus(ticket.id, e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  value={ticket.status}
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              {ticket.assignedTo && (
                <p className="mt-3 text-sm text-gray-600">Assigned to: {ticket.assignedTo}</p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
