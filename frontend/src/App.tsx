import logo from './logo.svg';
import './App.css';
import apiConnection from './services/api.connection';
import { useEffect } from 'react';

function App() {
  const getModules = async () => {
    const { data } = await apiConnection.get('/modules')
    console.log(data);
  }
  useEffect(() => {
    getModules()
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
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
