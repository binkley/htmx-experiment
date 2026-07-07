# HTMX Experiment

Kick the tires on HTMX. This is a demonstration project showcasing advanced
HTMX capabilities powered by a Node.js Express backend and EJS server-side
templating.

## Features Demonstrated

- **Active Search:** Real-time filtering with `hx-trigger="keyup changed
  delay:300ms"` and loading indicators (`hx-indicator`).
- **Inline Editing:** Click-to-edit functionality using `hx-get` and `hx-put`
  to seamlessly swap forms and text.
- **Out-of-Band (OOB) Swaps:** Global state updates (like the Total/Completed
  counters) handled gracefully alongside targeted element swaps using
  `hx-swap-oob="true"`.
- **Server-Side Rendering (SSR):** Initial state is fully rendered via EJS to
  improve performance and user experience.
- **Surgical DOM Updates:** Create, Toggle, and Delete actions applied without
  full page reloads.

## Setup & Run

1. Install dependencies: ```bash npm install ```
2. Start the server: ```bash npm start ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

This project enforces a strict 100% test coverage threshold using Jest and
Supertest. 

To run the validation suite (which runs before pushing): ```bash npm run
validate:push ```
