import React, { useState, useEffect } from "react";
import classes from "./MyAccount.module.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


const MyAccount = () => {
	
	const [initialUserData, setInitialUserData] = useState()
	const [userData, setUserData] = useState();
	const [isEditing, setIsEditing] = useState(false);
	const [loading, setLoading] = useState(true);


	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get("http://localhost:8080/api/profile/details", {
					headers: {
						authorization: sessionStorage.getItem("token"),
					},
					params: {
						signedInUserID: jwtDecode(sessionStorage.getItem("token")).id
					}
				});
				setUserData(response.data[0]);
				setInitialUserData(response.data[0])
				console.log(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching user data:", error);
				setLoading(false);
			}
		};
	
		fetchUserData();
	}, []);
	
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		console.log(name, value)
		console.log({ ...userData, [name]: value })
		setUserData({ ...userData, [name]: value });
	};

	const toggleEditMode = () => {
		setIsEditing(!isEditing);
	};

	function fileUpload(event) {
		if (!event.target.files || !window.FileReader) return;

		var files = [];
		var filesArr = Array.prototype.slice.call(event.target.files);
		files.push(...filesArr);
		files.forEach(function (f) {
			if (!f.type.match("image.*")) {
				return;
			}

			var reader = new FileReader();
			reader.onload = function (event) {
				var html =
					"<img style='max-height:100px;' class='mt-3' src=\"" +
					event.target.result +
					'">' +
					"   " +
					f.name +
					'<br clear="left"/>';
			};
			reader.readAsDataURL(f);
		});
	}

	const saveChanges = async () => {
		try {
				await axios.put("http://localhost:8080/api/profile/update", userData)
		} catch (error) {
			console.error("Error saving changes", error)
		}
		setIsEditing(false);
	};

	const cancelEdit = () => {
		setUserData(initialUserData);
		setIsEditing(false);
	};

	return (
		<>
			{loading ? (
				<div>Loading...</div>
			) : (
				<div className={classes.myAccount}>
					<h3>My Account</h3>
					<div className={`form-container ${classes.formContainer}`}>
						<div className="row">
							<div className="col-md-6">
								<form>
									<div className={`form-row ${classes.formRow}`}>
										<div className={`form-group ${classes.formGroup} col-md-12`}>
											<label htmlFor="firstName">First Name</label>
											<input
												type="text"
												className="form-control"
												id="firstName"
												name="first_name"
												value={userData.first_name}
												onChange={handleInputChange}
												readOnly={!isEditing}
											/>

											<label htmlFor="lastName">Last Name</label>
											<input
												type="text"
												className="form-control"
												id="lastName"
												name="last_name"
												value={userData.last_name}
												onChange={handleInputChange}
												readOnly={!isEditing}
											/>
										</div>

										<label htmlFor="email">Email</label>
										<input
											type="email"
											className="form-control"
											id="email"
											name="email"
											value={userData.email}
											onChange={handleInputChange}
											readOnly={!isEditing}
										/>

										<label htmlFor="phoneNumber">Phone Number</label>
										<input
											type="tel"
											className="form-control"
											id="phoneNumber"
											name="phone_number"
											value={userData.phone_number}
											onChange={handleInputChange}
											readOnly={!isEditing}
										/>
									</div>

									{isEditing && (
										<>
											<div className={`form-row ${classes.formRow}`}>
												<div className={`form-group ${classes.formGroup} col-md-12`}>
													<label htmlFor="formFile" className="form-label">
														Profile Picture <span className="text-danger">*</span>
													</label>
													<input
														onChange={(event) => {
															fileUpload(event);
														}}
														className="form-control bg-body-tertiary"
														type="file"
														id="formFile"
														accept=".jpg,.png"
													/>

													<label htmlFor="password">Password</label>
													<input
														type="password"
														className="form-control"
														id="password"
														name="password"
														value={userData.password}
														onChange={handleInputChange}
													/>

													<label htmlFor="newPassword">New Password</label>
													<input
														type="password"
														className="form-control"
														id="newPassword"
														name="newPassword"
														value={userData.newPassword}
														onChange={handleInputChange}
													/>

													<label htmlFor="confirmNewPassword">Confirm New Password</label>
													<input
														type="password"
														className="form-control"
														id="confirmNewPassword"
														name="confirmNewPassword"
														value={userData.confirmNewPassword}
														onChange={handleInputChange}
													/>
												</div>
											</div>
										</>
									)}
									<div className={`form-row ${classes.formRow}`}>
										<div className={`form-group ${classes.formGroup} col-md-12`}>
											{isEditing ? (
												<>
													<button type="button" className="btn btn-primary me-2" onClick={saveChanges}>
														Save
													</button>
													<button type="button" className="btn btn-secondary" onClick={cancelEdit}>
														Cancel
													</button>
												</>
											) : (
												<button type="button" className="btn btn-primary" onClick={toggleEditMode}>
													Edit
												</button>
											)}
										</div>
									</div>
								</form>
							</div>
							<div className={`col-md-6 ${classes.rightDiv}`}>
								<img src={require("./profile_picture.jpg")} alt="Profile Pic" className={classes.profilePicture} />
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default MyAccount;
