import { useState, useEffect } from "react";
import axios from "axios";

//This hook is to manage data for application
export default function useApplicationData(params) {
  //State Declaration and initialize it as an object
  const [state, setState] = useState({
    users: [],
    activities: [],
  });

  const [user, setUser] = useState([]);

  //This useEffect is ran only once at the initial app start to fetch the data (async) from API via axios
  useEffect(() => {
    const p1 = axios.get("/api/users");
    const p2 = axios.get("/api/activities");

    Promise.all([p1, p2]).then((all) => {
      const [first, second] = all;
      console.log("Users:", first.data.users);
      console.log("Activities:", second.data.activities);
      //For purpose of immutability copying the prev state first
      setState((prev) => ({
        ...prev,
        users: first.data.users,
        activities: second.data.activities,
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

  return { user, setUser, state, addUser, validateUser };
}
