import React, { useState } from "react";
import { BrowserRouter as Redirect, Link, useHistory } from "react-router-dom";

export default function BusinessLogin(props) {
  const [password, setPassword] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [error, setError] = useState("");
  const { validateBusinessUser, setUser } = props;

  const history = useHistory();
  const validate = (event) => {
    event.preventDefault();
    let businessUser = validateBusinessUser(registrationNumber, password);
    if (businessUser) {
      console.log("This is a business user", businessUser);
      setUser(businessUser);
      history.push("/");
    } else {
      setError("Password or Registration number is incorrect!");
    }
  };

  function reset() {
    setError("");
    setRegistrationNumber("");
    setPassword("");
  }

  return (
    <main>
      <header>
        <h1>Busines Login</h1>
      </header>
      <form onSubmit={validate}>
        <div>
          <input
            name="registrationNumber"
            type="text"
            placeholder="Business Registration Number"
            onChange={(event) => {
              setRegistrationNumber(event.target.value);
            }}
            value={registrationNumber}
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          />
        </div>
        <div>
          <input type="button" onClick={() => reset()} value="Cancel" />
          <button type="submit">Login</button>
        </div>
        <div>{error}</div>
      </form>
    </main>
  );
}
