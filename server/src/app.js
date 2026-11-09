import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import apiRoutes from './routes/index.js';

const app = express();

// Needed so rate limiting sees the real client IP behind Render/Railway/Vercel proxies.
app.set('trust proxy', 1);

app.use(helmet());
app.use(cors({ origin: env.clientUrls }));
app.use(express.json({ limit: '100kb' }));
if (env.nodeEnv !== 'production') app.use(morgan('dev'));

app.use('/api', apiRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
