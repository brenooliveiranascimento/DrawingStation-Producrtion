import React from 'react';
import { useSelector } from 'react-redux';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';

export default function Colors() {

  const {
    classroomController: { classroom: { multiExemple, colors } },
  } = useSelector((state: globalState) => state);

  if(!colors) {
    return <h1>Materiais em breve</h1>;
  }

  return (
    <aside>
      {
        multiExemple ?
          (
            <section>
              {Object.keys(JSON.parse(colors)).map((currColor: string) => {
                const allColors: any = JSON.parse(colors);
                const currColorList = allColors[currColor];
                return currColorList.map((currPencil: { cor: string }, index: number) => (
                  <h1 key={index}>{currPencil.cor}</h1>
                ));
              })
              }
            </section>
          )
          : 
          (
            <section>
              {JSON.parse(colors).map((currColor: { cor: string }, index: number) => (
                <section key={index}>
                  { currColor.cor }
                </section>
              ))}
            </section>
          )
      }
    </aside>
  );
}
