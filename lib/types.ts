export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';
export type IssueCategory = 'hardware' | 'software' | 'network' | 'account' | 'other';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  priority: TicketPriority;
  status: TicketStatus;
  location: string;
  submittedBy: string;
  submittedAt: Date;
  assignedTo?: string;
  notes: Note[];
  attachments?: string[];
}

export interface Note {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
}

export interface AIAnalysis {
  suggestedCategory: IssueCategory;
  suggestedPriority: TicketPriority;
  reasoning: string;
}

export interface KBArticle {
  id: string;
  title: string;
  category: IssueCategory;
  content: string;
  tags: string[];
}
