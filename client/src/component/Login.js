import React, { useState } from "react";
import { BrowserRouter as Redirect, Link } from "react-router-dom";
export default function Login(props) {
  const [email, setEmail] = useState("");
  // const [error, setError] = useState("");

  // let validUser = false;

  //const { users } = props;

  // function validate() {
  //   if (email === "") {
  //     setError("Name is required!");
  //     return;
  //   } else {
  //     for (let obj in users) {
  //       validUser = Object.values(users[obj]).includes(email);
  //     }
  //     if (!validUser) {
  //       setError("User does not exist!");
  //     } else {
  //       localStorage.setItem("email", email);
  //       console.log("email", localStorage.getItem("email"));
  //     }
  //   }
  // }

  // const getdata = () => {
  //   for (let obj in users) {
  //     if (Object.values(users[obj]).includes(email)) {
  //       let userData = {
  //         userName: users[obj].first_name,
  //         email: users[obj].email,
  //       };

  //       localStorage.setItem("userData", userData);
  //       console.log(userData)
  //     }
  //   }
  // };

  return (
    <main>
      <header>
        <h1>Login</h1>
      </header>
      <form>
        <div>
          <input
            name="email"
            type="email"
            id="email"
            placeholder="Username"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <div>
          <button>
            <Link to="/login">Cancel</Link>
          </button>
          <button
            onClick={() => {
              localStorage.setItem("email", email);
            }}
          >
            <Link to="/">Login</Link>
          </button>
        </div>
        {/* <section>{error}</section> */}
      </form>
    </main>
  );
}
