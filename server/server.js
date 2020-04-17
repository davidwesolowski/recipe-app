import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user';
import recipeRouter from './routes/recipe';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./connect');

app.use(userRouter);
app.use(recipeRouter);

app.listen(port, () => console.log('Server up and running ' + port));
