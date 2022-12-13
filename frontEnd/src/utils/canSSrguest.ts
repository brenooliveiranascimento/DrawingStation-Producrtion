/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies } from 'nookies';

export function canSSRGuest<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    if(cookies['DRAWING_USER_DATA']){
      return {
        redirect:{
          destination: '/dashboard',
          permanent: false,
        }
      };
    }

    return await fn(ctx);
  };

}