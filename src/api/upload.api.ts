// import cloudinary from '@/libs/cloudinary';

interface Picture {
  pic: string;
  face_id: string;
}

export async function validateFace(request: Request): Promise<Response> {
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

  // const uploadPic = await cloudinary.uploader.upload(body.pic, { public_id: body.face_id, upload_preset: 'api_face' });

  const response = {
    status: Math.random() < 0.5,
  };

  return new Response(JSON.stringify(response), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
