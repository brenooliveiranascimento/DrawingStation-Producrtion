import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../interfaces/modules/globalStateInterface';
import { SubModuleInterface } from '../interfaces/modules/ModulesInterface';
import { requestSubModulesAction } from '../redux/actions/subModuleActions/subModuleActions';

export default function ClassroomsPage() {
  const { subModules, currSubModule } = useSelector(({ subModules }: globalState) => subModules);
  const [moduleData, setModuleData] = useState([]);
  const dispatch = useDispatch();

  const getSubmodules = async () => {
    dispatch(requestSubModulesAction());
  };

  const initComponent = async () => {
    await getSubmodules();
  };

  useEffect(() => {
    initComponent();
  }, []);

  useEffect(() => {
    setModuleData(subModules.filter((currSubModuleInt: SubModuleInterface) => {
      console.log(currSubModule);
      return currSubModuleInt.moduleId === Number(currSubModule);
    }));
  }, [subModules]);

  return (
    <section>
      {
        moduleData && moduleData.map((currModule: SubModuleInterface) => {
          console.log(currModule);
          return <h1 key={currModule.id}>{currModule.name}</h1>;
        })
      }
    </section>
  );
}
