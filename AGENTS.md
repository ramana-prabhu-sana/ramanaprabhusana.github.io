# AGENTS.md

## Cursor Cloud specific instructions

This is a static React portfolio site built with Vite 7, Tailwind CSS 3, and Framer Motion. There are no backend services, databases, or external APIs.

### Services

| Service | Command | Notes |
|---|---|---|
| Vite Dev Server | `npm run dev` | Serves on port 5173 with HMR. Use `--host 0.0.0.0` to expose to the network. |

### Development

- **Install deps:** `npm install`
- **Dev server:** `npm run dev`
- **Build:** `npm run build` (outputs to `dist/`)
- **Preview prod build:** `npm run preview`

### Notes

- No ESLint/Prettier/linter is configured in this project. There is no `lint` script in `package.json`.
- No automated tests are configured. There is no test runner or `test` script.
- The CI/CD pipeline (`.github/workflows/deploy.yml`) uses `npm ci` and `npm run build` for deployment to GitHub Pages.
- The main application component is `src/App.jsx` (large, single-file component with all sections inline).
