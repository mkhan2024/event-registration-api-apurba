import EventRepository from '../repositories/eventRepository';
import { Event } from '../models/eventModel';

const repo = new EventRepository();

export const createEvent = async (data: Partial<Event>) => {
  return repo.create(data as Omit<Event, 'id' | 'createdAt' | 'updatedAt'>);
};

export const getEvents = async () => repo.getAll();

export const getEvent = async (id: string) => repo.getById(id);

export const updateEvent = async (id: string, data: Partial<Event>) => repo.update(id, data);

export const deleteEvent = async (id: string) => repo.delete(id);