import "../App.css";
import { useState } from "react";
import useApplicationData from "hooks/useApplicationData";
import Activity from "./Activity";
import ActivityDetail from "./ActivityDetail";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MyActivities from "./MyActivities";
import { getActivityByUser } from "helpers/selectors";

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

function App() {
  const { state, validateUser, addUser } = useApplicationData();
  const { userActivities, users, activities } = state;
  const [activity, setActivity] = useState([]);

  //console.log("activities from app.js line 15: ", user);
  //let userActivities = getActivityByUser(activities);
  console.log("userActivities:", userActivities);
  return (
    <Router>
      <div className="App">
        <section>
          <Navbar />
        </section>
        <section>
          <Switch>
            <Route path="/" exact>
              <Activity activities={activities} setActivity={setActivity} />
            </Route>
            <Route path="/activities/detail">
              <ActivityDetail activity={activity} />
            </Route>
            <Route path="/login">
              <Login validateUser={validateUser} />
            </Route>
            <Route path="/Signup">
              <Signup addUser={addUser} />
            </Route>
            <Route path="/user/activities">
              <MyActivities
                activities={userActivities}
                setActivity={setActivity}
              />
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
