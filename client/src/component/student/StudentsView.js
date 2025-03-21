import React, {
	useEffect,
	useState,
} from "react";
import axios from "axios";
import {
	FaEdit,
	FaEye,
	FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from "../common/Search";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentsView = () => {
	const [students, setStudents] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		loadStudents();
	}, []);

	const loadStudents = async () => {  
		const result = await axios.get(
			// "http://localhost:9007/student/all-students",
			`${process.env.REACT_APP_API_URL}/student/all-students`,
			{
				validateStatus: () => {
					return true;
				},
			}
		);
		// console.log(result);
		if (result.status === 200) {
			setStudents(result.data.data);
		}
	};

	// const handleDelete = async (id) => {
	// 	await axios.delete(
	// 		`http://localhost:9007/student/delete/${id}`
	// 	);
	// 	loadStudents();
	// };
// const handleDelete = async (id) => {
// 	try {
// 		const result = await axios.delete(
// 			`${process.env.REACT_APP_API_URL}/student/delete/${id}`
// 		);
// 		if (result.status === 200) {
// 			toast.success("Student deleted successfully!", {
// 				position: "top-center",
// 				autoClose: 1500,
// 				hideProgressBar: false,
// 				closeOnClick: true,
// 				pauseOnHover: true,
// 				draggable: true,
// 				theme: "dark",
// 			});
// 			loadStudents(); // Reload students after deletion
// 		} else {
// 			toast.error("Failed to delete student. Please try again.");
// 		}
// 	} catch (error) {
// 		toast.error("Error deleting student!");
// 		console.error("Error:", error.message);
// 	}
// };
const handleDelete = async (id) => {
	try {
		// 🚨 Confirm before deleting
		const confirmDelete = window.confirm(
			"⚠️ Are you sure you want to delete this student?"
		);

		// 🛑 Stop if user clicks "Cancel"
		if (!confirmDelete) {
			toast.info("⏳ Deletion cancelled!", {
				position: "top-center",
				autoClose: 1000,
				theme: "dark",
			});
			return;
		}

		// ✅ Proceed with deletion
		const result = await axios.delete(
			`${process.env.REACT_APP_API_URL}/student/delete/${id}`
		);

		if (result.status === 200) {
			toast.success("✅ Student deleted successfully!🛑", {
				position: "top-center",
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: "dark",
			});

			// Reload students after deletion
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
			<Search
				search={search}
				setSearch={setSearch}
			/>
			<table className="table table-bordered table-hover shadow">
				<thead>
					<tr className="text-center">
						<th>ID</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Depatment</th>
						<th colSpan="3">Actions</th>
					</tr>
				</thead>

				<tbody className="text-center">
					{students
						.filter((st) =>
							st.firstName
								.toLowerCase()
								.includes(search)
						)
						.map((student, index) => (
							<tr key={student._id}>
								<th scope="row" key={index}>
									{index + 1}
								</th>
								<td>{student.firstName}</td>
								<td>{student.lastName}</td>
								<td>{student.email}</td>
								<td>{student.department}</td>
								<td className="mx-2">
									<Link
										to={`/student/student-profile/${student._id}`}
										className="btn btn-info">
										<FaEye />
									</Link>
								</td>
								<td className="mx-2">
									<Link
										to={`/student/edit-student/${student._id}`}
										className="btn btn-warning">
										<FaEdit />
									</Link>
								</td>
								<td className="mx-2">
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
