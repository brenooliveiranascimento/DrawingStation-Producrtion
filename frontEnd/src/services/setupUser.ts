/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseCookies } from 'nookies';
import axios from 'axios';

export const setupUser = (ctx: any) => {
  const cookies = parseCookies(ctx);
  const api = axios.create({
    baseURL: 'http://localhost:3001',
    // baseURL: 'https://backend-production-8de5.up.railway.app/',
    headers: {
      Authorization: `${cookies['DRAWING_USER_DATA']}`
    }
  });
  return api;
};

export const serverSideSetupUser = (ctx: any) => {
  const cookies = parseCookies(ctx);
  const api = axios.create({
    baseURL: 'http://drawingstation_backend:3001',
    // baseURL: 'https://backend-production-8de5.up.railway.app/',
    headers: {
      Authorization: `${cookies['DRAWING_USER_DATA']}`
    }
  });
  return api;
};
