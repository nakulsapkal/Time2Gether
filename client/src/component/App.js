import logo from "../logo.svg";
import "../App.css";
import useApplicationData from "hooks/useApplicationData";
import Activity from "component/Activity";
import Login from "component/Login";
// import Homepage from "./Homepage";
import Signup from "./Signup";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

function App() {
  const state = useApplicationData();
  const { users, activities } = state;
  console.log("Usestate.users: Line 7: ", users);

  return (
    <Router>
      <div className="App">
        <section>
          <Navbar />
        </section>

        <section>
          <Switch>
            <Route path="/" exact>
              <Activity activities={activities}/>
            </Route>
            <Route path="/login">
              <Login users={users} />
            </Route>
            <Route path="/Signup">
              <Signup />
            </Route>
          </Switch>
        </section>

        <section>
          <Footer />
        </section>
      </div>
    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //     <Activity users={state.users} />
    //   </header>
    // </div>
  );
}

export default App;
