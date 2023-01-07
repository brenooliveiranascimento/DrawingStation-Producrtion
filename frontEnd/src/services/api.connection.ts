import axios from 'axios';
const key = process.env.NEXT_API_URL as string;

export const apiConnection = axios.create({
  baseURL: 'https://drawingstation-backend-production-5574.up.railway.app/',
  // baseURL: 'http://localhost:3001',
});

export const serverSideConnection = axios.create({
  baseURL: 'https://drawingstation-backend-production-5574.up.railway.app/',
  // baseURL: 'http://localhost:3001',
});
