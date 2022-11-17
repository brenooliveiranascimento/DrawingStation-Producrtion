import axios from 'axios';

const apiConnection = axios.create({
  baseURL: 'https://backend-production-8de5.up.railway.app/',
});

export default apiConnection;