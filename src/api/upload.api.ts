// import cloudinary from '@/libs/cloudinary';
import { Env, Picture } from "@/api/types";
import { Buffer } from "buffer";
import { detectType,dataURItoUint8Array } from "@/api/utils";

export async function validateFace(request: Request, env: Env): Promise<Response> {
  const { headers } = request;
  const contentType = headers.get('content-type');

  if (contentType !== 'application/json') {
    return new Response('Invalid Content-Type. Only JSON is allowed.', {
      status: 400,
    });
  }

  const body: Picture = await request.json();

  if (!body || !body.pic || !body.face_id) {
    return new Response('Missing required fields.', { status: 400 });
  }
  const base64 = body.pic
  const type = detectType(base64)

  if (!type)
    return new Response('Picture not found type', { status: 400 });

  await env.MY_BUCKET.put('image', dataURItoUint8Array(base64), { httpMetadata: { contentType: type.mimeType } });

  const response = {
    status: Math.random() < 0.5,
  };

  return new Response(JSON.stringify(response), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
