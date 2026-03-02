import Link from 'next/link';
import { Ticket, LayoutDashboard, Users, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">EduDesk</h1>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">IT Support Ticketing System</h2>
          <p className="text-lg text-gray-600">Streamline your school's IT support workflow</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/submit" className="group">
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <Ticket className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">Submit Ticket</h3>
              <p className="text-gray-600">Create a new IT support request</p>
            </div>
          </Link>
          
          <Link href="/dashboard" className="group">
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <LayoutDashboard className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">My Tickets</h3>
              <p className="text-gray-600">View your submitted tickets</p>
            </div>
          </Link>
          
          <Link href="/kb" className="group">
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <BookOpen className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">Knowledge Base</h3>
              <p className="text-gray-600">Self-service help articles</p>
            </div>
          </Link>
          
          <Link href="/staff" className="group">
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <Users className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">Staff Portal</h3>
              <p className="text-gray-600">Manage and assign tickets</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
