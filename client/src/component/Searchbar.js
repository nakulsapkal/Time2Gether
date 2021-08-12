import React, { useState, useEffect, useContext } from "react";
import { databaseContext } from "providers/DatabaseProvider";
import { stateContext } from "providers/StateProvider";
import SearchIcon from "@material-ui/icons/Search";
import ActivityItem from "./ActivityItem";
import './Searchbar.css';
export default function Searchbar (){
  const { state, setState } = useContext(databaseContext);
	const { setActivity,userActivities } = useContext(stateContext);
	const { activities } = state;
  

console.log(activities)

  const searchFilterFunction = (text) => {
    
    if (text) {
      const newData = activities.filter(item => {
        const itemData = item.title ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setState({activities: newData})
      console.log(activities)
    }
  };


  return (
    <div>    
          <div className="header__search">
            <input className="header__searchInput" type="text" onChange={e => searchFilterFunction(e.target.value)}
            placeholder="search here..."
             />
             
            <SearchIcon className="header__searchIcon" />
          </div>
     </div>
  );
};




