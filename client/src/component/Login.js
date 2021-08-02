import React, { useState } from "react";
import { BrowserRouter as Redirect, Link } from "react-router-dom";
export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function validate(email, password) {
    if (props.validateUser(email, password)) {
      return true;
    } else {
      setError("User does not exist!");
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
            Login
          </button>
        </div>
        <section>{error}</section>
      </form>
    </main>
  );
}
