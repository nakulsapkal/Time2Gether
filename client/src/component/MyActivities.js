import React from "react";
import ActivityItem from "./ActivityItem";
import { useState } from "react";
import { UserProfile } from "./UserProfile";

export default function MyActivities(props) {
  const CREATED = "Created";
  const UPCOMING = "Upcoming";
  const FAVOURITE = "Favourite";
  const HISTORY = "History";

  const {
    createdActivities,
    activitiesHistory,
    upcomingActivities,
    favouriteActivities,
    user,
    activities,
    activity,
    setActivity,
  } = props;
  const [option, setOption] = useState("");
  // const userData = JSON.parse(localStorage.getItem("userData"));

  console.log("user from MyActivities.js line 13: ", user);
  console.log(
    "MyActivity File:",
    user,
    activitiesHistory,
    createdActivities,
    upcomingActivities,
    favouriteActivities
  );

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  console.log("MyActivity File line 27:", option);
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
        {user &&
          console.log(
            "MyActivity File line 40:",
            option,
            activities,
            createdActivities
          )}
        {option === CREATED &&
          Object.entries(createdActivities).map(([key, item]) => {
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
                activities={createdActivities}
              />
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
