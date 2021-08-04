import React from "react";

export default function ActivityDetail(props) {
  const {
    start_date,
    end_date,
    start_time,
    end_time,
    details,
    img,
    street_number,
    street_name,
    city,
    province,
    postal_code,
  } = props.activity[0];

  // const { street_number, street_name, city, province, postal_code} = props.actAddress[0];

  return (
    <div className="card">
      <section className="activity-detail">
        <h3>Activity Details</h3>
        <p>Start Date: {start_date}</p>
        <p>Start Time: {end_date}</p>
        <p>End Date: {start_time}</p>
        <p>End Time: {end_time}</p>
        <p>Details: {details}</p>
      </section>

      <section className="activity-img">
        <img className="card--img" src={img} alt="img" />
      </section>

      <section className="location-detail">
        <h3>Location Details</h3>
        <p>Street Number: {street_number}</p>
        <p>Street Name: {street_name}</p>
        <p>City: {city}</p>
        <p>Province: {province}</p>
        <p>Postal Code: {postal_code}</p>
      </section>
    </div>
  );
}
