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
      <article>
        <h1>User List</h1>
        <span>
          {usersControllData.length} Users
        </span>
      </article>

      <table>
        <thead>
          <th>Name</th>
          <th>Email</th>
          <th>Phone-number</th>
          <th>Status</th>
          <th>IsPremium</th>
          <th>login Type</th>
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
                  <section className={styles.action_button_container}>
                    <button>
                      {currUser.premium ? 'Remove Premium' : 'Active premium'}
                    </button>
                    <button>
                    Enviar Email
                    </button>
                  </section>
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
