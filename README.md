# HTMX Hypermedia Demonstration

Demonstrate a hypermedia-driven application using
**[HTMX](https://htmx.org/)**, **[Node](https://nodejs.org/)**,
**[EJS](https://ejs.co/)**, and **[Tailwind](https://tailwindcss.com/)**.

This project explores the "Backend for Frontend" (BFF) pattern where the
server acts as an Application State Engine, directly rendering and serving
HTML fragments to the browser. This eliminates complex client-side state
management, resulting in an incredibly fast, accessible, and easily testable
web application with **zero lines of client-side JavaScript**.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v26.0.0 or higher (Active LTS)

### Installation

1. Clone the repository and install dependencies:

   ```bash
   npm install
   ```

2. Start the development server (runs Tailwind JIT compiler & Node.js
   concurrently):

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to
   **[http://localhost:3000](http://localhost:3000)**.

_(Note: If you just want to run the server without the live-reloading
compiler, use `npm start`, which automatically builds the CSS once before
booting)._

---

## ✨ HTMX Patterns Demonstrated

This Todo application showcases several advanced HTMX paradigms:

- **Active Search & Filtering:** Real-time search using `hx-trigger="keyup
changed delay:300ms"` paired with loading indicators (`hx-indicator`).
  Pressing `<ESC>` natively clears the field and triggers a reset.
- **Inline Editing:** Click-to-edit functionality utilizing `hx-get` and
  `hx-put` to seamlessly swap static text for input forms and back again.
- **Out-of-Band (OOB) Swaps:** Global state updates. The Total/Completed
  counters in the header are gracefully updated alongside targeted element
  swaps using `hx-swap-oob="true"`.
- **Native Modal Integrations:** The delete action triggers a `<dialog>`
  modal. The actual `hx-delete` fires from inside the modal, seamlessly
  removing the item and dismissing the modal in a single network roundtrip.

---

## 🛠️ Tech Stack & Architecture

### Backend & Templating

- **Express.js:** Lightweight routing and API logic.
- **EJS (Embedded JavaScript):** Server-Side Rendering (SSR) engine used to
  compile pure HTML fragments. Abstracted component templates (like
  `partials/todo.ejs`) ensure the HTML is kept D.R.Y.

### Frontend & Presentation

- **HTMX:** Handles all DOM swapping and asynchronous network requests
  natively via HTML attributes.
- **Tailwind CSS v4:** Utility-first CSS engine.
- **daisyUI:** Semantic Tailwind plugin providing beautifully animated,
  accessible, CSS-only components (Cards, Badges, Modals, Inputs).

### Engineering Standards

This repository follows best software engineering standards:

- **100% Test Coverage:** Enforced globally across branches, functions, lines,
  and statements using **Jest** and **Supertest**.
- **Code Quality:** **ESLint** (v9 Flat Config) for static analysis and
  **Prettier** for opinionated formatting across JS, JSON, CSS, EJS, and
  Markdown.
- **Git Hooks:** **Husky** and **lint-staged** prevent committing
  unformatted/unlinted code, while a `pre-push` hook enforces the 100% test
  validation suite before reaching remote branches.
- **CI/CD:** Automated GitHub Actions pipeline ensuring the build and test
  stages pass on every PR, with **Dependabot** configured for weekly ecosystem
  updates.

---

## 💻 Available Commands

| Command                   | Description                              |
| ------------------------- | ---------------------------------------- |
| `npm start`               | Run the app                              |
| `npm test`                | Run tests and show coverage              |
| `npm run dev`             | Run the app with on-the-fly code editing |
| `npm run format`          | Format your code                         |
| `npm run validate:commit` | Runs on `git commit`                     |
| `npm run validate:push`   | Runs on `git push`                       |
