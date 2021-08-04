import React, { useState } from "react";
import { BrowserRouter as useHistory } from "react-router-dom";
export default function Login(props) {
  const [password, setPassword] = useState("");
  const [registrationNumber, setRestrationNumber] = useState("");
  const [error, setError] = useState("");
  const { validateBusinessUser, setUser } = props;

  const history = useHistory();
  const validate = (event) => {
    event.preventDefault();
    let user = validateBusinessUser(password, registrationNumber);
    if (user) {
      setUser(user);
      history.push("/");
    } else {
      setError("Password or Registration number is incorrect!");
    }
  };

  function reset() {
    setError("");
    setRestrationNumber("");
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
            id="registrationNumber"
            placeholder="Username"
            onChange={(event) => {
              setRestrationNumber(event.target.value);
            }}
            value={registrationNumber}
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
          <input type="button" onClick={() => reset()} value="Cancel" />
          <button type="submit">Login</button>
        </div>
        <div>{error}</div>
      </form>
    </main>
  );
}
