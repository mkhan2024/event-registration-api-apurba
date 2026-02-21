import { db } from '../../../../config/firebaseConfig';
import { Event } from '../models/eventModel';

class EventRepository {
  private collection = db.collection('events');

  async create(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> {
    const newEvent = {
      ...event,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const docRef = await this.collection.add(newEvent);
    return { id: docRef.id, ...newEvent } as Event;
  }

  async getAll(): Promise<Event[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
  }

  async getById(id: string): Promise<Event | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as Event;
  }

  async update(id: string, data: Partial<Event>): Promise<Event | null> {
    await this.collection.doc(id).update({ ...data, updatedAt: new Date() });
    return this.getById(id);
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}

export default EventRepository;