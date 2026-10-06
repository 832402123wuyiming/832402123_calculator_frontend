# Calc Studio — Calculator Front End

**Author:** WuYiming · **Student ID:** 832402123

An English, responsive calculator interface with server-generated results and database history. This is the front-end repository; the API is in the separate `832402123_calculator_backend` repository.

## Technology and runtime

Plain HTML, CSS, and browser JavaScript. No third-party client libraries or build step. A modern browser with Fetch and `AbortSignal.timeout` is required. Node.js 24 or later runs the included local static server.

Download the repository and open a terminal in its root. No package installation is required.

## Start locally

First start the back-end API on port 3000. Then run:

```sh
node serve.js
```

Or use `npm start`. Open `http://localhost:5173`. The two services use separate ports and communicate over HTTP/JSON. Do not open `index.html` as a `file://` URL.

## Configuration

Edit `src/config.js`:

```js
window.CALCULATOR_CONFIG = {apiBaseUrl: 'http://localhost:3000'};
```

Use the API origin without `/api` or a trailing slash. For public deployment, replace this with the actual HTTPS API address. The back end must allow the front end's exact origin using `ALLOWED_ORIGINS`. GitHub Pages projects share the origin `https://USERNAME.github.io`; the repository path is not part of the origin.

The client requires no database initialization. The back end creates SQLite automatically. History is retrieved from `/api/history`, never from LocalStorage. Only the theme preference is stored locally.

## Features

- Button and keyboard expression input, Enter to calculate, Escape to clear.
- Backend calculation with loading and error messages.
- History display, deletion of a specified record, and expression reuse.
- Server-side history search and five-record pagination.
- Light/dark themes with theme preference persistence.
- Responsive desktop/mobile layout and accessible input/button labels.

Expressions support `+`, `-`, `*`, `/`, parentheses, unary signs, and decimals. Calculation limits and rounding rules are documented in the back-end README. The UI uses × and ÷ labels but sends mathematical operators to the server.

## Deploy on GitHub Pages

1. Publish this project as its own repository with a `main` branch.
2. Update `src/config.js` to the deployed HTTPS API address.
3. Open **Settings → Pages → Source → GitHub Actions**.
4. Run the included **Deploy frontend to GitHub Pages** workflow or push to `main`.
5. Open the actual Pages URL shown by the deployment. Check API connection, a calculation, history refresh, and deletion.

The workflow publishes only `src/`. It does not deploy the back-end service. Both services must remain accessible during grading. For workflow setup, see [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

Alternatively, serve the `src/` directory from any static HTTPS host. `serve.js` is intended for local development.

## Verification

```sh
node --check src/app.js
node --check serve.js
```

To verify separation, stop the API and enter a new expression: the UI should show an API error and no calculated result. Reopen the front end after a successful calculation to confirm the stored history remains visible. Delete a record and refresh to confirm database deletion.

Actual local demonstration screenshots are in [docs/screenshots](docs/screenshots). They do not claim that public deployment has been completed.

## Structure

```text
src/
  index.html    Accessible calculator and history interface
  styles.css    Responsive layouts and theme variables
  config.js     Configurable API origin
  app.js        Input handling, Fetch calls, and rendering
serve.js        Local static file server
docs/           Real demonstration screenshots
.github/        GitHub Pages deployment workflow
codestyle.md    Code standards
```

See [code standards](codestyle.md) and [MDN Fetch documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).
