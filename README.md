# POC SvelteKit Web Notification

In this POC, I want to create a SSR application that can send Web notifications
in a browser, even if the web page of the application is closed.

```sh
$ mise install
$ pnpm install
$ ./scripts/generate-vapid-keys.sh
$ source .envrc
$ pnpm run dev
```

Open <http://localhost:5137> in Chrome Browser.

Why Chrome Browser: [see this note](https://svelte.dev/docs/kit/service-workers#:~:text=the%20service%20worker%20is%20bundled%20for%20production%2C%20but%20not%20during%20development.%20for%20that%20reason%2C%20only%20browsers%20that%20support%20modules%20in%20service%20workers%20will%20be%20able%20to%20use%20them%20at%20dev%20time.).

Emit a notification:

```sh
$ curl -X POST http://localhost:5173/notify/
```

Normally, you should see a notification displayed by your Chrome browser, even if the website is not being displayed.
