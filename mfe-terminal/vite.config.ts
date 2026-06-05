import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mfe_terminal',
      filename: 'remoteEntry.js',
      exposes: {
        './ObservabilityTerminal': './src/components/ObservabilityTerminal.tsx',
      },
      shared: ['react', 'react-dom']
    })
  ],
  server: {
    port: 5174,
    cors: true
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
});
