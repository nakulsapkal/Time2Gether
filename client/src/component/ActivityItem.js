import React from 'react'
import  './ActivityItem.css';

export default function ActivityItem (props) {
  const { start_date, end_date, start_time, end_time, details, img} = props;

  return (
    <div className="card">

      <p>{details}</p>
      <img className="card--img" src={img} alt='img' />
    </div>
  )
}