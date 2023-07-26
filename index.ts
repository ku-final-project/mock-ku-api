// index.ts
addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request));
});

interface Config {
  baseUrlAPI: string;
  eventId: string;
  token: string;
}

async function handleRequest(request: Request): Promise<Response> {
  const { method, url } = request;

  if (method === "GET" && url.endsWith("/login")) {
    return handleHelloGET();
  } else if (method === "POST" && url.endsWith("/login")) {
    return handlePOST(request);
  } else {
    return new Response("Method Not Allowed", { status: 405 });
  }
}

async function handleHelloGET(): Promise<Response> {
  const response = {
    message: "Hello, this is the GET /hello endpoint response!",
  };

  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function handlePOST(request: Request): Promise<Response> {
  const { headers } = request;
  const contentType = headers.get("content-type");

  if (contentType !== "application/json") {
    return new Response("Invalid Content-Type. Only JSON is allowed.", {
      status: 400,
    });
  }

  const body: Config = await request.json();

  if (!body || !body.baseUrlAPI || !body.eventId || !body.token) {
    return new Response("Missing required fields.", { status: 400 });
  }

  // Your logic to process the POST request and generate a response
  const response = {
    message: "This is the POST endpoint response!",
    data: body,
  };

  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
