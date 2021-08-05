import React from "react";
import "./Navbar.css";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from 'react-router-dom';


export default function Navbar(props) {
    // const props.user = JSON.parse(localStorage.getItem('userData'));
    const history = useHistory();

    return( 
      <div className="header">
        
      <a href="/"><img className="header__logo" alt="logo"
      src="https://i.imgur.com/M8uyg0m.png" /></a>
    

    <div className="header__search">
      <input className="header__searchInput" type="text" />
      <SearchIcon className="header__searchIcon" />
    </div>

    <div className="header__nav">
      
      <div className="header__option">
        <span className="header__optionLineTwo header__space"> 
        {props.user ? <span onClick={() => history.push('/activities/create')}  className="header__optionLineTwo header__space">Create</span> : "" } 
        </span>
      </div>

      <div className="header__option">
        <span className="header__optionLineTwo header__space"> 
        {props.user ? <span onClick={() => history.push('/user/activities')}  className="header__optionLineTwo header__space">My Activity</span> : "" }
        </span>
      </div>

      
      <div className="header__option">
        {props.user ? <span className="header__optionLineTwo header__space"> 
                    Hi, {props.user && props.user.first_name}!</span> 
        : <span className="header__optionLineTwo header__space" 
                onClick={() => history.push('/signup')}> SignUp</span> 
        }
      </div>

      <div className="header__option header__space">
        {props.user ? <span onClick={() => {
                  history.push("/login");
                  localStorage.removeItem('userData');
        }}className="header__optionLineTwo header__space">LogOut</span> 
        : <span className="header__optionLineTwo header__space" onClick={() => history.push("/login")}>LogIn</span> }
      </div>
      
    </div>
  </div>
  )
}
