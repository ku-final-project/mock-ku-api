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
  // const type = detectType(base64)

  // if (!type)
  //   return new Response('Picture not found type', { status: 400 });

  const picBuffer = Buffer.from(base64, 'base64');

  // const picBuffer = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))


  await env.MY_BUCKET.put('image.jpeg', dataURItoUint8Array(base64), { httpMetadata: { contentType: 'image/jpeg' } });

  const response = {
    status: Math.random() < 0.5,
  };

  return new Response(JSON.stringify(response), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// function str2ab (string: string) {
//   const
//     length = string.length,
//     buf = new ArrayBuffer(length),
//     bufView = new Uint8Array(buf);
//   for (var i = 0; i < length; i++) { bufView[i] = string.charCodeAt(i) }
//   return buf
// }

