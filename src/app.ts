import express from 'express';
import router from './routes/stmRoutes.js';
import cors from 'cors';

const app = express();
const basePath = '/api/v1';

app.use(cors());

app.use(basePath, router);

export default app;
