import axios from 'axios';
import 'dotenv';

export const api = axios.create({
  baseURL: process.env.APICONNECTION
});
