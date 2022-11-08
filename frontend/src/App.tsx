import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import jwt_decode from 'jwt-decode';


function App() {
  // const getModules = async () => {
  //   const { data } = await apiConnection.get('/modules')
  //   console.log(data);
  // }
  // useEffect(() => {
  //   getModules()
  // })
  const login = useGoogleLogin({
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
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => login()}>
          logar
        </button>
        <GoogleLogin
            onSuccess={(credentialResponse: any) => {
              const decoded = jwt_decode(credentialResponse.credential)
              console.log(decoded);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap
          />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
