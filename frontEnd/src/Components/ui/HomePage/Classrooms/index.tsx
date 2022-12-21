import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import { SubModuleInterface } from '../../../../interfaces/modules/ModulesInterface';
import { requestClassroomAction } from '../../../../redux/actions/classroomActions/classroomActions';
import { requestSubModulesAction } from '../../../../redux/actions/subModuleActions/subModuleActions';
import { serverSideSetupUser } from '../../../../services/setupUser';
import { canSSRAuth } from '../../../../utils/canSSRAuth';

export default function ClassroomsPage() {
  const { subModules, currSubModule } = useSelector(({ subModules }: globalState) => subModules);
  const [moduleData, setModuleData] = useState([]);

  useEffect(() => {
    setModuleData(subModules
      .filter((currSubModuleInt: SubModuleInterface) =>
        currSubModuleInt.moduleId === Number(currSubModule)));
  }, []);

  return (
    <section>
      {
        moduleData && moduleData.map((currModule: SubModuleInterface) => {
          return <h1 key={currModule.id}>{currModule.name}</h1>;
        })
      }
    </section>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const userConncetion = serverSideSetupUser(ctx);

  const { data } = await userConncetion.post('/auth/me');
  const { id, name, email, profilePhoto, birthday, phoneNumber, premium, stripeClientId } = data.message;
  return {
    props: {
      userData: { id, name, email, profilePhoto, birthday, phoneNumber, premium, stripeClientId },
    }
  };

});