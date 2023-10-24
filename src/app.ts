import express from 'express';
import router from './routes/stmRoutes.js';
import cors from 'cors';

const app = express();
const basePath = '/api/v1';

router.use(cors());

router.use((req, res) => {
    return res.status(404).json({
        error: 'Not Found',
    });
});

app.use(basePath, router);

export default app;
