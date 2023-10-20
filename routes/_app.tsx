import { AppProps } from '$fresh/server.ts';
import { Action, HarborHeader } from '@harbor/atomic';
import { Header } from "../islands/Header.tsx";

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
          {/* <HarborHeader
            nav={
              <>
                <Action href="/dashboard" class="mx-2">Dashboard</Action>

                <Action href="/dashboard/portrayals" class="mx-2">
                  Portrayals
                </Action>

                <Action href="/dashboard/reports" class="mx-2">Reports</Action>
              </>
            }
          /> */}
          <Header />


          <div class="mx-auto flex flex-col">
            <Component />
          </div>
        </div>
      </body>
    </html>
  );
}
