import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

export const validateRequest = (schemas: { body?: Joi.ObjectSchema; params?: Joi.ObjectSchema; query?: Joi.ObjectSchema }) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parts = ['body', 'params', 'query'] as const;
    for (const part of parts) {
      const schema = schemas[part];
      if (schema) {
        const { error } = schema.validate(req[part]);
        if (error) {
          const message = `Validation error: ${error.details[0].message}`;
          return res.status(400).json({ message });
        }
      }
    }
    next();
  };
};