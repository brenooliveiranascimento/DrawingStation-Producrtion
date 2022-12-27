import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import PencilTable from './PencilTable';
import styles from './styles.module.scss';

export default function Colors() {


  const {
    classroomController: { classroom: { multiExemple, colors } },
  } = useSelector((state: globalState) => state);

  if(!colors) {
    return <h1>Materiais em breve</h1>;
  }

  return (
    <aside className={styles.one_pencil_container}>
      {
        multiExemple ?
          (
            <section style={{ display: 'flex', marginLeft: '1rem'}}>
              {Object.keys(JSON.parse(colors)).map((currColor: string, index: number) => {
                const allColors: any = JSON.parse(colors);
                const currColorList = allColors[currColor];
                return (
                  <PencilTable key={index} currColorList={currColorList} currColor={currColor} />
                );
              })
              }
            </section>
          )
          : 
          (
            <section style={{ display: 'flex', flexDirection: 'column' }} >
              <h1>Cores</h1>
              {JSON.parse(colors).map((currColor: { cor: string }, index: number) => (
                <span key={index}>#{index + 1} {currColor.cor}</span>
              ))}
            </section>
          )
      }
    </aside>
  );
}
