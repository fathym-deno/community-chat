import { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>community-chat</title>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
