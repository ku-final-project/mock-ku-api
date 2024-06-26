import { Bindings } from '@/bindings/index';
import { detectType, dataURItoUint8Array } from '@/libs/utils';
import { Context, Next } from 'hono';
import { Static, Type as T } from '@sinclair/typebox';
import { KuApi } from '@/libs/kuApi';

export const validateFaceSchema = T.Object({
  pic: T.String(),
  face_id: T.String(),
});

type Picture = Static<typeof validateFaceSchema>;

export async function validateFace(c: Context<{ Bindings: Bindings }>, next: Next): Promise<Response> {
  const body: Picture = await c.req.json();

  const base64 = body.pic;
  const type = detectType(base64);

  if (!type) return new Response('Picture not found type', { status: 400 });

  await c.env.MY_BUCKET.put('image', dataURItoUint8Array(base64), { httpMetadata: { contentType: type.mimeType } });
  const kuApi = new KuApi(c.env);
  const faceStatus = await kuApi.validateFace({ file: base64.split(',')[1], single: true });

  return c.json({
    status: faceStatus,
  });
}
