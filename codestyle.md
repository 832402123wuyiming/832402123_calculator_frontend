# Front-End Code Standards

**Source:** [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html). JavaScript conventions are adapted for a small browser application; HTML/CSS conventions below are project choices.

- Use two spaces, single-quoted ordinary strings, semicolons, `const` by default, and `let` only when reassignment is necessary.
- Name functions and variables in `lowerCamelCase` and use descriptive names.
- Keep configuration, behavior, layout, and page structure in separate files.
- Use small functions to separate network access, message display, and rendering.
- Use semantic HTML, explicit button types, associated labels, and English text.
- Use kebab-case CSS classes and custom properties for shared theme colors.

Project-specific rules:

- Send expressions to the API; never implement arithmetic evaluation in the client.
- Treat history and results as server-owned data.
- Render API strings with `textContent`; avoid interpreting user input as HTML.
- Check both HTTP status and the JSON success field.
- Present network, validation, and deletion failures clearly.
- Keep keyboard and mobile interactions usable.
- Store only theme preferences in LocalStorage; retrieve history from SQLite through the API.
- Ignore outdated history responses after a newer request has started.
