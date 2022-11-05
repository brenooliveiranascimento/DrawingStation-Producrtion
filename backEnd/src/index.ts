import express, { NextFunction, Request, Response,  } from 'express';
import 'express-async-errors';
import { errorMiddleware } from './middlewares/error.middleware';
import 'dotenv/config';
const app = express();

app.use(express.json());

const PORT = process.env.BD_PORT;

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`)
})
