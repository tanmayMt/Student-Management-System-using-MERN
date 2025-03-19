import React from "react";
import { Link } from "react-router-dom";
import studentLogo from './studentLogo.png';
import reactLogo from './react.png';
import springLogo from './springLogo.png'
import logoT from './logoT.png';

import './logo.css';
const NavBar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
			<div>
				<img src={studentLogo} alt="Your Logo" class="logo"></img>
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
				<div
					className="collapse navbar-collapse"
					id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link
								className="nav-link active"
								aria-current="page"
								to={"/view-students"}>
								All Students
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link"
								to={"/add-students"}>
								Add New Student
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div>
				<img src={springLogo} alt="Spring Logo" class="logo"></img>
			</div>
			<div>
				<img src={reactLogo} alt="ReactJS Logo" class="logo"></img>
			</div>
			<div>
				<img src={logoT} alt="Logo T" class="logo"></img>
			</div>
		</nav>
		
	);
};

export default NavBar;
