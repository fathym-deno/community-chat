import { getCookies } from "$std/http/cookie.ts";

export const handler = [
  // deno-lint-ignore no-explicit-any
  function loggedInCheck(req: any, ctx: any) {
    const cookies = getCookies(req.headers);

    const userCookie = cookies["user"];

    if (!userCookie) {
      const headers = new Headers();

      headers.set("location", "/");

      return new Response(null, {
        status: 303, // See Other
        headers,
      });
    }

    return ctx.next();
  },
];
