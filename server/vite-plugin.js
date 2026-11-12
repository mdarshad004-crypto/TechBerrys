import { createEnquiriesApp } from './enquiries.js';

export function whatsappApiPlugin() {
  return {
    name: 'techberry-whatsapp-api',
    configureServer(server) {
      server.middlewares.use('/api', createEnquiriesApp());
    },
  };
}
