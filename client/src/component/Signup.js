
    import React, { useState } from 'react'  
    import axios from 'axios';  
    function Signup(props) {  
      const [firstName, setFirstName] = useState(props.firstName || '');
      const [lastName, setLastName] = useState(props.lastName || '');
      const [email, setEmail] = useState(props.email || '');
      const [password, setPassword] = useState(props.password || '');
      const [error, setError] = useState("");
      //const apiUrl = "/api/users/signup";  
      const Registration = (event) => {
          if (firstName === "") {
            setError("First name cannot be blank");
            return;
          } else if (lastName === "") {
             setError("Last name cannot be blank");
             console.log("Error")
             return;
          } else if (email === "") {
            setError("Email cannot be blank");
          } else if (password === "") {
            setError("Password cannot be blank")
            return;
          } else {
          setError("");
          event.preventDefault();
        const customData = {firstName: firstName, lastName: lastName, email: email, password: password};
        //console.log("This is customData in line 12 of signup",customData)
        props.addUser(customData);}
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
                          <input type="text" name="Last name" onChange={(event) => setLastName(event.target.value)} placeholder="Last name" />  
                      </div>  
                      <div class="form-group">  
                          <input type="email" name="Email" onChange={(event) => setEmail(event.target.value)} placeholder="Email" />  
                      </div> 
                      <div class="form-group">  
                          <input type="password" name="Password" onChange={(event) => setPassword(event.target.value)} placeholder="Password" />  
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
