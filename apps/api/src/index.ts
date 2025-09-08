import express from 'express';
import ahj from './ahj.js';

const app = express();
app.use(express.json());
app.use('/ahj', ahj);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});

export default app;
