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
import BusinessSignup from "./BusinessSignup";
import {
  getUpcomingActivityForUser,
  getActivityCreatedByUser,
  getActivitiesFavouriteByUser,
  getActivityHistoryForUser,
} from "helpers/selectors";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

function App() {
  const { user, setUser, state, validateUser, addUser, addBusinessUser } =
    useApplicationData();
  const { users, activities } = state;
  const [activity, setActivity] = useState([]);
  //const userData = JSON.parse(localStorage.getItem("userData"));
  let createdActivities,
    upcomingActivities,
    activitiesHistory,
    favouriteActivities;
  if (user) {
    createdActivities = getActivityCreatedByUser(user.id, activities);
    upcomingActivities = getUpcomingActivityForUser(user.id, activities);
    activitiesHistory = getActivityHistoryForUser(user.id, activities);
    favouriteActivities = getActivitiesFavouriteByUser(user.id, activities);
  }

  console.log("user from app.js line 21: ", user);
  // console.log("state from app.js line 22: ", state);
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
              <Login validateUser={validateUser} setUser={setUser} />
            </Route>
            <Route path="/signup">
              <Signup addUser={addUser} />
            </Route>
            <Route path="/user/activities">
              {user && (
                <MyActivities
                  key={user.id}
                  user={user}
                  activities={activities}
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
