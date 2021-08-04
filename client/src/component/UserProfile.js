import React from "react";
import "./UserProfile.css";

export function UserProfile(props) {
  const { first_name, last_name, avatar } = props.user;
  return (
    <div className="card">
      <img className="card--img" src={avatar} alt="img" />
      <h2>
        {first_name}
        {last_name}
      </h2>
    </div>
  );
}
