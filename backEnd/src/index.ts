import cors from 'cors'
import 'express-async-errors';
import express from 'express';
import moduleRoutes from './routes/module.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import commentsRouter from './routes/comments.routes';
import subCommentRouter from './routes/subComments.routes';
import subscriptionRoutes from './routes/subscription.routes';
import webhooksRoutes from './routes/WebHook.routes';

import 'dotenv/config';
import errorMiddleware from './middlewares/errorMiddleware';
const app = express();
app.use(cors())

app.use((req, res, next) => {
  if(req.originalUrl === '/webhook') {
    next();
  }else {
    express.json()(req, res, next);
  }
});
// app.use(express.json());

const PORT = process.env.PORT;
app.use('/webhook', webhooksRoutes);
app.use('/modules', moduleRoutes)
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/comments', commentsRouter);
app.use('/subComments', subCommentRouter);
app.use('/subscription', subscriptionRoutes);
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`)
})
