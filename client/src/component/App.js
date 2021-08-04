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
import MyActivities from "./MyActivities";
import BusinessSignup from "./BusinessSignup";
import BusinessLogin from "./BusinessLogin";

import {
  getUpcomingActivityForUser,
  getActivityCreatedByUser,
  getActivitiesFavouriteByUser,
  getActivityHistoryForUser,
} from "helpers/selectors";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

function App() {
  const { user, setUser, state, validateUser, addUser, addBusinessUser, validateBusinessUser } =
    useApplicationData();
  const { users, activities, userActivities } = state;
  console.log("userActivities from line 27 app.js: ", userActivities)
  const [activity, setActivity] = useState([]);
  //const userData = JSON.parse(localStorage.getItem("userData"));
  let createdActivities,
    upcomingActivities,
    activitiesHistory,
    favouriteActivities;
  if (user) {
    createdActivities = getActivityCreatedByUser(user.id, userActivities);
    upcomingActivities = getUpcomingActivityForUser(user.id, userActivities);
    activitiesHistory = getActivityHistoryForUser(user.id, userActivities);
    favouriteActivities = getActivitiesFavouriteByUser(user.id, userActivities);
  }

  //get logged-in user (an object) from local storage
  // const loginUser = JSON.parse(localStorage.getItem('userData'))
  
  // console.log("activities from app.js line 15: ",state,activities)
  console.log("user from app.js line 45: ", user);
  // console.log("state from app.js line 22: ", state);
  return (
    <Router>
      <div className="App">
        <section>
          <Navbar user={user}/>
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
              <Login validateUser={validateUser} setUser={setUser} />
            </Route>
            <Route path="/signup">
              <Signup addUser={addUser} />
            </Route>
            <Route path="/user/activities">
              {user && (
                <MyActivities
                  key={user.id}
                  id={user.id}
                  user={user}
                  activities={userActivities}
                  setActivity={setActivity}
                  createdActivities={createdActivities}
                  upcomingActivities={upcomingActivities}
                  activitiesHistory={activitiesHistory}
                  favouriteActivities={favouriteActivities}
                />
              )}
            </Route>
            <Route path="/business/signup">
              <BusinessSignup addBusinessUser={addBusinessUser} />
            </Route>
            <Route path="/business/login">
              <BusinessLogin validateBusinessUser={validateBusinessUser} setUser={setUser}/>
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
