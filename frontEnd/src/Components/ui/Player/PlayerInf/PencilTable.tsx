import React from 'react';

interface PencilTableProp {
  currColorList: { cor: string }[]
}

export default function PencilTable({ currColorList }: PencilTableProp) {
  return (
    <section>
      {
        currColorList.map(({cor}: {cor: string}, index) => {
          return (
            <section key={index}>
              <span>{cor}</span>
            </section>
          );
        })
      }
    </section>
  );
}
