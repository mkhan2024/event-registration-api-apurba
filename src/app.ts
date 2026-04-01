import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

import eventRoutes from './api/v1/routes/eventRoutes';
import { getHelmetConfig } from '../config/helmetConfig';
import { getCorsConfig } from '../config/corsConfig';
import setupSwagger from '../config/swagger';

const app = express();

app.use(getHelmetConfig());
app.use(getCorsConfig());
setupSwagger(app);

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