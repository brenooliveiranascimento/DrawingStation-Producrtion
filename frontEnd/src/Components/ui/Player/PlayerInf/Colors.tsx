import React from 'react';
import { useSelector } from 'react-redux';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import styles from './styles.module.scss';

export default function Colors() {

  const {
    classroomController: { classroom: { multiExemple, colors } },
  } = useSelector((state: globalState) => state);

  if(!colors) {
    return <h1>Materiais em breve</h1>;
  }

  return (
    <aside >
      {
        multiExemple ?
          (
            <section style={{display: 'flex'}}>
              {Object.keys(JSON.parse(colors)).map((currColor: string, index: number) => {
                const allColors: any = JSON.parse(colors);
                const currColorList = allColors[currColor];
                return (
                  <section key={index}>
                    <h1>{currColor}</h1>
                    {currColorList.map(({cor}: {cor: string}, pencilIndex: number) => {
                      return (
                        <section key={pencilIndex}>
                          <span>{cor}</span>
                        </section>
                      );
                    })}
                  </section>
                );
              })
              }
            </section>
          )
          : 
          (
            <section>
              {JSON.parse(colors).map((currColor: { cor: string }, index: number) => (
                <section key={index}>
                  <span>
                    { currColor.cor }
                  </span>
                </section>
              ))}
            </section>
          )
      }
    </aside>
  );
}
