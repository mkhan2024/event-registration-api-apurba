export interface Event {
  id: string;
  name: string;
  date: Date;
  capacity: number;
  registrationCount: number;
  status: 'active' | 'cancelled' | 'completed';
  category: 'conference' | 'workshop' | 'meetup' | 'seminar' | 'general';
  createdAt: Date;
  updatedAt: Date;
}