import { AppProps } from "$fresh/server.ts";
import NavbarBranded from "../islands/NavBarBranded.tsx";
import { handler } from "./api/conversations/[deploymentId]/[convoId].ts";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>community-chat</title>
      </head>
      <body class="mx-auto dark:text-white dark:bg-gray-900">
        <div class="mx-auto dark:bg-gray-900">
          <NavbarBranded />

          <div class="mx-auto flex flex-col">
            <Component />
          </div>
        </div >
      </body>
    </html>
  );
}
