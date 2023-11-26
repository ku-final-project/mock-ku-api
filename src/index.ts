import { Hono } from 'hono';
import { Bindings } from '@/bindings/index';
import { validateFace } from '@/api/upload.api';

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c, next) => c.text('Hello Hono!'));

app.post('/upload', validateFace);

export default app;
