/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseCookies } from 'nookies';
import axios from 'axios';

export const setupUser = (ctx: any) => {
  const cookies = parseCookies(ctx);
  const api = axios.create({
    baseURL: 'https://drawingstation-backend-production-5574.up.railway.app/',
    headers: {
      Authorization: `${cookies['DRAWING_USER_DATA']}`
    }
  });
  return api;
};

export const serverSideSetupUser = (ctx: any) => {
  const cookies = parseCookies(ctx);
  const api = axios.create({
    baseURL: 'https://drawingstation-backend-production-5574.up.railway.app/',
    headers: {
      Authorization: `${cookies['DRAWING_USER_DATA']}`
    }
  });
  return api;
};
