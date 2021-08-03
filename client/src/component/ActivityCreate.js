import React, { useState }from 'react';
import './ActivityCreate.css';
// import 'date-fns';
// import DateFnsUtils from '@date-io/date-fns'; 
// import {
//   DatePicker,
//   TimePicker,
//   DateTimePicker,
//   MuiPickersUtilsProvider,
// } from '@material-ui/pickers';

export default function ActivityCreate (props) {
  const [values, setValues] = useState({
    name: "", img: "", details: "",
    start_date: "", end_date: "", start_time: "", end_time: "",  
    street_number: "", street_name: "", city: "", province: "", postal_code: ""
  });

  const set = (name) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };

  const saveFormData = async () => {
    const response = await fetch('/api/registration', {
      method: 'POST',
      body: JSON.stringify(values)
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`); 
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    try {
      await saveFormData();
      alert('Your activity was successfully created!');
      setValues({
        name: "", img: "", details: "",
        start_date: "", end_date: "", start_time: "", end_time: "",  
        street_number: "", street_name: "", city: "", province: "", postal_code: ""
      });
    } catch (e) {
      alert(` Failed! ${e.message}`);
    }
  }


  return (
    <div className="create">
    <form onSubmit={onSubmit} className="create-form"> 
      <h2>Create Activity</h2>

<div>
      <label>Name*:</label>
      <input 
        type="text" required
        value={values.name} onChange={set("name")}
      />
</div>

<div>
      <label>Start Date:</label>
      <input
        id="date"
        type="date"
        defaultValue="2017-05-24"
        value={values.img} onChange={set("img")} 
      />
</div>

<div>
      <label>Img Url:</label>
      <input
        type="text" 
        value={values.img} onChange={set("img")} 
      />
</div>
<div>
      <label>Details:</label>
      <textarea value={values.details} onChange={set("details")} />
</div>


      <h2>Location Detail</h2>
<div>
      <label>Street Number*:</label>
      <input 
        type="number" required
        value={values.street_number} onChange={set("street_number")}
      />
</div>

<div>
      <label>Street Name*:</label>
      <input 
        type="text" required
        value={values.street_name} onChange={set("street_name")}
      />
</div>

<div>
      <label>City*:</label>
      <input 
        type="text" required
        value={values.city} onChange={set("city")}
      />  
</div>

<div>
      <label>Province*:</label>
      <input 
        type="text" required
        value={values.province} onChange={set("province")}
      />  
</div>

<div>
      <label>Postal Code*:</label>
      <input 
        type="text" required
        value={values.postal_code} onChange={set("postal_code")}
      /> 
</div>
<div> 
      <button type="submit">Submit</button>
</div>
    </form>
    </div>
  )
}