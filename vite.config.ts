/// <reference types="node" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// Base is scoped to the repo name so builds work under GitHub Pages
// (https://<user>.github.io/pocket-guides/). It can be overridden via
// the GITHUB_PAGES_BASE env var when building for a different host.
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES_BASE ?? '/pocket-guides/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
