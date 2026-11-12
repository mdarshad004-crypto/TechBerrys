import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createEnquiriesApp, initializeEnquiryDatabase, startEmailWorker } from './enquiries.js';
import { configureTrustedProxy } from './whatsapp.js';

const app = express();
const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const distDirectory = path.resolve(currentDirectory, '../dist');

app.disable('x-powered-by');
configureTrustedProxy(app);
const enquiryApi = createEnquiriesApp();
await initializeEnquiryDatabase();
startEmailWorker();
app.use('/api', enquiryApi);
app.use(express.static(distDirectory, { index: false, maxAge: '1h' }));
app.get('*path', (_req, res, next) => {
  res.sendFile(path.join(distDirectory, 'index.html'), (error) => {
    if (error) next(error);
  });
});
app.use((error, _req, res, _next) => {
  console.error('HTTP server error:', error.message);
  if (res.headersSent) return;
  res.status(error.status === 413 ? 413 : 500).json({
    error: error.status === 413 ? 'The submitted enquiry is too large.' : 'The request could not be processed.',
  });
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`TechBerry server listening on port ${port}`);
});
