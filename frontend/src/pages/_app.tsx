import React from 'react';
import '../../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../redux/store/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
function MyApp({ Component, pageProps }:AppProps) {
  return (
    <GoogleOAuthProvider clientId="412044259193-itsi18in293tcmigj5oelkm4h22s5irq.apps.googleusercontent.com">
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      <ToastContainer autoClose={3000} />
    </GoogleOAuthProvider>
  ); 
}

export default MyApp;
