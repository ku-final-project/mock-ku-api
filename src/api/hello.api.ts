export async function handleHelloGET(): Promise<Response> {
  const response = {
    message: 'Hello, this is the GET /hello endpoint response!',
  };

  return new Response(JSON.stringify(response), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
