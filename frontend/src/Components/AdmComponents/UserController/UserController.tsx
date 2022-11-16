import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAction } from '../../../redux/actions/userActions/userActions';
import { globalState } from '../../../interfaces/modules/globalStateInterface';

function UserController() {
  const dispatch = useDispatch();
  const { usersControllData } = useSelector((state: globalState) => state.user);

  const requestAllUSers = () => {
    dispatch(getAllUsersAction());
  };

  useEffect(() => {
    requestAllUSers();
  }, []);
  return (
    <section className={styles.user_controller_container}>
      <table>
        <thead>
          <td>Name</td>
          <td>Email</td>
          <td>Phone-number</td>
          <td>Status</td>
          <td>IsPremium</td>
          <td>login Type</td>
        </thead>
        <tbody>
          {
            usersControllData.map((currUser: any) => {
              console.log(currUser);
              return (
                <tr key={currUser.id}>
                  <td>{currUser.name}</td>
                  <td>{currUser.email}</td>
                  <td>{currUser.phoneNumber || 'No defined'}</td>
                  <td>{currUser.active ? 'Active' : 'Inative'}</td>
                  <td>{currUser.premium ? 'Premim!' : 'Default'}</td>
                  <td>{currUser.loginType}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </section>
  );
}

export default UserController;
