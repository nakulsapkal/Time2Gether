
import "../App.css";
import { useState } from "react";
import useApplicationData from "hooks/useApplicationData";
import Activity from "component/Activity";
import ActivityDetail from "component/ActivityDetail";
import Login from "component/Login";
import Signup from "./Signup";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

// import { getActivityById } from "../helpers/selectors";

function App() {
  const state = useApplicationData();
  const { users, activities } = state;
  const [ activity, setActivity ] = useState([]);
  // const activity = getActivityById(activities,id);
  
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
              <Activity activities={activities} setActivity={setActivity}/> 
            </Route>
            <Route path="/activities/detail" >
              <ActivityDetail activity={activity} /> 
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

  );
}

export default App;
