import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { ClassroomInterface } from '../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';

export default function SearchClass() {

  const {
    classroomController: { classroom },
    subModules: { subModules },
  } = useSelector((state: globalState) => state);

  const [classrooms, setClassrooms] = useState<ClassroomInterface[]>([]);
  const [className, setClassName] = useState('');

  const searchClassrooms = () => {
    const getClass = subModules.reduce((
      acc: ClassroomInterface[], currValue: SubModuleInterface) => {
      acc = [...acc, ...currValue.classrooms];
      return acc;
    }, []).filter((currClass: ClassroomInterface) => {
      return currClass.name.includes(className);
    });
    console.log(getClass);
    setClassrooms(getClass);
  };

  useEffect(() => {
    searchClassrooms();
  }, [className]);

  return (
    <div
      style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
    >
      <input
        value={className}
        onChange={({target}) => setClassName(target.value)}
        placeholder='Procurar Aula'
      />
      <FaSearch color='#blue'/>
    </div>
  );
}
