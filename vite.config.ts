/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    coverage: {
      all: false,
      exclude: [
        'src/test/**',
        '**/types/**',
        '**/*.d.ts',
        'src/**/index.ts',
        'src/main.tsx',
      ],
      extension: ['.ts', '.tsx'],
      include: ['src/**/*'],
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 80,
        functions: 70,
        branches: 60,
      },
    },
    typecheck: {
      enabled: true,
      include: ['**/*.test-d.ts'],
    },
    css: {
      modules: { classNameStrategy: 'non-scoped' },
    },
    exclude: ['**/node_modules/**', '**/e2e/**'],
    include: ['**/*.{test,spec}.{ts,tsx}'],
    environment: 'jsdom',
    globals: true,
    maxConcurrency: 4,
    setupFiles: ['./src/test/setupTests.ts'],
    cache: { dir: './.vitest-cache' },
  },
});
