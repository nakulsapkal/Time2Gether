import { useState, useEffect } from "react";
import axios from "axios";
//This hook is to manage data for application
export default function useApplicationData(params) {
  //State Declaration and initialize it as an object
  const [state, setState] = useState({
    users: [],
    activities: [],
    businessUser: [],
    userActivities: [],
  });

  const [user, setUser] = useState([]);

  //This useEffect is ran only once at the initial app start to fetch the data (async) from API via axios
  useEffect(() => {
    const p1 = axios.get("/api/users");
    const p2 = axios.get("/api/activities");
    const p3 = axios.get("/api/business/users");
    const p4 = axios.get("/api/userActivities");

    Promise.all([p1, p2, p3, p4]).then((all) => {
      const [first, second, third, fourth] = all;
      console.log("Users:", first.data.users);
      console.log("Activities:", second.data.activities);
      console.log("Business users:", third.data.businessUsers);
      console.log("userActivities:", fourth.data.userActivities);
      //For purpose of immutability copying the prev state first
      setState((prev) => ({
        ...prev,
        users: first.data.users,
        activities: second.data.activities,
        businessUsers: third.data.businessUsers,
        userActivities: fourth.data.userActivities,
      }));
    });

    setUser(JSON.parse(localStorage.getItem("userData")));
  }, []);

  function validateUser(userEmail, userPassword) {
    let userData = state.users.find(
      (obj) => obj.email === userEmail && obj.password === userPassword
    );

    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
      return userData;
    }
    return false;
  }

  // Validate email before adding a new user
  function validateEmail(userEmail) {
    let userData;
    for (let obj in state.users) {
      userData = state.users[obj];
      if (userData.email === userEmail) {
        return true;
      }
    }
    return false;
  }

  // Validate Registration number before adding a new business user
  function validateRegNum(regNum) {
    let userData;
    for (let obj in state.businessUsers) {
      userData = state.businessUsers[obj];
      console.log("===========", userData);
      if (userData.registration_number === regNum) {
        return true;
      }
    }
    return false;
  }

  // Add a new user to the database
  function addUser(user) {
    const apiUrl = "/api/users/signup";
    const email = user.email;
    if (validateEmail(email) === true) {
      alert("email is already in use");
    } else {
      console.log("user", user);
      return axios
        .post(apiUrl, user, { headers: { "Content-Type": "application/json" } })
        .then((res) => {
          window.location.replace("/");
        })
        .catch((error) => console.log(error));
    }
  }

  // Add a new business user to the database
  function addBusinessUser(businessUser) {
    const apiUrl = "/api/business/signup";
    const regNum = businessUser.registrationNumber;
    console.log("Registration number +++++++++++", regNum);
    if (validateRegNum(regNum) === true) {
      alert("Registration number is already in use");
    } else {
      console.log("Business user", businessUser);
      return axios
        .post(apiUrl, businessUser, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          window.location.replace("/");
        })
        .catch((error) => console.log(error));
    }
  }

  //Delete an activity for a user
  function deleteActivity(activityObj) {
    let index = state.userActivities.findIndex(
      (actObj) => actObj.id === activityObj.id
    );

    // console.log("state.userActivities:", state.userActivities);
    // console.log("activityObj:", activityObj);
    // console.log("Index:", index);

    const userActivities = [...state.userActivities];

    const url = `/api/user/activity/${activityObj.activity_id}`;

    return axios
      .delete(url, activityObj, {
        headers: { "Content-Type": "application/json" },
      })
      .then((result) => {
        if (result.status === "error") {
          // Oops, something went wrong. Let's get that deleted Id back.
          setState((prev) => ({
            ...prev,
            userActivities: userActivities,
          }));

          if (result.status !== 200) {
            throw new Error(`Request failed: ${result.status}`);
          }
        } else {
          alert("Successfully Deleted Activity!");
          userActivities.splice(index, 1);
          setState((prev) => ({
            ...prev,
            userActivities: userActivities,
          }));
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error("Delete Activity Error: ", err);
      });
  }

  return {
    user,
    setUser,
    state,
    addUser,
    validateUser,
    addBusinessUser,
    deleteActivity,
  };
}
