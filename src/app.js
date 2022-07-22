import express from 'express';
import dotenv from 'dotenv';
import './database/connection';
import { resolve } from 'path';
import homeRoutes from './routes/homeRoutes';
import photoRoutes from './routes/photoRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import studentRoutes from './routes/studentRoutes';

dotenv.config();

const app = express();

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
