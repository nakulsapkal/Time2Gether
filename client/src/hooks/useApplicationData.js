import { useState, useEffect } from "react";
import axios from "axios";

//This hook is to manage data for application
export default function useApplicationData(params) {
  //State Declaration and initialize it as an object
  const [state, setState] = useState({
    users: {},
    activities: {},
    businessUser: {},
  });

  //This useEffect is ran only once at the initial app start to fetch the data (async) from API via axios
  useEffect(() => {
    const p1 = axios.get("/api/users");
    const p2 = axios.get("/api/activities");
    const p3 = axios.get("/api/business/users")

    Promise.all([p1, p2, p3]).then((all) => {
      const [first, second, third] = all;
      console.log("Users:", first.data.users);
      console.log("Activities:", second.data.activities);
      console.log("Business users:",third.data.businessUsers)
      //For purpose of immutability copying the prev state first
      setState((prev) => ({
        ...prev,
        users: first.data.users,
        activities: second.data.activities,
        businessUsers: third.data.businessUsers,
      }));
    });
  }, []);

  function validateUser(userEmail, userPassword) {
    let userData;
    for (let obj in state.users) {
      userData = state.users[obj];
      if (userData.email === userEmail && userData.password === userPassword) {
        console.log("UserData:", userData);
        localStorage.setItem("user", userData);
      }
    }
    return false;
  }

  // Validate email before submiting a new user
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
      return axios.post(apiUrl, user, { headers: { "Content-Type": "application/json" } })
        .then((res) => {
          window.location.replace("/");
        })
        .catch(error => console.log(error));
    }
  }

  function addBusinessUser(businessUser) {
    const apiUrl = "/api/business/signup";
    const regNum = businessUser.registrationNumber;
    console.log("Registration number +++++++++++", regNum);
    if (validateRegNum(regNum) === true) {
      alert("Registration number is already in use");
    } else {
      console.log("Business user", businessUser);
      return axios.post(apiUrl, businessUser, { headers: { "Content-Type": "application/json" } })
        .then((res) => {
          window.location.replace("/");
        })
        .catch(error => console.log(error));
    }
  }
  return { state, addUser, validateUser, addBusinessUser };
}
