import logo from './assets/logo.svg';
import './assets/App.css';
import NavBar from './components/NavBar';
import {Posts} from './components/authAPI'

function App() {
  return (
    <div className="App">
      
      <NavBar />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
      <Posts />
    </div>


  );
}

export default App;
