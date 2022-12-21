import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserHeader from '../../Components/ui/HomePage/Header/UserHeader';
import { globalState } from '../../interfaces/modules/globalStateInterface';
import { SubModuleInterface } from '../../interfaces/modules/ModulesInterface';
import { serverSideSetupUser } from '../../services/setupUser';
import { canSSRAuth } from '../../utils/canSSRAuth';
import styles from './styles.module.scss';
import { UserInterface } from '../../interfaces/UserInterfaces';
import { AutenticationSuccess } from '../../redux/actions/autenticationActions/autenticationGenericActions';
import { requestClassroomAction } from '../../redux/actions/classroomActions/classroomActions';
import { requestSubModulesAction } from '../../redux/actions/subModuleActions/subModuleActions';
import CurrSideBar from '../../Components/ui/CurrSideBar/CurrSideBar';

interface classroomPropTypes {
  userData: UserInterface,
}
export default function ClassroomsPage({ userData }: classroomPropTypes) {
  const { subModules, currSubModule } = useSelector(({ subModules }: globalState) => subModules);
  const [moduleData, setModuleData] = useState([]);

  const dispatch = useDispatch();

  const initData = async () => {
    await dispatch(AutenticationSuccess(userData));
    await dispatch(requestSubModulesAction());
    await dispatch(requestClassroomAction());
    const currSubModules = subModules.filter((currSubModuleInt: SubModuleInterface) =>
      currSubModuleInt.moduleId === Number(currSubModule));
    setModuleData(currSubModules);
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <section className={styles.dashboard_container}>
      <CurrSideBar />
      <section className={styles.main_container}>
        <UserHeader/>
        {
          moduleData && moduleData.map((currModule: SubModuleInterface) => {
            console.log(currModule);
            return <h1 key={currModule.id}>{currModule.name}</h1>;
          })
        }
      </section>
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
