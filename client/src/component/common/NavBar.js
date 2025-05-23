

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import studentLogo from './studentLogo.png';
import reactLogo from './react.png';
import nodejsLogo from './nodejs.png';
import logoT from './logoT.png';

import './logo.css';
import { useAuth } from "../../AuthContext";

const NavBar = () => {
	// const [isLoggedIn, setIsLoggedIn] = useState(false);
	const { isLoggedIn, logout } = useAuth();
	const navigate = useNavigate();

	// useEffect(() => {
	// 	const token = localStorage.getItem("token");
	// 	setIsLoggedIn(!!token);
	// }, []);

	const handleLogout = () => {
		//localStorage.removeItem("token");
		//setIsLoggedIn(false);
		logout();
		navigate("/");
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
			<div>
				<img src={studentLogo} alt="Your Logo" className="logo" />
			</div>
			<div className="container-fluid">
				<Link className="navbar-brand" to={"/"}>
					Home
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						{isLoggedIn ? (
							<>
								<li className="nav-item">
									<Link className="nav-link" to={"/student/all-students"}>
										All Students
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to={"/student/add-student"}>
										Add New Student
									</Link>
								</li>
								<li className="nav-item">
									<button className="btn btn-danger ms-3" onClick={handleLogout}>
										Logout
									</button>
								</li>
							</>
						) : (
							<li className="nav-item">
								<Link className="nav-link" to={"/admin/login"}>
									Login as Admin
								</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
			<div>
				<Link to={"https://github.com/tanmayMt/Let-s_Learn_NodeJS_ExpressJS"}>
					<img src={nodejsLogo} alt="Nodejs Logo" className="logo" />
				</Link>
			</div>
			<div>
				<Link to={"https://github.com/tanmayMt/Let-s_Learn_ReactJS"}>
					<img src={reactLogo} alt="ReactJS Logo" className="logo" />
				</Link>
			</div>
			<div>
				<Link to={"https://portfolio1-three-silk.vercel.app"}>
					<img src={logoT} alt="Logo T" className="logo" />
				</Link>
			</div>
		</nav>
	);
};

export default NavBar;

