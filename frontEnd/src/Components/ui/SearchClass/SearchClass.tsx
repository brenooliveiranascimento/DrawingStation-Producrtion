import React from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchClass() {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
    >
      <input placeholder='Procurar Aula'/>
      <FaSearch color='#blue'/>
    </div>
  );
}
