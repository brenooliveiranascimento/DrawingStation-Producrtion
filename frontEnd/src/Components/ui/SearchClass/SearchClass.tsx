import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { ClassroomInterface } from '../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../interfaces/modules/globalStateInterface';

export default function SearchClass() {

  const {
    classroomController: { classroom, subModules },
  } = useSelector((state: globalState) => state);

  const [classrooms, setClassrooms] = useState<ClassroomInterface[]>([]);

  const searchClassrooms = () => {
  };

  return (
    <div
      style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
    >
      <input placeholder='Procurar Aula'/>
      <FaSearch color='#blue'/>
    </div>
  );
}
