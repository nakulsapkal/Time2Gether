import React from "react";
import "./Navbar.css";
import SearchIcon from "@material-ui/icons/Search";
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
// import { isLogin } from "../helpers/selectors";
import Button from '@material-ui/core/Button';


export default function Navbar(props) {
    const loginUser = JSON.parse(localStorage.getItem('User'));
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
        <Link to="/activities/create" />
        <span className="header__optionLineTwo header__space"> 
        {loginUser ? <span onClick={() => history.push('/activities/create')}  className="header__optionLineTwo header__space">Create</span> : "" } 
        </span>
      </div>

      <div className="header__option">
      <span className="header__optionLineTwo header__space"> 
        {loginUser ? "My Activity" : "" } </span> 
      </div>

      
      <div className="header__option">
        {loginUser ? <span className="header__optionLineTwo header__space"> 
                    Hi, {loginUser && loginUser.first_name}!</span> 
        : <span className="header__optionLineTwo header__space" 
                onClick={() => history.push('/signup')}> Signup</span> 
        }
      </div>

      <div className="header__option header__space">
        {loginUser ? <span className="header__optionLineTwo header__space">LogOut </span> 
        : <span className="header__optionLineTwo header__space" 
                onClick={() => history.push('/login')}>LogIn</span> }
      </div>
      
    </div>
  </div>
  )
}
