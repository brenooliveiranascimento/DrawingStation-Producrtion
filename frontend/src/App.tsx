import React, { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './App.css'
import apiConnection from './services/api.connection';

function App() {
  const [email, setEmail] = useState<any>('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const sigin = async () => {
    try {
      const { data } = await apiConnection.post('/auth/login', {
        email,
        password
      }
      )
      console.log(data)
      return data
    } catch(e: any) {
      console.log(e.response.data)
    }
  }

  const register = async () => {
    try {
      const { data } = await apiConnection.post('/auth/register', {
        name,
        email,
        password,
        phoneNumber: phone
      }
      )
      console.log(data)
      return data
    } catch(e: any) {
      console.log(e.response.data)
    }
  }

  // const getModules = async () => {
  //   const { data } = await apiConnection.get('/modules')
  //   console.log(data);
  // }
  // useEffect(() => {
  //   getModules()
  // })
  const loginGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const data = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            "Authorization": `Bearer ${response.access_token}`
          }
        })
        console.log(data.data);
      } catch(e) {
        console.log(e);
      }
    },
  });
  
  return (
    <div className="App">
      <header className="App-header">
        <input 
          value={name}
          onChange={({target}) => setName(target.value)} 
          placeholder='name'
        />
        <input
          onChange={({target}) => setEmail(target.value)} 
          value={email}
          placeholder='email'
        />
        <input
          onChange={({target}) => setPassword(target.value)} 
          value={password}
          placeholder='password'
        />
        <input 
          onChange={({target}) => setPhone(target.value)} 
          value={phone}
          placeholder='phone'
          />
        <button onClick={sigin}>
          logar
        </button>
        <button onClick={register}>
          registrar
        </button>
        <button onClick={() => loginGoogle()}>
          logarc com google
        </button>
      </header>
    </div>
  );
}

export default App;
