interface Config {
  baseUrlAPI: string;
  eventId: string;
  token: string;
}

export async function handleConnect(request: Request): Promise<Response> {
  const { headers } = request;
  const contentType = headers.get('content-type');

  if (contentType !== 'application/json') {
    return new Response('Invalid Content-Type. Only JSON is allowed.', {
      status: 400,
    });
  }

  const body: Config = await request.json();

  if (!body || !body.baseUrlAPI || !body.eventId || !body.token) {
    return new Response('Missing required fields.', { status: 400 });
  }

  const response = {
    message: 'This is the POST endpoint response!',
    data: body,
  };

  return new Response(JSON.stringify(response), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
