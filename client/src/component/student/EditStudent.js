import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditStudent = () => {
	let navigate = useNavigate();
	const { id } = useParams();

	const [student, setStudent] = useState({
		firstName: "",
		lastName: "",
		email: "",
		department: "",
	});

	const [loading, setLoading] = useState(true);
	const [studentExists, setStudentExists] = useState(true);

	const { firstName, lastName, email, department } = student;

	useEffect(() => {
		loadStudent();
	}, []);

	// ✅ Load Student by ID
const loadStudent = async () => {
	try {
		const token = localStorage.getItem("token");
		const result = await axios.get(
			`${process.env.REACT_APP_API_URL}/student/student-profile/${id}`,
			{
				headers: {
					Authorization: `${token}`,
				},
			}
		);

		if (result.status === 200) {
			setStudent(result.data.data);
			setLoading(false);
		}
	} catch (error) {
		setLoading(false);
		console.error("Error loading student:", error);

		if (error.response && error.response.status === 404) {
			setStudentExists(false);
			toast.error("⚠️ Student not found! Check the ID.", {
				position: "top-center",
				autoClose: 1500,
				theme: "dark",
			});
		} else {
			toast.error("❌ Error loading student details!", {
				position: "top-center",
				autoClose: 1500,
				theme: "dark",
			});
		}
	}
};


	// ✅ Handle Input Change
	const handleInputChange = (e) => {
		setStudent({
			...student,
			[e.target.name]: e.target.value,
		});
	};

	// ✅ Update Student Handler
const updateStudent = async (e) => {
	e.preventDefault();

	try {
		const token = localStorage.getItem("token");
		const result = await axios.put(
			`${process.env.REACT_APP_API_URL}/student/edit-student/${id}`,
			student,
			{
				headers: {
					Authorization: `${token}`,
				},
			}
		);

		if (result.status === 200) {
			toast.success("✅ Student updated successfully!", {
				position: "top-center",
				autoClose: 1200,
				theme: "colored",
			});

			setTimeout(() => {
				navigate("/student/all-students");
			}, 1300);
		}
	} catch (error) {
		console.error("Error updating student:", error);
		toast.error("⚠️ Failed to update student. Please try again.", {
			position: "top-center",
			autoClose: 1500,
			theme: "dark",
		});
	}
};


	return (
		<div className="col-sm-8 py-4 px-5 offset-2 shadow">
			<ToastContainer />

			{/* Show Loading Spinner */}
			{loading ? (
				<div className="text-center mt-5">
					<div
						className="spinner-border text-primary"
						role="status"
					>
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			) : !studentExists ? (
				// 🚨 Student Not Found Message
				<div className="text-center mt-5">
					<h3 className="text-danger">⚠️ Student not found!</h3>
					<Link
						to="/student/all-students"
						className="btn btn-outline-info mt-3"
					>
						Go Back to Students List
					</Link>
				</div>
			) : (
				// 🎉 Edit Form
				<>
					<h2 className="mt-5 text-center">Edit Student</h2>
					<form onSubmit={(e) => updateStudent(e)}>
						<div className="input-group mb-4">
							<label
								className="input-group-text"
								htmlFor="firstName"
							>
								First Name
							</label>
							<input
								className="form-control"
								type="text"
								name="firstName"
								id="firstName"
								required
								value={firstName}
								onChange={(e) => handleInputChange(e)}
							/>
						</div>

						<div className="input-group mb-4">
							<label
								className="input-group-text"
								htmlFor="lastName"
							>
								Last Name
							</label>
							<input
								className="form-control"
								type="text"
								name="lastName"
								id="lastName"
								required
								value={lastName}
								onChange={(e) => handleInputChange(e)}
							/>
						</div>

						<div className="input-group mb-4">
							<label
								className="input-group-text"
								htmlFor="email"
							>
								Email
							</label>
							<input
								className="form-control"
								type="email"
								name="email"
								id="email"
								required
								value={email}
								onChange={(e) => handleInputChange(e)}
							/>
						</div>

						<div className="input-group mb-4">
							<label
								className="input-group-text"
								htmlFor="department"
							>
								Department
							</label>
							<input
								className="form-control"
								type="text"
								name="department"
								id="department"
								required
								value={department}
								onChange={(e) => handleInputChange(e)}
							/>
						</div>

						<div className="row mb-4">
							<div className="col-sm-2">
								<button
									type="submit"
									className="btn btn-outline-success btn-lg"
								>
									Update
								</button>
							</div>
							<div className="col-sm-2">
								<Link
									to="/student/all-students"
									className="btn btn-outline-warning btn-lg"
								>
									Cancel
								</Link>
							</div>
						</div>
					</form>
				</>
			)}
		</div>
	);
};

export default EditStudent;
