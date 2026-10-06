# Calc Studio — Calculator Front End

**Author:** WuYiming · **Student ID:** 832402123

**Live application:** https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site  
**API health:** https://wuyiming-832402123-calculator-api.sleek-ibex-2403.chatgpt.site/api/health

An English, responsive calculator interface with server-generated results and database history. This is the front-end repository; the API is in the separate `832402123_calculator_backend` repository.

## Technology and runtime

Plain HTML, CSS, and browser JavaScript. No third-party client libraries or build step. A modern browser with Fetch and `AbortSignal.timeout` is required. Node.js 24 or later runs the included local static server.

Download the repository and open a terminal in its root. No package installation is required.

## Start locally

The shipped configuration uses the deployed HTTPS API. To test both services locally, set `apiBaseUrl` in `src/config.js` to `http://localhost:3000` and start the separate back-end API on port 3000. Then run:

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

The client requires no database initialization. The local back end creates SQLite automatically; the public API uses a migrated D1 SQLite database. History is retrieved from `/api/history`, never from LocalStorage. Only the theme preference is stored locally.

## Features

- Button and keyboard expression input, Enter to calculate, Escape to clear.
- Backend calculation with loading and error messages.
- History display, deletion of a specified record, and expression reuse.
- Server-side history search and five-record pagination.
- Light/dark themes with theme preference persistence.
- Responsive desktop/mobile layout and accessible input/button labels.

Expressions support `+`, `-`, `*`, `/`, parentheses, unary signs, and decimals. Calculation limits and rounding rules are documented in the back-end README. The UI uses × and ÷ labels but sends mathematical operators to the server.

## Public deployment

The project is published with Sites as a static HTTPS application. Its production artifact contains the HTML/CSS/JavaScript files and demonstration screenshots. The API is a separately deployed service, with persistent D1 SQLite storage. Public browser verification confirmed calculation, error handling, cross-origin communication, refresh persistence, and record deletion.

Both services must remain accessible during grading. The public deployment does not depend on the local Node.js processes.

Alternatively, serve the `src/` directory from another static HTTPS host. Configure the actual front-end origin in the API's allowed-origin list. `serve.js` is intended for local development.

## Verification

```sh
node --check src/app.js
node --check serve.js
```

To verify separation, stop the API and enter a new expression: the UI should show an API error and no calculated result. Reopen the front end after a successful calculation to confirm the stored history remains visible. Delete a record and refresh to confirm database deletion.

Actual local demonstration screenshots and a public deployment screenshot are in [docs/screenshots](docs/screenshots).

## Structure

```text
src/
  index.html    Accessible calculator and history interface
  styles.css    Responsive layouts and theme variables
  config.js     Configurable API origin
  app.js        Input handling, Fetch calls, and rendering
serve.js        Local static file server
docs/           Real demonstration screenshots
codestyle.md    Code standards
```

See [code standards](codestyle.md) and [MDN Fetch documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).
