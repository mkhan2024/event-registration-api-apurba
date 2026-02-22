import * as Joi from 'joi';

export const createEventSchema = {
  body: Joi.object({
    name: Joi.string().min(3).required(),
    date: Joi.date().iso().greater('now').required(),
    capacity: Joi.number().integer().min(5).required(),
    registrationCount: Joi.number().integer().min(0).max(Joi.ref('capacity')).default(0),
    status: Joi.string().valid('active', 'cancelled', 'completed').default('active'),
    category: Joi.string().valid('conference', 'workshop', 'meetup', 'seminar', 'general').default('general'),
  }),
};

export const updateEventSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string().min(3),
    date: Joi.date().iso().greater('now'),
    capacity: Joi.number().integer().min(5),
    registrationCount: Joi.number().integer().min(0).when('capacity', { is: Joi.exist(), then: Joi.number().max(Joi.ref('capacity')) }),
    status: Joi.string().valid('active', 'cancelled', 'completed'),
    category: Joi.string().valid('conference', 'workshop', 'meetup', 'seminar', 'general'),
  }),
};

export const getEventSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

export const deleteEventSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};