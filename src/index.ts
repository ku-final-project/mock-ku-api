import { handleHelloGET } from '@/api/hello.api';
import { handleConnect } from '@/api/login.api';
import { Config } from '@/api/types';
import { validateFace } from '@/api/upload.api';
import { Env } from '@/api/types';

export default {
  async fetch(request: Request, env: Env) {
    const { method, url } = request;
    if (method === 'GET') {
      // GET method
      if (url.endsWith('/hello')) return handleHelloGET();
      else {
        return new Response('Method Not Allowed', { status: 405 });
      }
    } else if (method === 'POST') {
      // POST method
      if (url.endsWith('/login')) return handleConnect(request);
      else if (url.endsWith('/upload')) return validateFace(request, env);
      else {
        return new Response('Method Not Allowed', { status: 405 });
      }
    } else {
      return new Response('Method Not Allowed', { status: 405 });
    }
  },
};

// addEventListener('fetch', (event: FetchEvent) => {
//   event.respondWith(handleRequest(event.request));
// });

// async function handleRequest(request: Request,env: Env): Promise<Response> {
//   const { method, url } = request;
//   if (method === 'GET') {
//     // GET method
//     if (url.endsWith('/hello')) return handleHelloGET();
//     else {
//       return new Response('Method Not Allowed', { status: 405 });
//     }
//   } else if (method === 'POST') {
//     // POST method
//     if (url.endsWith('/login')) return handleConnect(request);
//     else if (url.endsWith('/upload')) return validateFace(request,env);
//     else {
//       return new Response('Method Not Allowed', { status: 405 });
//     }
//   } else {
//     return new Response('Method Not Allowed', { status: 405 });
//   }
// }
