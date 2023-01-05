import axios from 'axios';

export const apiConnection = axios.create({
  baseURL: 'http://localhost:3001',
});

export const serverSideConnection = axios.create({
  baseURL: 'http://localhost:3001',
});
