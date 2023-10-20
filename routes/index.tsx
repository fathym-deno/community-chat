import { Handlers, PageProps } from '$fresh/server.ts';
import { setCookie } from '$std/http/cookie.ts';
import { SignIn } from '@harbor/atomic';

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render({});
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const password = form.get('password')?.toString() || '';

    if (password === Deno.env.get('PASSWORD')) {
      const headers = new Headers();
      headers.set('location', '/dashboard');

      // Create a new cookie
      const cookie = { name: 'user', value: 'loggedIn' };

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
    <div class="container px-4">
      <div class="mx-auto max-w-screen-md">
        <h1 class="text-2xl font-bold mb-4">Sign In</h1>

        <SignIn
          signInOptions={{
            formProps: {
              method: 'post',
              class: 'w-full max-w-sm py-8',
            },
            usernameInputProps: {
              class: 'hidden',
            },
            forgotPasswordActionProps: {
              class: 'hidden',
            },
            submitActionProps: {
              class: 'ml-auto',
            },
          }}
        />
      </div>

    </div>
  );
}
