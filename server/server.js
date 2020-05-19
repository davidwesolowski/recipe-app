import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user';
import recipeRouter from './routes/recipe';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
require('./connect');

app.use(express.static(path.join(__dirname, '../public')));
app.use(userRouter);
app.use(recipeRouter);

app.get('*', (req, res) => {
	return res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {});
