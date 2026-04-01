import express from 'express';
import * as controller from '../controllers/eventController';
import { validateRequest } from '../middleware/validationMiddleware';
import { 
    createEventSchema, 
    updateEventSchema, 
    getEventSchema, 
    deleteEventSchema 
} from '../validation/eventValidation';

const router = express.Router();

// Get all events
router.get('/', controller.getAll);

// Create a new event
router.post('/', validateRequest(createEventSchema), controller.create);

// Get single event by ID
router.get('/:id', validateRequest(getEventSchema), controller.getById);

// Update an event
router.put('/:id', validateRequest(updateEventSchema), controller.update);

// Delete an event
router.delete('/:id', validateRequest(deleteEventSchema), controller.remove);

export default router;