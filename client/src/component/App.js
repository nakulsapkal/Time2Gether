import "../App.css";
import { useState } from "react";
import useApplicationData from "hooks/useApplicationData";
import Activity from "component/Activity";
import ActivityDetail from "component/ActivityDetail";
import ActivityCreate from "component/ActivityCreate";
import Login from "component/Login";
import Signup from "./Signup";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

function App() {
  const { state, validateUser, addUser } = useApplicationData();
  const { user, users, activities } = state;
  const [activity, setActivity] = useState([]);

  //get logged-in user (an object) from local storage
  // const loginUser = JSON.parse(localStorage.getItem('User'))
  
  // console.log("activities from app.js line 15: ",state,activities)
  return (
    <Router>
      <div className="App">
        <section>
          <Navbar user={user} />
        </section>
        <section>
          <Switch>
            <Route path="/" exact>
              <Activity activities={activities} setActivity={setActivity} />
            </Route>
            <Route path="/activities/detail">
              <ActivityDetail activity={activity} />
            </Route>
            <Route path="/activities/create">
              <ActivityCreate  />
            </Route>
            <Route path="/login">
              <Login validateUser={validateUser} />
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
