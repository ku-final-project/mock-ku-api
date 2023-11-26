import { Picture } from '@/api/types';
import { Bindings } from '@/bindings/index';
import { detectType, dataURItoUint8Array } from '@/libs/utils';
import { Context, Next } from 'hono';
import { Type as T } from '@sinclair/typebox';

export const validateFaceSchema = T.Object({
  pic: T.String(),
  face_id: T.String(),
});

export async function validateFace(c: Context<{ Bindings: Bindings }>, next: Next): Promise<Response> {
  const body: Picture = await c.req.json()

  const base64 = body.pic;
  const type = detectType(base64);

  if (!type) return new Response('Picture not found type', { status: 400 });

  await c.env.MY_BUCKET.put('image', dataURItoUint8Array(base64), { httpMetadata: { contentType: type.mimeType } });

  return c.json({
    status: Math.random() < 0.5,
  })
}
