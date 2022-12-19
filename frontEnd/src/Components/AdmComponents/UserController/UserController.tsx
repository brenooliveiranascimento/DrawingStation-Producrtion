import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAction } from '../../../redux/actions/userActions/userActions';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { apiConnection } from '../../../services/api.connection';
import { UserInterface } from '../../../interfaces/UserInterfaces';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import { Input } from '../../ui/Inputs/Inputs';

function UserController() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: globalState) => state.user);
  const [editPremium, setEditPremium] = useState(false);
  const [identity, setIdentity] = useState('');
  const { usersControllData } = useSelector((state: globalState) => state.user);
  const cookies = parseCookies();
  const [currUser, setCurrUser] = useState({
    userId: 0,
    userStateus: false
  });

  const handlePremium = async (id: number, isPremium: boolean) => {
    if(!editPremium) {
      setCurrUser({
        userId: id,
        userStateus: isPremium
      });
      setEditPremium(true);
      return;
    }
    const token = cookies['DRAWING_USER_DATA'];
    try {
      await apiConnection.post(`/users/${currUser.userStateus ? 'removePremium' : 'goPremium'}/${currUser.userId}`,
        { identity, admEmail: userData.email },
        { headers: { 'Authorization': token } });
      toast.success('Status do usuário alterado com sucesso!!');
      setCurrUser({
        userId: 0,
        userStateus: false
      });
      setIdentity('');
      setEditPremium(false);
    } catch(e: any) {
      setIdentity('');
      toast.error(e.response.data.message);
      setEditPremium(false);
    }
  };

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
        { editPremium &&
        <section>
          <Input
            value={identity}
            type={'password'}
            onChange={({target}) => setIdentity(target.value)}
          />
          <button onClick={() => handlePremium(0, false)}>
            Confirmar!
          </button>
        </section>
        }
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
            usersControllData.map((currUser: UserInterface) => {
              return (
                <tr key={currUser.id}>
                  <td>{currUser.name}</td>
                  <td>{currUser.email}</td>
                  <td>{currUser.phoneNumber || 'No defined'}</td>
                  <td>{currUser.active ? 'Active' : 'Inative'}</td>
                  <td>{currUser.premium ? 'Premim!' : 'Default'}</td>
                  <td>{currUser.loginType}</td>
                  <section className={styles.action_button_container}>
                    <button onClick={() => handlePremium(currUser.id, currUser.premium)}>
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
