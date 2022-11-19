import axios from 'axios';

const apiConnection = axios.create({
  // baseURL: 'http://localhost:3001',
  baseURL: 'https://backend-production-8de5.up.railway.app/',
});

export default apiConnection;