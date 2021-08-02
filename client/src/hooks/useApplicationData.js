import { useState, useEffect } from "react";
import axios from "axios";

//This hook is to manage data for application
export default function useApplicationData(params) {
  //State Declaration and initialize it as an object
  const [state, setState] = useState({
    users: {},
    activities: {}
  });


  //This useEffect is ran only once at the initial app start to fetch the data (async) from API via axios
  useEffect(() => {
   
    const p1 = axios.get("/api/users");
    const p2 = axios.get("/api/activities");

    Promise.all([p1, p2]).then((all) => {
      const [first,second] = all;
      console.log("Users:", first.data.users);
      console.log("Activities:", second.data.activities);
      //For purpose of immutability copying the prev state first
      setState((prev) => ({
        ...prev,
        users: first.data.users,
        activities: second.data.activities
      }));
    });
  }, []);

  function addUser(user) {
    const apiUrl = "/api/users/signup";
    console.log("user", user);
    return axios.post(apiUrl, user,{headers:{'Content-Type':'application/json'}})
          .then((response) => {  
          console.log(response);  
    })  
  }

  return { state, addUser} ;
}
