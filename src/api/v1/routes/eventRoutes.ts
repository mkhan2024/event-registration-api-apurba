import express from 'express';
import * as controller from '../controllers/eventController';
import { validateRequest } from '../middleware/validationMiddleware';
import { createEventSchema, updateEventSchema, getEventSchema, deleteEventSchema } from '../validation/eventValidation';

const router = express.Router();

router.post('/', validateRequest(createEventSchema), controller.create);
router.get('/', controller.getAll);
router.get('/:id', validateRequest(getEventSchema), controller.getById);
router.put('/:id', validateRequest(updateEventSchema), controller.update);
router.delete('/:id', validateRequest(deleteEventSchema), controller.remove);

export default router;