import { ErrorRequestHandler } from 'express';
import CustomError from '../utils/StatusError';

const errorMiddleware: ErrorRequestHandler = (
  err: CustomError & Error,
  _req,
  res,
  _next,
) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
};

export default errorMiddleware;
