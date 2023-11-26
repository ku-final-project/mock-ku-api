import { Context, Next } from 'hono';
import { HTTPException } from 'hono/http-exception'

export async function apiKeyMiddlewares(c: Context, next: Next) {
  const API_KEY = c.req.header('X-Api-Key');

  if (API_KEY !== c.env.SHARED_API_KEY) {
    throw new HTTPException(401, { message: 'Unauthorized' })
  }
  await next();
}
