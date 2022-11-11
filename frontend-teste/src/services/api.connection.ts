import axios from 'axios';

const apiConnection = axios.create({
  baseURL: 'http://localhost:8000',
  // baseURL: 'https://solid-page-production.up.railway.app/',
});

export default apiConnection
