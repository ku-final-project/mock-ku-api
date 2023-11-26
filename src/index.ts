import { Hono } from 'hono';
import { Bindings } from '@/bindings/index';
import { validateFace } from '@/api/upload.api';
import { apiKeyMiddlewares } from '@/middlewares/apiKey';
import { logger } from 'hono/logger'

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', logger())

app.get('/', async (c, next) => c.text('Hello Hono!'));
app.post('/upload', apiKeyMiddlewares, validateFace);

export default app;
