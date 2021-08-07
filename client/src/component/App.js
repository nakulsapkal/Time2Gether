import "./App.css";
import React from "react";
// import useApplicationData from "hooks/useApplicationData";
import StateProvider from "providers/StateProvider";
import Activity from "component/Activity";
import ActivityDetail from "component/ActivityDetail";
import ActivityCreate from "component/ActivityCreate";
import Login from "component/Login";
import Signup from "./Signup";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MyActivities from "./MyActivities";
import BusinessSignup from "./BusinessSignup";
import BusinessLogin from "./BusinessLogin";
import Promotions from "./Promotions/Promotions";
import PromotionDetails from "./Promotions/PromotionDetails";
import PromotionCreate from "./Promotions/PromotionCreate";


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
	return (
		<StateProvider>
			<Router>
				<div className="App">
					<section>
						<Navbar />
					</section>
					<section>
						<Switch>
							<Route path="/" exact>
								<Activity />
							</Route>
							<Route path="/activities/detail">
								<ActivityDetail />
							</Route>
							<Route path="/activities/create">
								<ActivityCreate />
							</Route>
							<Route path="/login">
								<Login />
							</Route>
							<Route path="/signup">
								<Signup />
							</Route>
							<Route path="/user/activities">
								<MyActivities />
							</Route>
							<Route path="/promotions" exact>
								<Promotions />
							</Route>
							<Route path="/promotions/details" exact>
								<PromotionDetails />
							</Route>
							<Route path="/promotions/create" exact>
								<PromotionCreate />
							</Route>
							<Route path="/business/signup">
								<BusinessSignup />
							</Route>
							<Route path="/business/login">
								<BusinessLogin />
							</Route>
						</Switch>
					</section>
					<section>
						<Footer />
					</section>
				</div>
			</Router>
		</StateProvider>
	);
}

export default App;
