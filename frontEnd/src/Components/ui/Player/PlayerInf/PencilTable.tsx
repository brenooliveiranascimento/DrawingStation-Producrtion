import React, { useState } from 'react';
import styles from './styles.module.scss';

interface PencilTableProp {
  currColorList: { cor: string }[],
  currColor: string | null
}

export default function PencilTable({ currColorList, currColor }: PencilTableProp) {
  const [show, setShow] = useState(true);
  if(!show) return (
    <section>
      { currColor &&
              <section>
                <button onClick={() => setShow(!show)}>
                  {currColor}
                </button> 
              </section>
      }
    </section>
  );
  return (
    <section className={styles.pencil_item}>
      <h1 onClick={() => setShow(!show)}>
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
