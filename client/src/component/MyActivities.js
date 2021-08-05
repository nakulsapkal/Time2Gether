import React from "react";
import ActivityItem from "./ActivityItem";
import { useState } from "react";
import { UserProfile } from "./UserProfile";
import { useHistory } from "react-router-dom";

export default function MyActivities(props) {
  const CREATED = "Created";
  const UPCOMING = "Upcoming";
  const FAVOURITE = "Favourite";
  const HISTORY = "History";

  const history = useHistory();

  const {
    createdActivities,
    activitiesHistory,
    upcomingActivities,
    favouriteActivities,
    user,
    activity,
    setActivity,
    deleteActivity,
  } = props;
  const [option, setOption] = useState("");

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  function handleEditActivity(activityObj) {
    history.push("/activities/create", activityObj);
    // console.log("Option:", option);
    // console.log("Activity Obj:", activityObj);
  }

  return (
    <div>
      <div>
        <select onChange={handleChange}>
          <option>Select Activity Category</option>
          <option value="Created">Created</option>
          <option value="Upcoming">Upcoming</option>
          <option value="History">History</option>
          <option value="Favourite">Favourite</option>
        </select>

        {user && <UserProfile user={user} />}
        {option === CREATED &&
          Object.entries(createdActivities).map(([key, item]) => {
            return (
              <div>
                <ActivityItem
                  key={item.id}
                  id={item.id}
                  start_date={item.start_date}
                  end_date={item.end_date}
                  start_time={item.start_time}
                  end_time={item.end_time}
                  details={item.details}
                  img={item.img}
                  activity={activity}
                  setActivity={setActivity}
                  activities={createdActivities}
                />
                <button onClick={() => handleEditActivity(item)}>EDIT</button>
                <button onClick={() => deleteActivity(item)}>DELETE</button>
              </div>
            );
          })}
        {option === UPCOMING &&
          Object.entries(upcomingActivities).map(([key, item]) => {
            return (
              <ActivityItem
                key={item.id}
                id={item.id}
                start_date={item.start_date}
                end_date={item.end_date}
                start_time={item.start_time}
                end_time={item.end_time}
                details={item.details}
                img={item.img}
                activity={activity}
                setActivity={setActivity}
                activities={upcomingActivities}
              />
            );
          })}
        {option === FAVOURITE &&
          Object.entries(favouriteActivities).map(([key, item]) => {
            return (
              <ActivityItem
                key={item.id}
                id={item.id}
                start_date={item.start_date}
                end_date={item.end_date}
                start_time={item.start_time}
                end_time={item.end_time}
                details={item.details}
                img={item.img}
                activity={activity}
                setActivity={setActivity}
                activities={favouriteActivities}
              />
            );
          })}
        {option === HISTORY &&
          Object.entries(activitiesHistory).map(([key, item]) => {
            return (
              <ActivityItem
                key={item.id}
                id={item.id}
                start_date={item.start_date}
                end_date={item.end_date}
                start_time={item.start_time}
                end_time={item.end_time}
                details={item.details}
                img={item.img}
                activity={activity}
                setActivity={setActivity}
                activities={activitiesHistory}
              />
            );
          })}
      </div>
    </div>
  );
}
