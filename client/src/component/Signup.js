
    import React, { useState } from 'react'  
    import axios from 'axios';  
    function Signup(props) {  
      const [firstName, setFirstName] = useState(props.first_name || '');
      const [lastName, setLastName] = useState(props.last_name || '');
      const [email, setEmail] = useState(props.email || ''); 
      const apiUrl = "/api/users/signup";  
      const Registration = (e) => {  
        e.preventDefault();  
        const data1 = {first_name: firstName, last_name: lastName, email: email};
        console.log("This is data1 in line 12 of signup",data1)
        //props.onSave(firstName,lastName,email)
        localStorage.setItem("data1",data1)
        //console.log();
        axios.put(apiUrl, data1)  
           .then((result) => {  
            console.log(result.data);  
           })  
      }  
      
      return (  
        <div class="container">  
                    <div class="text-center">  
                      <h1>Create a New User</h1>  
                    </div>  
                    <form onSubmit={Registration} class="user">  
                      <div class="form-group">  
                          <input type="text" name="First name" onChange={(event) => setFirstName(event.target.value)} placeholder="First name" />  
                      </div> 
                      
                      <div class="form-group">  
                          <input type="text" name="First name" onChange={(event) => setLastName(event.target.value)} placeholder="Last name" />  
                      </div>  
                      <div class="form-group">  
                          <input type="text" name="First name" onChange={(event) => setEmail(event.target.value)} placeholder="Email" />  
                      </div> 
                    
                      <button type="submit" class="btn btn-primary  btn-block">  
                        Create User  
                      </button>  
                      {/* <a href="http://localhost:8002" role="button">
                        Create User
                      </a>  */}
                      <hr />  
                    </form>  
                     
                  </div>  
    
        
      )  
    }  
      
    export default Signup
