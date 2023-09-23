import { Handlers, PageProps } from "$fresh/server.ts";
import { deleteCookie } from "$std/http/cookie.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    const headers = new Headers();

    deleteCookie(headers, "user");

    headers.set("location", "/");

    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};
