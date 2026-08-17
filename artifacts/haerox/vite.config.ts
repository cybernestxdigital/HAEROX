import path from 'path';
import { globSync } from 'node:fs';
import { defineConfig } from 'vite';

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    'PORT environment variable is required but was not provided.',
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH || '/';

// Static multi-page site: every root-level .html file is a build entry.
const htmlInputs = Object.fromEntries(
  globSync('*.html', { cwd: import.meta.dirname }).map((file) => [
    file.replace(/\.html$/, ''),
    path.resolve(import.meta.dirname, file),
  ]),
);

export default defineConfig({
  // Relative base so the built files work when uploaded directly to any
  // static host (e.g. Hostinger public_html) as well as behind the dev proxy.
  base: process.env.NODE_ENV === 'production' ? './' : basePath,
  plugins: [
    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-dev-banner').then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
    rollupOptions: {
      input: htmlInputs,
    },
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
