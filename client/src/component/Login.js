import React, { useState } from "react";
import { BrowserRouter as Redirect, Link, useHistory } from "react-router-dom";
export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { validateUser, setUser } = props;
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  }

  const history = useHistory();
  const validate = (event) => {
    event.preventDefault();
    let user = validateUser(email, password);
    if (user) {
      setUser(user);
      history.push("/");
    } else {
      setError("Username or Password is incorrect!");
    }
  };

  function reset() {
    setError("");
    setEmail("");
    setPassword("");
  }

  return (
    <main>
      <header>
        <h1>Login</h1>
      </header>
      <form onSubmit={validate}>
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
          <label>
            <input type="checkbox"
            checked={checked}
            onChange={handleChange}
            />
            Business user
          </label>
          <p>Is "Business user" checked? {checked.toString()}</p>
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
