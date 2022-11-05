import 'express-async-errors';
import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import moduleRouter from './routes/module.routes';

import 'dotenv/config';
const app = express();

app.use(express.json());

const PORT = process.env.BD_PORT;
app.use('/modules', moduleRouter)
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`)
})
