/// <reference types="node" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// Base is scoped to the repo name so builds work under GitHub Pages
// (https://<user>.github.io/pocket-guides/). It can be overridden via
// the GITHUB_PAGES_BASE env var when building for a different host.
// The `configure-pages` action outputs `base_path` without a trailing
// slash (e.g. `/pocket-guides`), so we normalize it here to always end
// with "/" — otherwise Vite inlines BASE_URL without the slash and

// asset paths like `${BASE_URL}favicon.svg` resolve incorrectly.
const rawBase = process.env.GITHUB_PAGES_BASE ?? '/pocket-guides/';
const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
