import { Hono } from 'hono';
import { Bindings } from '@/bindings/index';

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', async (c, next) => c.text('Hello Hono!'));

export default app;
