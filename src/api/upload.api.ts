import { Picture } from '@/api/types';
import { detectType, dataURItoUint8Array } from '@/libs/utils';
import { Context, Next } from 'hono';

export async function validateFace(c: Context, next: Next): Promise<Response> {
  const contentType = c.req.header('content-type');
  if (contentType !== 'application/json') {
    return new Response('Invalid Content-Type. Only JSON is allowed.', {
      status: 400,
    });
  }

  const body: Picture = await c.req.json()

  if (!body || !body.pic || !body.face_id) {
    return new Response('Missing required fields.', { status: 400 });
  }
  const base64 = body.pic;
  const type = detectType(base64);

  if (!type) return new Response('Picture not found type', { status: 400 });

  await c.env.MY_BUCKET.put('image', dataURItoUint8Array(base64), { httpMetadata: { contentType: type.mimeType } });

  const response = {
    status: Math.random() < 0.5,
  };

  return new Response(JSON.stringify(response), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
