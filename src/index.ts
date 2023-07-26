import { handleHelloGET } from '@/api/hello.api';
import { handleConnect } from '@/api/login.api';

addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request: Request): Promise<Response> {
  const { method, url } = request;

  if (method === 'GET' && url.endsWith('/login')) {
    return handleHelloGET();
  } else if (method === 'POST' && url.endsWith('/login')) {
    return handleConnect(request);
  } else {
    return new Response('Method Not Allowed', { status: 405 });
  }
}
