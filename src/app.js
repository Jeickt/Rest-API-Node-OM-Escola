import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import './database/connection';
import { resolve } from 'path';
import homeRoutes from './routes/homeRoutes';
import photoRoutes from './routes/photoRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import studentRoutes from './routes/studentRoutes';

const securedUrlList = [process.env.APP_URL_FRONTEND, process.env.APP_URL_FRONTEND_DEV];

const corsOptions = {
  origin: (origin, cb) => {
    console.log(`${process.env.APP_URL_FRONTEND_DEV} ${securedUrlList.indexOf(origin) !== -1}`);
    if (!origin || securedUrlList.indexOf(origin) !== -1) cb(null, true);
    else cb(new Error('Não permitido por CORS'));
  },
};

dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(resolve(__dirname, 'uploads')));

// app.use(middleware);
app.use(homeRoutes);
app.use(photoRoutes);
app.use(userRoutes);
app.use(tokenRoutes);
app.use(studentRoutes);

export default app;
