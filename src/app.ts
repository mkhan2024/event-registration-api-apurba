import express from 'express';
import type { Request, Response } from 'express';
import eventRoutes from './api/v1/routes/eventRoutes';

const app = express();

app.use(express.json());

app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

app.use('/api/v1/events', eventRoutes);

export default app;