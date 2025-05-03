import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from "../common/Search";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentsView = () => {
	const [students, setStudents] = useState([]);
	const [search, setSearch] = useState("");

	// 🔄 Reload once on first visit
	useEffect(() => {
		if (!sessionStorage.getItem("studentsViewReloaded")) {
			sessionStorage.setItem("studentsViewReloaded", "true");
			window.location.reload();
		}
	}, []);

	useEffect(() => {
		loadStudents();
	}, []);

	const loadStudents = async () => {
		const token = localStorage.getItem("token");
		const result = await axios.get(
			`${process.env.REACT_APP_API_URL}/student/all-students`,
			{
				headers: {
					Authorization: `${token}`,
				},
				validateStatus: () => true,
			}
		);
		if (result.status === 200) {
			setStudents(result.data.data);
		}
	};

	const handleDelete = async (id) => {
		try {
			const confirmDelete = window.confirm(
				"⚠️ Are you sure you want to delete this student?"
			);
			if (!confirmDelete) {
				toast.info("⏳ Deletion cancelled!", {
					position: "top-center",
					autoClose: 1000,
					theme: "dark",
				});
				return;
			}
			const token = localStorage.getItem("token");
			const result = await axios.delete(
				`${process.env.REACT_APP_API_URL}/student/delete/${id}`,
				{
					headers: {
						Authorization: `${token}`,
					},
					validateStatus: () => true,
				}
			);
			if (result.status === 200) {
				toast.success("✅ Student deleted successfully!🛑", {
					position: "top-center",
					autoClose: 1500,
					theme: "dark",
				});
				loadStudents();
			} else {
				toast.error("❌ Failed to delete student. Please try again.", {
					position: "top-center",
					autoClose: 1500,
					theme: "dark",
				});
			}
		} catch (error) {
			toast.error("❌ Error deleting student!", {
				position: "top-center",
				autoClose: 1500,
				theme: "dark",
			});
			console.error("Error:", error.message);
		}
	};

	return (
		<section>
			<ToastContainer />
			<Search search={search} setSearch={setSearch} />
			<table className="table table-bordered table-hover shadow">
				<thead>
					<tr className="text-center">
						<th>ID</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Department</th>
						<th colSpan="3">Actions</th>
					</tr>
				</thead>
				<tbody className="text-center">
					{students
						.filter((st) =>
							st.firstName.toLowerCase().includes(search)
						)
						.map((student, index) => (
							<tr key={student._id}>
								<th scope="row">{index + 1}</th>
								<td>{student.firstName}</td>
								<td>{student.lastName}</td>
								<td>{student.email}</td>
								<td>{student.department}</td>
								<td>
									<Link
										to={`/student/student-profile/${student._id}`}
										className="btn btn-info">
										<FaEye />
									</Link>
								</td>
								<td>
									<Link
										to={`/student/edit-student/${student._id}`}
										className="btn btn-warning">
										<FaEdit />
									</Link>
								</td>
								<td>
									<button
										className="btn btn-danger"
										onClick={() =>
											handleDelete(student._id)
										}>
										<FaTrashAlt />
									</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</section>
	);
};

export default StudentsView;
