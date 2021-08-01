import { useState, useEffect } from "react";
import Axios from "axios";

//This hook is to manage data for application
export default function useApplicationData(params) {
  //State Declaration
  const [state, setState] = useState({
    users: {},
    activities: {}
  });

  //This useEffect is ran only once at the initial app start to fetch the data from API via axioms
  useEffect(() => {
    const p1 = Axios.get("/api/users");
    const p2 = Axios.get("/api/activities");

    Promise.all([p1, p2]).then((all) => {
      const [first,second] = all;
      console.log("Users:", first.data);
      console.log("Activities:", second.data);
      //For purpose of immutability copying the prev state first
      setState((prev) => ({
        ...prev,
        users: first.data,
        activities: second.data
      }));
    });

    // console.log("File: useApplication Line 26:");
    // Axios.get("/api/users").then((result) => {
    //   console.log("Database users:", result.rows);
    //   setState({
    //     ...state,
    //     users: result.data,
    //   });
    // });
  }, []);

  return state;
}
