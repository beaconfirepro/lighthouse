import express from 'express';
import projects from './projects.js';

const app = express();
app.use(express.json());
app.use('/projects', projects);

export default app;
