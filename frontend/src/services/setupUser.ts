import { parseCookies } from 'nookies';
import axios from 'axios';

export const setupUser = (ctx: any) => {
  const cookies = parseCookies(ctx);
  const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
      Authorization: `${cookies['DRAWING_USER_DATA']}`
    }
  });
  return api;
};
