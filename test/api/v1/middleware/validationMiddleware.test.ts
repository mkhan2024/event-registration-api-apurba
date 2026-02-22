import { Request, Response, NextFunction } from 'express';
import { validateRequest } from '../../../../src/api/v1/middleware/validationMiddleware';
import * as Joi from 'joi';
import { createEventSchema } from '../../../../src/api/v1/validation/eventValidation';

describe('validateRequest Middleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = { body: {}, params: {}, query: {} };
    mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    mockNext = jest.fn();
  });

  it('should pass for valid body input', () => {
    const testSchemas = { body: Joi.object({ name: Joi.string().min(3).required(), date: Joi.date().iso().greater('now').required(), capacity: Joi.number().integer().min(5).required() }) };
    mockReq.body = { name: 'Test Event', date: new Date(Date.now() + 86400000).toISOString(), capacity: 10 };
    const middleware = validateRequest(testSchemas);
    middleware(mockReq as Request, mockRes as Response, mockNext);
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  it('should fail for invalid body input', () => {
    const testSchemas = { body: Joi.object({ name: Joi.string().min(3).required() }) };
    mockReq.body = { name: 'AB' };
    const middleware = validateRequest(testSchemas);
    middleware(mockReq as Request, mockRes as Response, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Validation error: "name" length must be at least 3 characters long' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should fail for missing name', () => {
    mockReq.body = { date: new Date(Date.now() + 86400000).toISOString(), capacity: 10 };
    const middleware = validateRequest(createEventSchema);
    middleware(mockReq as Request, mockRes as Response, mockNext);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Validation error: "name" is required' });
  });

  it('should fail for name too short', () => {
    mockReq.body = { name: 'AB', date: new Date(Date.now() + 86400000).toISOString(), capacity: 10 };
    const middleware = validateRequest(createEventSchema);
    middleware(mockReq as Request, mockRes as Response, mockNext);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Validation error: "name" length must be at least 3 characters long' });
  });

  it('should fail for capacity too small', () => {
    mockReq.body = { name: 'Test', date: new Date(Date.now() + 86400000).toISOString(), capacity: 4 };
    const middleware = validateRequest(createEventSchema);
    middleware(mockReq as Request, mockRes as Response, mockNext);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Validation error: "capacity" must be greater than or equal to 5' });
  });

  it('should fail for capacity not integer', () => {
    mockReq.body = { name: 'Test', date: new Date(Date.now() + 86400000).toISOString(), capacity: 50.5 };
    const middleware = validateRequest(createEventSchema);
    middleware(mockReq as Request, mockRes as Response, mockNext);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Validation error: "capacity" must be an integer' });
  });

  it('should fail for invalid status', () => {
    mockReq.body = { name: 'Test', date: new Date(Date.now() + 86400000).toISOString(), capacity: 10, status: 'pending' };
    const middleware = validateRequest(createEventSchema);
    middleware(mockReq as Request, mockRes as Response, mockNext);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Validation error: "status" must be one of [active, cancelled, completed]' });
  });

  it('should fail for invalid category', () => {
    mockReq.body = { name: 'Test', date: new Date(Date.now() + 86400000).toISOString(), capacity: 10, category: 'party' };
    const middleware = validateRequest(createEventSchema);
    middleware(mockReq as Request, mockRes as Response, mockNext);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Validation error: "category" must be one of [conference, workshop, meetup, seminar, general]' });
  });

  it('should fail for registrationCount > capacity', () => {
    mockReq.body = { name: 'Test', date: new Date(Date.now() + 86400000).toISOString(), capacity: 100, registrationCount: 150 };
    const middleware = validateRequest(createEventSchema);
    middleware(mockReq as Request, mockRes as Response, mockNext);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Validation error: "registrationCount" must be less than or equal to ref:capacity' });
  });

  it('should fail for past date', () => {
    mockReq.body = { name: 'Test', date: new Date(Date.now() - 86400000).toISOString(), capacity: 10 };
    const middleware = validateRequest(createEventSchema);
    middleware(mockReq as Request, mockRes as Response, mockNext);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Validation error: "date" must be greater than "now"' });
  });
});