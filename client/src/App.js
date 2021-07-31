import logo from "./logo.svg";
import "./App.css";
import useApplicationData from "hooks/useApplicationData";

function App() {
  const state = useApplicationData();
  console.log("Usestate.users: Line 7: ", state.users);

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
