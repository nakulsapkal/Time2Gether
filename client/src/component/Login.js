import React, { useState } from "react";
import { BrowserRouter as Redirect, Link } from "react-router-dom";
export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [error, setError] = useState("");

  // function validate(email, password) {
  //   if (props.validateUser(email, password)) {
  //     return true;
  //   } else {
  //     setEmail("");
  //     setPassword("");
  //     setError("User does not exist!");
  //   }
  // }

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
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          />
        </div>
        <div>
          <button>
            <Link to="/login">Cancel</Link>
          </button>
          <button
            onClick={() => {
              props.validateUser(email, password);
              //localStorage.setItem("email", email);
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
