import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { ClassroomInterface } from '../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { ModulesInterface, SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';
import { selectClassroomAction, selectSubModuleAction } from '../../../redux/actions/classroomControllerActions/ClassroomControllerAciton';
import { selectCurrSubModule } from '../../../redux/actions/classroomControllerActions/genericActions';
import { handleScreen } from '../../../redux/actions/genericActions';
import styles from './styles.module.scss';

interface ISearchCard {
  classroom: ClassroomInterface;
}

export default function SearchCard({ classroom }: ISearchCard) {
  const { id, name, premium, image, conclude, subModuleId } = classroom;
  const { modules: { modules } } = useSelector((state:globalState) => state);
  const dispatch = useDispatch();
  const router = useRouter();

  const findSubModules = () => {
    return subModules.find((currSubmodule: SubModuleInterface) =>
      currSubmodule.id === subModuleId );
  };

  const findClass = () => {
    const currSub = subModules.find((currSubmodule: SubModuleInterface) =>
      currSubmodule.id === subModuleId );
    const currClassData = currSub.classrooms.find((currClass: ClassroomInterface) => {
      return currClass.id === id;
    });
    console.log(currClassData);
    return currClassData;
  };

  const selectModule = (moduleInfo: ModulesInterface) => {
    dispatch(selectSubModuleAction(moduleInfo));
    dispatch(handleScreen('Classroom'));
    router.push('/Classroom');
  };


  const selectClass = (classInfos: ClassroomInterface) => {
    dispatch(selectClassroomAction(classInfos));
  };

  const selectSubModule = () => {
    const findCurrModule = modules.find((currModule: ModulesInterface) => currModule.id === findSubModules().moduleId);
    selectModule(findCurrModule);
    dispatch(selectCurrSubModule({ name: findSubModules().name, id: findSubModules().id }));
    selectClass(findClass());
  };

  const {
    subModules: { subModules },
    user: { userData }
  } = useSelector((state: globalState) => state);

  const findSubModule = (): SubModuleInterface =>
    subModules.find((currSubModule: SubModuleInterface) => currSubModule.id === subModuleId);

  return (
    <section onClick={selectSubModule}>
      <aside className={styles.inf_area}>
        <Image
          src={image}
          width={100}
          style={{objectFit: 'cover',  filter: 'brightness(90%)'}}
          height={100}
          alt={name}
        />
        <div
          className={styles.player}
        >
          <FaPlayCircle
            color='color'
            size={30}
          />
        </div>
        <article>

          <h1>{name}</h1>
          <span>
            {findSubModule().name}
          </span>
          { premium && !userData.premium && ( <p> Conteúdo premium! </p> )}        
        </article>
      </aside>
      <aside
      >
      </aside>
    </section>
  );
}
