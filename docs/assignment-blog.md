# First Assignment: Front-End and Back-End Separation Calculator System

**Name:** WuYiming  
**Student ID:** 832402123

| Item | Description |
| --- | --- |
| Course for This Assignment | [2601_FZU-MU_SE](https://bbs.csdn.net/forums/2601_MU_SE_FZU) |
| Assignment Requirements | [First Assignment — Front-End and Back-End Separation Calculator System](https://bbs.csdn.net/topics/620530837) |
| Objectives of This Assignment | Implement server-side arithmetic, understand HTTP/JSON communication, persist calculation history in a database, and verify a complete separated application. |
| Other References | Google JavaScript Style Guide, Node.js SQLite documentation, MDN Fetch documentation, and GitHub Pages documentation. |

> The source code, documentation, and demonstrations were prepared with AI assistance and checked against the assignment requirements. The public application uses independently hosted front-end and back-end services with persistent D1 SQLite history.

## Git Repository Link and Code Standards Link

| Resource | Address |
| --- | --- |
| Front-End Repository | https://github.com/832402123wuyiming/832402123_calculator_frontend |
| Back-End Repository | https://github.com/832402123wuyiming/832402123_calculator_backend |
| Front-End Code Standards | https://github.com/832402123wuyiming/832402123_calculator_frontend/blob/main/codestyle.md |
| Back-End Code Standards | https://github.com/832402123wuyiming/832402123_calculator_backend/blob/main/codestyle.md |
| Public Front-End Application | https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site |
| Public Back-End Health Endpoint | https://wuyiming-832402123-calculator-api.sleek-ibex-2403.chatgpt.site/api/health |

Both repositories have been published. Each contains its own source code, README, and code standard document. The two public HTTPS services were verified on October 7, 2026.

## Table of Contents

- [Git Repository Link and Code Standards Link](#git-repository-link-and-code-standards-link)
- [Assignment Description](#assignment-description)
- [PSP Table](#psp-table)
- [Presentation of the Finished Product](#presentation-of-the-finished-product)
- [Design and Implementation Process](#design-and-implementation-process)
- [Code Explanation](#code-explanation)
- [Testing and Verification](#testing-and-verification)
- [Deployment and Access](#deployment-and-access)
- [Personal Journey and Learnings](#personal-journey-and-learnings)
- [References](#references)

## Assignment Description

Calc Studio is a calculator application with separate front-end and back-end projects. The browser handles expression input, calculator buttons, result presentation, history display, and error messages. The server validates and parses expressions, performs arithmetic, and manages SQLite records.

The required features are addition, subtraction, multiplication, division, compound expressions, operator precedence, parentheses, unary signs, decimal numbers, persistent history, and deletion of a specified history record. Invalid expressions and division by zero produce useful errors. History search, pagination, expression reuse, keyboard shortcuts, and theme switching are additional working features.

The essential design decision is that the browser sends an expression, rather than a precomputed result. A successful API response is the only source of a new displayed calculation result.

## PSP Table

The initial estimates were recorded before implementation. Back-end development includes the parser, database initialization, calculation service, and history endpoints. The reference values below are reconstructed planning estimates supplied for comparison; they are not measured personal working times. The reference values describe a plausible development budget; they do not claim that these durations were personally measured.

| PSP Activity | Initial Estimate (minutes) | Reconstructed Reference Estimate (minutes) |
| --- | ---: | --- |
| Requirement analysis | 20 | 20 |
| System and API design | 25 | 30 |
| Back-end development: parser, database, and history | 75 | 90 |
| Front-end development | 60 | 65 |
| Front-end/back-end integration | 25 | 30 |
| Testing and demonstration | 40 | 45 |
| Public deployment | 25 | 35 |
| Blog writing and review | 40 | 50 |
| **Total** | **310** | **365** |

The assignment requests actual PSP records. Replace the reconstructed reference column with your genuine actual minutes if available; these estimates do not establish compliance with that requirement.

## Presentation of the Finished Product

The first 21 screenshots were captured from actual local verification. The final screenshot shows the public deployment. All image links below are hosted publicly with the front end, so they can be embedded directly in the published blog.

### 1. Main calculator interface

The interface provides an expression field, result area, calculator keypad, API status, and database history panel.

![Main calculator interface](https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site/screenshots/01-main-interface.png)

### 2. Addition

The server calculates `12+8` and returns `20`. A successful calculation is automatically added to history.

![Addition](https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site/screenshots/02-addition.png)

### 3. Subtraction

The expression `12-8` returns `4` through the calculation API.

![Subtraction](https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site/screenshots/03-subtraction.png)

### 4. Multiplication

The keypad displays multiplication as ×; the internal operator is `*`. The expression `5*8` returns `40`.

![Multiplication](https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site/screenshots/04-multiplication.png)

### 5. Division

The expression `10/2` returns `5`. The keypad uses ÷ as its visible division label.

![Division](https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site/screenshots/05-division.png)

### 6. Decimal arithmetic

The result of `0.1+0.2` is `0.3`. Exact fractional arithmetic avoids the usual binary floating-point artifact for this expression.

![Decimal arithmetic](https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site/screenshots/06-decimal.png)

### 7. Operator precedence

The expression `1+2*3` returns `7`, demonstrating that multiplication is processed before addition.

![Operator precedence](https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site/screenshots/07-precedence.png)

### 8. Parentheses

The expression `(1+2)*3` returns `9`, demonstrating that parentheses override normal precedence.

![Parentheses](https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site/screenshots/08-parentheses.png)

### 9. Unary minus

The expression `3*-2` returns `-6`. The minus sign is parsed as a unary operator in this position.

![Unary minus](https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site/screenshots/09-unary-negative.png)

### 10. Unary plus

The expression `+5 + -2` returns `3`, covering both unary signs.

![Unary plus](https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site/screenshots/10-unary-positive.png)

### 11. Invalid expression handling

The incomplete expression `1+` produces an explanatory validation message and no result. It is not inserted into history.

![Invalid expression](https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site/screenshots/11-invalid-expression.png)

### 12. Division by zero

The expression `1/(3-3)` is rejected because its denominator evaluates to zero.

![Division by zero](https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site/screenshots/12-division-by-zero.png)

### 13. History after browser refresh

Nine successful demonstration calculations remain visible after reloading the page. The two failed calculations did not create records.

![History after browser refresh](https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site/screenshots/13-refresh-persistence.png)

### 14. History after back-end restart

The API was stopped and reopened using the same SQLite file. The same nine records were retrieved again.

![History after API restart](https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site/screenshots/14-restart-persistence.png)

### 15–16. Deleting a specified history record

Before deletion, the database contains nine records. Deleting the latest record reduces the count to eight. A subsequent API query also confirms that the deleted ID is absent.

![Before deletion](https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site/screenshots/15-before-delete.png)

![After deletion](https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site/screenshots/16-after-delete.png)

### 17. History search

Searching for `0.1` retrieves the matching decimal expression from the database. Search is performed by the API, rather than by filtering a browser cache.

![History search](https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site/screenshots/17-history-search.png)

### 18. History pagination

History is displayed in pages of five records. The next-page button retrieves the second page from the server.

![History pagination](https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site/screenshots/18-pagination.png)

### 19. Dark theme

Theme switching changes the interface colors. Only this preference is stored in LocalStorage; calculation history remains in SQLite.

![Dark theme](https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site/screenshots/19-dark-theme.png)

### 20. Mobile layout

At a viewport width of 390 pixels, the calculator and history panel form a single column without horizontal overflow.

![Mobile layout](https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site/screenshots/20-mobile-layout.png)

### 21. Verification of front-end/back-end separation

With the API stopped, entering `2+2` displays a connection error and no calculated result. This verifies that the front end cannot independently perform the core arithmetic.

![API offline](https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site/screenshots/21-backend-offline.png)

### 22. Publicly deployed application

The live HTTPS front end communicates with the separately hosted API. The screenshot shows a server-generated result and history stored in the public D1 SQLite database.

![Public deployment](https://wuyiming-832402123-calculator.sleek-ibex-2403.chatgpt.site/screenshots/22-public-deployment.png)

## Design and Implementation Process

### Requirement analysis

The implementation separates four concerns: user interaction, mathematical processing, HTTP communication, and durable storage. Successful calculations must be saved with an expression, result, and time. Invalid requests must return errors without creating misleading database records. Deletion must change database state, not merely hide an item in the browser.

### Overall architecture

```text
Browser: HTML / CSS / JavaScript
        |
        | HTTP requests and JSON responses
        v
HTTP controller: Node.js locally / Cloudflare Worker publicly
        |
        +--> Tokenizer and recursive descent parser
        |         |
        |         +--> Exact fractional arithmetic
        |
        +--> SQLite history model
                  |
                  +--> calculation_history table on disk
```

The local front end runs on port 5173 and the Node.js API on port 3000. Production uses a static HTTPS front end and a separate Cloudflare Worker API with D1 SQLite. Both projects have separate GitHub repositories.

### Functional structure diagram

```text
Calculator System
├── Front End
│   ├── Expression input and keypad
│   ├── Result and error display
│   ├── History display, search, and pagination
│   ├── Record deletion and expression reuse
│   └── Keyboard shortcuts and theme switching
└── Back End
    ├── HTTP API and request validation
    ├── Calculation Service
    │   ├── Number and operator tokenization
    │   ├── Precedence and parentheses
    │   ├── Unary plus and minus
    │   └── Decimal arithmetic and error handling
    └── SQLite History Model: local file / hosted D1
        ├── Initialize database
        ├── Save successful calculations
        ├── Query, search, and paginate records
        └── Delete a specified record
```

### Front-end design

The interface uses semantic HTML and a responsive two-column layout. Calculator controls insert or remove characters in the expression field. They do not evaluate expressions. Enter submits a calculation; Escape clears the field. Results and errors are announced through live regions.

The network helper uses Fetch with a timeout, checks HTTP status and the JSON success flag, and presents readable failures. API strings are rendered through `textContent`, avoiding interpretation as HTML. A request counter prevents outdated history responses from replacing newer search results.

### Back-end design

The controller accepts HTTP requests, checks JSON and input limits, handles allowed browser origins, and returns a consistent response shape. The service implements mathematical parsing and arithmetic. The model owns database creation and parameterized SQL statements. `server.js` configures the service and its lifecycle.

Node.js built-ins provide local HTTP and SQLite functionality. The production adapter in `src/worker.js` uses the standard Request/Response APIs and D1 prepared statements. Both adapters import the same arithmetic service. No third-party expression parser is used.

### API design

| Method | Endpoint | Responsibility | Success Status |
| --- | --- | --- | --- |
| GET | `/api/health` | Check API readiness | 200 |
| POST | `/api/calculate` | Validate, calculate, and store a record | 201 |
| GET | `/api/history?page=1&limit=5&search=` | Query persistent history | 200 |
| DELETE | `/api/history/{id}` | Delete the specified record | 200 |

Example request:

```json
{"expression":"(1+2)*3"}
```

Example response, with an illustrative ID and timestamp:

```json
{
  "success": true,
  "id": 1,
  "expression": "(1+2)*3",
  "result": "9",
  "created_at": "2026-10-06T16:00:00.000Z"
}
```

The result is a decimal string. This preserves the server's formatting when transmitted as JSON. Failed requests return `success: false`, a code, and a readable message.

### Database design

```sql
CREATE TABLE calculation_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  expression TEXT NOT NULL,
  result TEXT NOT NULL,
  created_at TEXT NOT NULL
) STRICT;
```

The primary key identifies a record for deletion. Expressions and formatted results are text. Timestamps use UTC ISO format; the browser displays them in local time. The local database is created automatically on first startup and stored in a file rather than memory. Production uses durable D1 SQLite; its table is initialized by a schema-only deployment migration.

### Calculation module design

The grammar is:

```text
sum     := product (("+" | "-") product)*
product := unary (("*" | "/") unary)*
unary   := ("+" | "-") unary | primary
primary := number | "(" sum ")"
```

This grammar gives multiplication and division higher precedence than addition and subtraction. Looping within each precedence level gives left associativity. Recursive unary parsing supports signs after operators, and parenthesized expressions recursively parse a complete sum.

Decimal literals become exact fractions backed by `BigInt`. Operations reduce fractions using the greatest common divisor. The final value is rounded to at most 12 fractional places, with halfway cases rounded away from zero. For example, `1/3` displays `0.333333333333`, while `(1/3)*3` returns `1` because intermediate values are not rounded.

Expression length, numeric literal length, and intermediate fraction sizes are bounded. Functions, scientific notation, powers, and implicit multiplication are not part of this version. General-purpose user code is never executed.

### Calculation history module design

After successful parsing, the model inserts the normalized expression, formatted result, and timestamp. The controller returns the inserted record. History queries read SQLite in descending ID order and include pagination metadata. Literal substring search uses bound parameters.

For deletion, the API receives an ID and executes a parameterized DELETE. A missing record returns HTTP 404. The browser retrieves the latest history state after successful deletion, including any changed page count.

### Exception handling

Malformed expressions, unmatched parentheses, missing operands, and division by zero return HTTP 400. Invalid JSON, excessively long inputs, and unsupported characters are rejected. Oversized request bodies return 413, and unsupported content types return 415. Unexpected server failures return a generic 500 response while retaining diagnostic information in server logs.

The production adapter inserts through a bound D1 statement with `RETURNING`, receiving the inserted row in the same database operation. No successful response is sent until the database insertion has completed. If a storage failure occurs, the operation reports an error rather than claiming the record was saved.

## Code Explanation

### Front-end calculation request

```js
const data = await api('/api/calculate', {
  method: 'POST',
  body: JSON.stringify({expression: expression.value}),
});
result.textContent = data.result;
```

The payload contains only the expression. The displayed result comes from the response, preserving the required responsibility boundary.

### Calculate and save in the controller

```js
const body = await readJson(request);
const calculation = calculateExpression(body.expression);
const record = history.add(calculation.expression, calculation.result);
reply(response, 201, {success: true, ...record});
```

Parsing happens before insertion. Consequently, invalid expressions cannot enter history through this route.

### Operator precedence

```js
function product() {
  let value = unary();
  while (['*', '/'].includes(tokens[cursor]?.type)) {
    const operator = tokens[cursor++].type;
    value = value.operate(operator, unary());
  }
  return value;
}
```

The higher-level `sum()` function consumes `product()` values. Therefore, `1+2*3` groups multiplication first. Parentheses call `sum()` from `primary()`, creating an explicit nested expression.

### Database insertion and deletion

```js
const insert = database.prepare(
    'INSERT INTO calculation_history (expression, result, created_at) VALUES (?, ?, ?)');
const remove = database.prepare(
    'DELETE FROM calculation_history WHERE id = ?');
```

User values are passed separately from SQL statements. Record IDs identify exactly which calculation to delete. History retrieval uses a prepared SELECT with an explicit order and bounded pagination.

### Standardized errors

```json
{
  "success": false,
  "code": "DIVISION_BY_ZERO",
  "message": "Division by zero is not allowed."
}
```

A consistent error shape lets the browser show messages without depending on internal exception details.

## Testing and Verification

The back-end test suite was executed with `node --test`: **53 tests passed, 0 failed**. Coverage includes arithmetic examples, invalid grammar, range limits, division by zero, HTTP validation, CORS, history search, pagination, persistence, and durable deletion.

The browser verification completed **20 checks** with **no uncaught page errors**. The demonstration includes nine valid arithmetic expressions, two invalid calculations, browser/API restart persistence, deletion, search, pagination, theme persistence, mobile layout, keypad/keyboard input, API-offline behavior, and expression reuse.

Selected results:

| Test | Expected | Verified Outcome |
| --- | --- | --- |
| `1+2*3` | `7` | Passed |
| `(1+2)*3` | `9` | Passed |
| `3*-2` | `-6` | Passed |
| `0.1+0.2` | `0.3` | Passed |
| `1/(3-3)` | Division-by-zero error | Passed |
| Refresh browser and restart API | Same stored records | Passed |
| Delete a specific ID | Record absent from database | Passed |
| Stop API and request `2+2` | No new result | Passed |
| 390-pixel mobile viewport | No horizontal overflow | Passed |

Public verification also completed **10 checks**: database health, front-end accessibility and cross-origin API communication, four calculation examples, division-by-zero handling, history after reload, database deletion, and a hosted screenshot. No uncaught page errors occurred. The public checks were performed through the existing VPN proxy on the development computer.

## Deployment and Access

### Verified local access

Requirements: Node.js 24 or later and a modern browser. There are no external runtime packages to install.

In the back-end repository:

```sh
node --env-file-if-exists=.env src/server.js
```

In a second terminal, inside the front-end repository:

```sh
node serve.js
```

Open `http://localhost:5173`. The default API is `http://localhost:3000`, and SQLite is initialized automatically.

### Public deployment procedure

Public deployment is complete. Sites hosts the static front end and a separately deployed Cloudflare Worker API. The API uses the persistent D1 binding `DB`. The repository also contains a local Node.js server and optional Docker deployment files.

The release process registered separate public services, applied the D1 schema migration, packaged the dependency-free Worker, and deployed the API. The front-end configuration was then set to the API HTTPS origin, and the client and screenshots were published as static assets. The API allows the exact front-end origin for CORS. The verified public URLs appear at the beginning of this article. The hosted deployment remains available independently of the local development computer.

### Evaluator test instructions

Open the public front-end URL and confirm the API-connected indicator. Test basic arithmetic, `1+2*3`, `(1+2)*3`, `3*-2`, and `0.1+0.2`. Then test `1+` and `1/0`. Refresh the page to verify history and delete one record to verify durable removal. No account is required; this version uses shared demonstration history.

Both services must remain available throughout the evaluation period. The public deployment was tested against the calculation and history APIs and the actual browser interface.

## Personal Journey and Learnings

The following discussion records technical observations from implementation and verification.

### Expression parsing

A calculator needs more than splitting a string at an operator. For example, the minus sign in `3*-2` has a different role from subtraction in `3-2`. A grammar with separate unary and binary levels makes that distinction explicit. Precedence and parentheses can then be tested independently.

### Decimal precision

Direct floating-point arithmetic can make a simple decimal example display an unexpected result. Fractional arithmetic keeps intermediate values exact and postpones rounding until presentation. The difference between `(1/3)*3` and a calculation that rounds after every operation is a useful example of why the rounding policy needs documentation.

### Persistence and deployment

Showing history after a calculation does not prove durability. Verification must reload the browser and restart the API using the same database file. Likewise, a successful local database test does not prove that a hosting provider preserves files after deployment. Persistent storage is a deployment requirement as well as an implementation requirement.

### Communication and responsibility

The front end should report server and network failures without manufacturing a result. The API-offline test demonstrates the architectural boundary directly: input remains possible, but a new valid result cannot be obtained without the back end.

### Verification difficulty encountered

During automated demonstration capture, the restart check initially waited on open HTTP connections. The capture harness was changed to close its test connections explicitly before reopening the API. The full browser sequence was rerun successfully, including the restart and API-offline checks. This was a test-harness issue and did not change the arithmetic implementation.

### Possible future improvements

Future versions could provide accounts with isolated history, additional mathematical functions with explicit grammar rules, structured request logging, accessibility refinements, and database backups. A larger multi-instance deployment would also require reconsidering the synchronous SQLite access pattern and shared-file storage design.

## References

1. [Assignment requirements](https://bbs.csdn.net/topics/620530837).
2. [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html).
3. [Node.js 24 SQLite documentation](https://nodejs.org/docs/latest-v24.x/api/sqlite.html).
4. [MDN: Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).
5. [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
6. [Cloudflare D1 prepared statements](https://developers.cloudflare.com/d1/worker-api/prepared-statements/).
