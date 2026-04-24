---
name: lint
description: Guides formatting, linting, and type-checking decisions for the Pocket Guides React/TypeScript codebase. Invoke whenever writing or modifying TypeScript/TSX source to keep Prettier, ESLint, and `tsc` green.
---

# Lint Skill — Pocket Guides

Use this skill whenever you add or modify TypeScript/TSX source files, or touch
project config. The repository enforces formatting, linting, and type-checking
in CI — your PR will fail unless all three pass.

---

## The Three Checks

| Command                | What it does                                             |
| ---------------------- | -------------------------------------------------------- |
| `npm run format:check` | Runs Prettier in check mode (no edits)                   |
| `npm run lint`         | Runs ESLint (TypeScript + React + hooks + refresh rules) |
| `npm run typecheck`    | Runs `tsc -b --noEmit`                                   |

All three are bundled as `npm run check`. CI (`.github/workflows/ci.yml`) runs
them on every pull request to `main` and on every push to `main`.

## What to do while writing code

1. Run `npm run format` (auto-fix) and `npm run lint:fix` as you work — they
   resolve most style and simple lint issues automatically.
2. Keep TypeScript strict: no `any`, no `// @ts-ignore`, unused-parameter names
   prefixed with `_` when they must be kept in a signature.
3. React rules: component files are TSX, each default-exports a single
   component, hooks are called at the top of function components only
   (`react-hooks/rules-of-hooks`), and the exhaustive-deps rule must not be
   suppressed without a comment explaining why.
4. Imports: prefer named imports, use path-relative imports (no path aliases
   are configured), and keep external imports above internal ones.

## What to do before calling the task done

Run the **lint agent** (`.github/agents/lint.md`) as the last step of your
task. The agent:

1. Runs `npm run format:check`, `npm run lint`, and `npm run typecheck`.
2. If any fail, it applies fixes (`npm run format`, `npm run lint:fix`) and
   re-runs the checks.
3. Returns a short report listing the final status of each check and any
   remaining issues that require human attention.

Never mark a task complete without a green lint agent report.

## Prettier config summary

`.prettierrc.json`:

```json
{
  "singleQuote": true,
  "semi": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always"
}
```

- Two-space indentation everywhere
- Single-quoted strings in JS/TS; double quotes in JSX are OK when Prettier
  prefers them
- Semicolons required
- Trailing commas everywhere ES5+ supports them
- 100-character line length

## ESLint config summary

`.eslintrc.cjs` extends:

- `eslint:recommended`
- `@typescript-eslint/recommended`
- `react/recommended` + `react/jsx-runtime` (no `import React` needed)
- `react-hooks/recommended`
- `prettier` (disables style rules that conflict with Prettier)

Custom rules:

- `react-refresh/only-export-components` (warn) — component files should not
  mix non-component exports.
- `@typescript-eslint/no-unused-vars` with `argsIgnorePattern: ^_`.

## Common pitfalls

- **Hash-router-style comments inside JSX text** — `// GAMES` as a direct
  child of an element triggers `react/jsx-no-comment-textnodes`. Wrap
  literal-looking text in braces (`{'// GAMES'}`) or in a string element.
- **Unused React imports** — this repo uses `jsx-runtime`; don't
  `import React`.
- **Unescaped entities in JSX** — use HTML entities (`&amp;`) or JS strings
  for ampersands / quotes inside children.
