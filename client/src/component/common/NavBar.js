import React,{ useState, useEffect } from "react";

import { Link } from "react-router-dom";
import studentLogo from './studentLogo.png';
import reactLogo from './react.png';
import nodejsLogo from './nodejs.png'
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
								// to={"/view-students"}
								to={"/student/all-students"}
								>
								All Students
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link"
								to={"/student/add-student"}>
								Add New Student
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div>
				<Link to={"https://github.com/tanmayMt/Let-s_Learn_NodeJS_ExpressJS"}>
				 <img src={nodejsLogo} alt="Nodejs Logo" class="logo"></img>
				</Link>
			</div>
			<div>
				<Link to={"https://github.com/tanmayMt/Let-s_Learn_ReactJS"}>
				 <img src={reactLogo} alt="ReactJS Logo" class="logo"></img>
				</Link>
			</div>
			<div >
				<Link to={"https://portfolio1-three-silk.vercel.app"}>
				 <img src={logoT} alt="Logo T" class="logo"></img>
				</Link>
			</div>
		</nav>
	);
};

export default NavBar;
