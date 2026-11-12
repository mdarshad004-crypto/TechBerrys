import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { whatsappApiPlugin } from './server/vite-plugin.js';

export default defineConfig({
  plugins: [react(), whatsappApiPlugin()],
});
