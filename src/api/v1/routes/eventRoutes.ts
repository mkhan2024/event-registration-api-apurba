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

/**
 * @openapi
 * /events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       '200':
 *         description: Successfully retrieved all events
 *       '500':
 *         description: Server error
 */
router.get('/', controller.getAll);

/**
 * @openapi
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - date
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               capacity:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Event created successfully
 *       '400':
 *         description: Invalid input data
 *       '500':
 *         description: Server error
 */
router.post('/', validateRequest(createEventSchema), controller.create);

/**
 * @openapi
 * /events/{id}:
 *   get:
 *     summary: Get a single event by ID
 *     tags: [Events]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved the event
 *       '404':
 *         description: Event not found
 *       '500':
 *         description: Server error
 */
router.get('/:id', validateRequest(getEventSchema), controller.getById);

/**
 * @openapi
 * /events/{id}:
 *   put:
 *     summary: Update an existing event
 *     tags: [Events]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               capacity:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Event updated successfully
 *       '404':
 *         description: Event not found
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Server error
 */
router.put('/:id', validateRequest(updateEventSchema), controller.update);

/**
 * @openapi
 * /events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Event deleted successfully
 *       '404':
 *         description: Event not found
 *       '500':
 *         description: Server error
 */
router.delete('/:id', validateRequest(deleteEventSchema), controller.remove);

export default router;