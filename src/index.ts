import { Hono } from 'hono';
import { Bindings } from '@/bindings/index';
import { validateFace, validateFaceSchema } from '@/api/upload.api';
import { apiKeyMiddlewares } from '@/middlewares/apiKey';
import { logger } from 'hono/logger';
import { tbValidator } from '@hono/typebox-validator';

const app = new Hono<{ Bindings: Bindings }>();
app.use('*', logger());

app.get('/', async (c, next) => c.text('Hello Hono!'));
app.post(
  '/upload',
  tbValidator('json', validateFaceSchema, (result, c) => {}),
  apiKeyMiddlewares,
  validateFace,
);

export default app;
