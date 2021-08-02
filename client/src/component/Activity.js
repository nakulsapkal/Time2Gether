import React from 'react';
import ActivityItem from './ActivityItem';

export default function Activity(props) {
  const {activities, activity, setActivity} = props;

  return (
    <div className="App">
      {/* the state has been initialized as an object so setState somehow change it to obj.
      W/t Object.entries, .map will complaint activities is not an array */}
      { Object.entries(activities).map(([key,item]) => {
          return <ActivityItem 
            key = {item.id}
            id = {item.id}
            start_date = {item.start_date}
            end_date = {item.end_date}
            start_time = {item.start_time}
            end_time = {item.end_time}
            details = {item.details}
            img = {item.img}
            setActivity = {setActivity}
            activities = {activities}
            />
        })
      }
    </div>
  );
}
