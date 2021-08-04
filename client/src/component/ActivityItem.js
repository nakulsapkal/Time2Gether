import React from 'react'
import  './ActivityItem.css';
import { getActivityById } from "../helpers/selectors";
import { useHistory } from 'react-router-dom';

export default function ActivityItem (props) {
  const { id, details, img, setActivity, activities } = props;

  const history = useHistory();
  // console.log("key: ", id)
  // console.log("activities: ", activities)
  return (
    <div className="card" onClick={() => {
      setActivity(getActivityById(id, activities));
      history.push("/activities/detail");
    }}>

      <p>{details}</p>
      <img className="card--img" src={img} alt='img' />
    </div>
  )
}