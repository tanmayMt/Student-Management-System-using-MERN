import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentProfile = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);

	const [student, setStudent] = useState({
		firstName: "",
		lastName: "",
		email: "",
		department: "",
	});

	useEffect(() => {
		loadStudent();
	}, []);

	const loadStudent = async () => {
		try {
			const result = await axios.get(
				`${process.env.REACT_APP_API_URL}/student/student-profile/${id}`
			);

			if (result.status === 200) {
				setStudent(result.data.data);
				setLoading(false);
				// 🎉 Show success notification
				toast.success("✅ Student profile loaded successfully!", {
					position: "top-center",
					autoClose: 1200,
					theme: "colored",
				});
			}
		} catch (error) {
			setLoading(false);
			console.error("Error fetching student profile:", error);

			// 🚨 Show error if student not found
			if (error.response && error.response.status === 404) {
				toast.error("⚠️ Student not found! Check the ID.", {
					position: "top-center",
					autoClose: 1500,
					theme: "dark",
				});
			} else {
				toast.error("❌ Error fetching student details!", {
					position: "top-center",
					autoClose: 1500,
					theme: "dark",
				});
			}
		}
	};

	return (
		<section className="shadow" style={{ backgroundColor: "#f8f9fa" }}>
			<div className="container py-5">
				<ToastContainer />
				<div className="row justify-content-center">
					{loading ? (
						<div className="text-center">
							<div
								className="spinner-border text-primary"
								role="status"
							>
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>
					) : student && student.firstName ? (
						<>
							<div className="col-lg-3">
								<div className="card mb-4">
									<div className="card-body text-center">
										<img
											src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
											alt="avatar"
											className="rounded-circle img-fluid"
											style={{ width: 150 }}
										/>
										<h5 className="my-3">
											🎓{`${student.firstName} ${student.lastName}`}
										</h5>
										<div className="d-flex justify-content-center mb-2">
											<button
												type="button"
												className="btn btn-outline-primary me-2"
											>
												📞 Call
											</button>
											<button
												type="button"
												className="btn btn-outline-warning"
											>
												✉️ Message
											</button>
										</div>
									</div>
								</div>
							</div>

							<div className="col-lg-9">
								<div className="card mb-4">
									<div className="card-body">
										{/* Student Details */}
										<div className="row">
											<div className="col-sm-3">
												<h5 className="mb-0">First Name</h5>
											</div>
											<div className="col-sm-9 text-muted">
												{student.firstName}
											</div>
										</div>
										<hr />
										<div className="row">
											<div className="col-sm-3">
												<h5 className="mb-0">Last Name</h5>
											</div>
											<div className="col-sm-9 text-muted">
												{student.lastName}
											</div>
										</div>
										<hr />
										<div className="row">
											<div className="col-sm-3">
												<h5 className="mb-0">Email</h5>
											</div>
											<div className="col-sm-9 text-muted">
												{student.email}
											</div>
										</div>
										<hr />
										<div className="row">
											<div className="col-sm-3">
												<h5 className="mb-0">Department</h5>
											</div>
											<div className="col-sm-9 text-muted">
												{student.department}
											</div>
										</div>
									</div>
								</div>
							</div>
						</>
					) : (
						<div className="text-center text-danger">
							<h2>⚠️ Student not found! Please check the ID.</h2>
					<Link
						to="/student/all-students"
						className="btn btn-outline-primary mt-3"
					>
						⬅️ Go Back to Students List
					</Link>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default StudentProfile;