import express from 'express';
import vendors from './vendors.js';

const app = express();
app.use(express.json());

app.use('/vendors', vendors);

app.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log('API server listening on port 4000');
});

export default app;
