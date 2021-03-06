import React, { useContext } from "react";
import "./Navbar.css";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";
import { databaseContext } from "providers/DatabaseProvider";
import { stateContext } from "providers/StateProvider";

export default function Navbar() {
	const { user, setUser } = useContext(databaseContext);
	const { setEmail, setPassword } = useContext(stateContext);
	const history = useHistory();
	const { checked } = useContext(stateContext);

	return (
		<div className="header">
			<a href="/">
				<img
					className="header__logo"
					alt="logo"
					src="https://i.imgur.com/M8uyg0m.png"
				/>
			</a>
			<div className="header__search">
				<input className="header__searchInput" type="text" />
				<SearchIcon className="header__searchIcon" />
			</div>

			<div className="header__nav">
				<div className="header__option">
					<span className="header__optionLineTwo header__space">
						{user && !checked ? (
							<span
								onClick={() => history.push("/users/promotions")}
								className="header__optionLineTwo header__space"
							>
								Promotions
							</span>
						) : (
							""
						)}
					</span>
				</div>

				<div className="header__option">
					<span className="header__optionLineTwo header__space">
						{user ? (
							!checked ? (
								<span
									onClick={() => history.push("/activities/create")}
									className="header__optionLineTwo header__space"
								>
									Create Activity
								</span>
							) : (
								<span
									onClick={() => history.push("/promotions/create")}
									className="header__optionLineTwo header__space"
								>
									Create Promotion
								</span>
							)
						) : (
							""
						)}
					</span>
				</div>

				<div className="header__option">
					<span className="header__optionLineTwo header__space">
						{user ? (
							!checked ? (
								<span
									onClick={() => history.push("/user/activities")}
									className="header__optionLineTwo header__space"
								>
									My Activities
								</span>
							) : (
								<span
									onClick={() => history.push("/promotions")}
									className="header__optionLineTwo header__space"
								></span>
							)
						) : (
							""
						)}
					</span>
				</div>

				<div className="header__option">
					{user ? (
						!checked ? (
							<span className="header__optionLineTwo header__space">
								Hi, {user && user.first_name}!
							</span>
						) : (
							<span className="header__optionLineTwo header__space">
								Hi, {user && user.email}!
							</span>
						)
					) : (
						<span
							className="header__optionLineTwo header__space"
							onClick={() => history.push("/signup")}
						>
							SignUp
						</span>
					)}
				</div>

				<div className="header__option header__space">
					{user ? (
						<span
							onClick={() => {
								setUser("");
								setEmail("");
								setPassword();
								localStorage.removeItem("userData");
								history.push("/");
							}}
							className="header__optionLineTwo header__space"
						>
							LogOut
						</span>
					) : (
						<span
							className="header__optionLineTwo header__space"
							onClick={() => history.push("/login")}
						>
							LogIn
						</span>
					)}
				</div>
			</div>
		</div>
	);
}
