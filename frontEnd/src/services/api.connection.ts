import axios from 'axios';

export const apiConnection = axios.create({
  baseURL: 'http://localhost:3001',
  // baseURL: 'https://backend-production-8de5.up.railway.app/',
});

export const serverSideConnection = axios.create({
  baseURL: 'http://drawingstation_backend:3001',
  // baseURL: 'https://backend-production-8de5.up.railway.app/',
});
