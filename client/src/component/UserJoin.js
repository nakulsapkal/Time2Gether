import React, {useState} from "react";
import axios from 'axios';

export default function UserJoin(props) {
  const [values, setValues] = useState({
    joined_at: props.joined_at, 
    user_id: props.user_id, 
    activity_id: props.activity_id
  });

    console.log("joined_at******************", values.joined_at) 
    console.log("user_id******************",values.user_id) 
    console.log("activity_id******************",values.activity_id) 


  const addJoin = async () => {
    const response = await axios.post('/api/users/joined', {
      body: values
    });

    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`); 
    }
  }

  const cancelJoined = async () => {
    const response = await axios.put('/api/users/joined', {
      body: values
    });

    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`); 
    }
  }
//----------------------------------------
  const handleJoin = async (e) => {
    e.preventDefault();

    //joined before => cancel now
    if(props.joined_at){
      try {
        await cancelJoined();
        alert('You have cancelled successfully!');
      } catch(e) {
        alert(`Failed! ${e.message}`);
      }
    } 
    
    // join now
    if(!props.joined_at) {
      try {
        await addJoin();
        alert('You have joined successfully!');
      } catch(e) {
        alert(`Failed! ${e.message}`);
      }
    }
  }
  
  return (
    <div className="join-button">
      <button onClick={handleJoin}>
        {values.joined_at? "CANCEL" : "JOIN"}
      </button>
    </div>
  )


}