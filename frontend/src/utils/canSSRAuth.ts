/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies, destroyCookie } from 'nookies';
import apiConnection from '../services/api.connection';

export function canSSRAuth<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>){
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);  

    const token = cookies['DRAWING_USER_DATA'];

    if(!token){
      return{
        redirect:{
          destination: '/',
          permanent: false,
        }
      };
    }

    try{
      const { data } = await apiConnection.post('/auth/me', null, {
        headers: {
          'Authorization': token
        }
      });
      return await fn(ctx);
    }catch(err){
      destroyCookie(ctx, 'DRAWING_USER_DATA');

      return{
        redirect:{
          destination: '/',
          permanent: false
        }
      };
    }
  };

}