import { Request, Response, NextFunction } from 'express';
import * as service from '../services/eventService';

type IdParams = { id: string };

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await service.createEvent(req.body);
    res.status(201).json({ message: 'Event created', data: event });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await service.getEvents();
    res.status(200).json({ message: 'Events retrieved', count: events.length, data: events });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req: Request<IdParams>, res: Response, next: NextFunction) => {
  try {
    const event = await service.getEvent(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event retrieved', data: event });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request<IdParams>, res: Response, next: NextFunction) => {
  try {
    const event = await service.updateEvent(req.params.id, req.body);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event updated', data: event });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request<IdParams>, res: Response, next: NextFunction) => {
  try {
    await service.deleteEvent(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};