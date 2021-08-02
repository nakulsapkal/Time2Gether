
import "../App.css";
import useApplicationData from "hooks/useApplicationData";
import Activity from "component/Activity";
import Login from "component/Login";
import Signup from "./Signup";
import Navbar from "./Navbar";
import Footer from "./Footer";


import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

function App() {
  const {state, addUser} = useApplicationData();
  const { users, activities } = state;
  // console.log("activities from app.js line 15: ",state,activities)
  return (

    <Router>
      <div className="App">
        <section>
          <Navbar />
        </section>

        <section>
          <Switch>
            <Route path="/" exact>
              <Activity activities={activities} /> 
            </Route>
            <Route path="/login">
              <Login users={users} />
            </Route>
            <Route path="/Signup">
              <Signup addUser={addUser} />
            </Route>
          </Switch>
        </section>

        <section>
          <Footer />
        </section>
      </div>
    </Router>

  );
}

export default App;
