import React from 'react';
import Head from 'next/head';
import syles from './styles.module.scss';

function Dashboad() {
  return (
    <>
      <Head>
        <title>Dashboad</title>
      </Head>
      <section className={syles.dashboard_container}>
        <h1>Dashboard</h1>
      </section>
    </>
  );
}

export default Dashboad;
