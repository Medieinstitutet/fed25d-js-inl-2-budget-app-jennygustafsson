import { defineConfig } from 'vite';

const repositoryName = 'fed25d-js--inl-2-budget-app-jennygustafsson';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' 
    ? `/${repositoryName}/` 
    : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
