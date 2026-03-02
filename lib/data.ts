import { Ticket, KBArticle } from './types';

export const tickets: Ticket[] = [];

export const staffMembers = [
  { id: '1', name: 'John Smith', role: 'Senior Technician' },
  { id: '2', name: 'Sarah Johnson', role: 'IT Support Specialist' },
  { id: '3', name: 'Mike Chen', role: 'Network Administrator' },
];

export const kbArticles: KBArticle[] = [
  {
    id: '1',
    title: 'How to Reset Your Password',
    category: 'account',
    content: '1. Go to login page\n2. Click "Forgot Password"\n3. Enter your email\n4. Check email for reset link\n5. Create new password',
    tags: ['password', 'login', 'account'],
  },
  {
    id: '2',
    title: 'Printer Not Working - Quick Fix',
    category: 'hardware',
    content: '1. Check if printer is powered on\n2. Verify cable connections\n3. Check paper tray\n4. Restart printer\n5. Remove and re-add printer in settings',
    tags: ['printer', 'hardware', 'troubleshooting'],
  },
  {
    id: '3',
    title: 'Cannot Connect to WiFi',
    category: 'network',
    content: '1. Toggle WiFi off and on\n2. Forget network and reconnect\n3. Restart device\n4. Check if others can connect\n5. Contact IT if issue persists',
    tags: ['wifi', 'network', 'connection'],
  },
  {
    id: '4',
    title: 'Software Installation Guide',
    category: 'software',
    content: '1. Download software from approved source\n2. Run installer as administrator\n3. Follow installation wizard\n4. Restart computer if prompted\n5. Contact IT for license keys',
    tags: ['software', 'installation', 'setup'],
  },
];
