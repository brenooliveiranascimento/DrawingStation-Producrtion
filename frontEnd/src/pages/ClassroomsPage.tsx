import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../interfaces/modules/globalStateInterface';
import { requestSubModulesAction } from '../redux/actions/subModuleActions/subModuleActions';

export default function ClassroomsPage() {
  const { subModules } = useSelector(({ subModules }: globalState) => subModules);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestSubModulesAction());
    console.log(subModules);    
  }, []);

  return (
    <div>ClassroomsPage</div>
  );
}
