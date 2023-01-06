import axios from 'axios';

export const apiConnection = axios.create({
  baseURL: 'https://drawingstation-backend-production-5574.up.railway.app/',
  // baseURL: 'http://localhost:3001',
});

export const serverSideConnection = axios.create({
  baseURL: 'https://drawingstation-backend-production-5574.up.railway.app/',
  // baseURL: 'http://localhost:3001',
});
