import axios from 'axios';

const apiConnection = axios.create({
  baseURL: 'http://localhost:3001',
  // baseURL: 'https://solid-page-production.up.railway.app/',
});

export default apiConnection;