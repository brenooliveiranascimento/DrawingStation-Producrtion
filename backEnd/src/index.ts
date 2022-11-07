import cors from 'cors'
import 'express-async-errors';
import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import moduleRoutes from './routes/module.routes';
import authRoutes from './routes/auth.routes';

import 'dotenv/config';
const app = express();
app.use(cors())

app.use(express.json());

const PORT = process.env.BD_PORT;
app.use('/modules', moduleRoutes)
app.use('/auth', authRoutes);
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`)
})
