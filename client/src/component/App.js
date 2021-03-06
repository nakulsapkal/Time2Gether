import "./shared.css";
import React from "react";
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
//client connects to server

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
							<Route path="/" exact component={Activity} />
							<Route path="/activities/detail" component={ActivityDetail} />
							<Route path="/activities/create" component={ActivityCreate} />
							<Route path="/login" component={Login} />
							<Route path="/signup" component={Signup} />
							<Route path="/user/activities" component={MyActivities} />
							<Route path="/business/signup" component={BusinessSignup} />
							<Route path="/business/login" component={BusinessLogin} />
							<Route path="/users/promotions" component={Promotions} />
							<Route path="/promotions" exact component={Promotions} />
							<Route
								path="/promotions/details"
								exact
								component={PromotionDetails}
							/>
							<Route
								path="/promotions/create"
								exact
								component={PromotionCreate}
							/>
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
