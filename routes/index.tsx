import { Handlers, PageProps } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render({});
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const password = form.get("password")?.toString() || "";

    if (password === Deno.env.get("PASSWORD")) {
      const headers = new Headers();
      headers.set("location", "/dashboard");

      // Create a new cookie
      const cookie = { name: "user", value: "loggedIn" };

      setCookie(headers, cookie);

      return new Response(null, {
        status: 303, // See Other
        headers,
      });
    } else {
      return ctx.render({});
    }
  },
};

export default function Home(props: PageProps) {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form method="post" className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="password"
              type="password"
              name="password"
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
