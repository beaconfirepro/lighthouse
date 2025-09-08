import express from 'express';
import ops from './ops.js';

const app = express();

app.use('/', ops);

export default app;
