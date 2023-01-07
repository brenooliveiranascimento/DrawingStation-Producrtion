import React, { useEffect, useState } from 'react';
import { FaClosedCaptioning, FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { ClassroomInterface } from '../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';
import SearchCard from './SearchCard';
import styles from './styles.module.scss';
export default function SearchClass() {

  const {
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
      return currClass.name.toLowerCase().includes(className);
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
        onChange={({target}) => setClassName(target.value.toLowerCase())}
        placeholder='Procurar Aula'
      />
      {
        className.length ? <button
          style={{
            marginLeft: '-1.5rem',
            color: 'white',
            fontWeight: 600
          }}
          onClick={() => setClassName('')}>X</button> : <FaSearch />
      }
      {
        <article
          style={{
            height: className.length ? 'auto' : 0,
            border: className.length && classrooms.length ? '1px solid #425d67' : 'none'
          }}
          className={styles.card_container}
        > 
          {
            className.length && classrooms.length ? classrooms
              .map((currClass: ClassroomInterface) =>
                <SearchCard classroom={currClass} key={currClass.id} />) : <h1></h1>
          }
        </article>
      }
    </div>
  );
}
