import { Middleware } from "$fresh/server.ts";
import { Cookies } from "std/http/cookie.ts";

export const middleware: Middleware = async (req, ctx) => {
  const cookies = new Cookies(req);
  const userCookie = cookies.get("user");

  if (!userCookie) {
    const headers = new Headers();
    headers.set("location", "/");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  }

  return await ctx.next(req);
};