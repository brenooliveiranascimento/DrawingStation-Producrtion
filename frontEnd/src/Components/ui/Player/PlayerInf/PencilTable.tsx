import React, { useState } from 'react';

interface PencilTableProp {
  currColorList: { cor: string }[],
  currColor: string
}

export default function PencilTable({ currColorList, currColor }: PencilTableProp) {
  const [show, setShow] = useState(true);
  if(!show) return (
    <section>
      <button onClick={() => setShow(!show)}>
        {currColor}
      </button> 
    </section>
  );
  return (
    <section>
      {
        currColorList.map(({cor}: {cor: string}, index) => {
          return (
            <section key={index}>
              { !index &&
              <section>
                <button onClick={() => setShow(!show)}>
                  {currColor}
                </button> 
              </section>
              }
              <span>{cor}</span>
            </section>
          );
        })
      }
    </section>
  );
}
