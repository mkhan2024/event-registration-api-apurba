import EventRepository from '../repositories/eventRepository';
import { Event } from '../models/eventModel';

export const createEvent = async (data: Partial<Event>) => {
  const repo = new EventRepository();
  return repo.create(data as Omit<Event, 'id' | 'createdAt' | 'updatedAt'>);
};

export const getEvents = async () => {
  const repo = new EventRepository();
  return repo.getAll();
};

export const getEvent = async (id: string) => {
  const repo = new EventRepository();
  return repo.getById(id);
};

export const updateEvent = async (id: string, data: Partial<Event>) => {
  const repo = new EventRepository();
  return repo.update(id, data);
};

export const deleteEvent = async (id: string) => {
  const repo = new EventRepository();
  return repo.delete(id);
};