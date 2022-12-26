import React, { useState } from 'react';
import styles from './styles.module.scss';

interface PencilTableProp {
  currColorList: { cor: string }[],
  currColor: string | null
}

export default function PencilTable({ currColorList, currColor }: PencilTableProp) {

  return (
    <section className={styles.pencil_item}>
      <h1>
        {currColor}
      </h1> 
      {
        currColorList.map(({cor}: {cor: string}, index) => {
          return (
            <section key={index}>
              <span>#{index + 1}{cor}</span>
            </section>
          );
        })
      }
    </section>
  );
}
