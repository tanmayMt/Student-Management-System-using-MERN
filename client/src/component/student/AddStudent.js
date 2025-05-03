import { useState } from "react";
import {
	Link,
	useNavigate,
} from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStudent = () => {
	let navigate = useNavigate();
	const [student, setStudent] = useState({
		firstName: "",
		lastName: "",
		email: "",
		department: "",
	});
	const {
		firstName,
		lastName,
		email,
		department,
	} = student;

	const handleInputChange = (e) => {
		setStudent({
			...student,
			[e.target.name]: e.target.value,
		});
	};

const saveStudent = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token"); // Get token from localStorage

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/student/add-student`,
      student,
      {
        headers: {
          Authorization: `${token}`, // ⬅️ Add token here
        },
      }
    );

    toast.success("Student added successfully!", {
      position: "top-center",
      autoClose: 1300,
      theme: "dark",
    });

    setTimeout(() => {
      navigate("/student/all-students");
    }, 1300);
  } catch (error) {
    console.error("Error Adding the student:", error);
    if (error.response && error.response.status === 400) {
      toast.error("⚠️ Email already exists. Please use a different email.", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
      });
    } else {
      toast.error("❌ Error adding student. Please try again!", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
      });
    }
  }
};


	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<ToastContainer /> {/* ✅ Add Toast Container */}
			<h2 className="mt-5"> Add Student</h2>
			<form onSubmit={(e) => saveStudent(e)}>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="fristName">
						First Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="firstName"
						id="firstName"
						required
						value={firstName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="lastName">
						Last Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="lastName"
						id="lastName"
						required
						value={lastName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="email">
						Your Email
					</label>
					<input
						className="form-control col-sm-6"
						type="email"
						name="email"
						id="email"
						required
						value={email}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="department">
						Department
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="department"
						id="department"
						required
						value={department}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="row mb-5">
					<div className="col-sm-2">
						<button
							type="submit"
							className="btn btn-outline-success btn-lg">
							Save
						</button>
					</div>

					<div className="col-sm-2">
						<Link
							to={"/student/allStudents"}
							type="submit"
							className="btn btn-outline-warning btn-lg">
							Cancel
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddStudent;
