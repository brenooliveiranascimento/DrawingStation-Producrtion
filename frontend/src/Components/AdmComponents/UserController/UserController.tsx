import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import { getAllUsersAction } from '../../../redux/actions/userActions/userActions';

function UserController() {
  const dispatch = useDispatch();

  const requestAllUSers = () => {
    dispatch(getAllUsersAction());
  };

  useEffect(() => {
    requestAllUSers();
  }, []);
  return (
    <section className={styles.user_controller_container}>
    </section>
  );
}

export default UserController;
