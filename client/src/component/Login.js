import React, { useState } from "react";
import { BrowserRouter as Redirect, Link, useHistory } from "react-router-dom";
// import { useHistory } from "react-router";
export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //const history = useHistory();
  //issues: after error is set page should not render but its rendering
  //issue 2: once we navigate to main page then main page or home page should render with the user data.
  function validate(email, password) {
    if (props.validateUser(email, password)) {
      return true;
      //history.push("/");
    } else {
      setError("Username or Password is incorrect!");
    }
  }

  function reset() {
    setEmail("");
    setPassword("");
  }

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
          <button
            onClick={() => {
              reset();
            }}
          >
            <Link to="/login">Cancel</Link>
          </button>

          <button
            onClick={() => {
              validate(email, password);
            }}
          >
            <Link to="/">Login</Link>
          </button>
          {/* <button onClick={() => reset()}>Cancel</button>
            <button onClick={() => validate(email, password)}>Login</button> */}
        </div>
        <section>{error}</section>
      </form>
    </main>
  );
}
