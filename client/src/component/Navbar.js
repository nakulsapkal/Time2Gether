import React, { useContext } from "react";
import "./Navbar.css";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";
import { databaseContext } from "providers/DatabaseProvider";

export default function Navbar() {
	const { user } = useContext(databaseContext);
	const history = useHistory();
	const { checked } = useContext(databaseContext);

	console.log("This checked is from Navbar:", checked);

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
						{user ? (
							<span
								onClick={() => history.push("/promotions")}
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
									Create Promotions
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
									My Activity
								</span>
							) : (
								<span
									onClick={() => history.push("/promotions/business")}
									className="header__optionLineTwo header__space"
								>
									My Promotions
								</span>
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
							{" "}
							SignUp
						</span>
					)}
				</div>

				<div className="header__option header__space">
					{user ? (
						<span
							onClick={() => {
								history.push("/login");
								localStorage.removeItem("userData");
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
