import React, { useState } from "react";
import "./MyAccount.css"; // Import the stylesheet

const MyAccount = () => {
	const initialUserData = {
		firstName: "John",
		lastName: "Doe",
		email: "john@example.com",
		phoneNumber: "123-456-7890",
		password: "",
		newPassword: "",
		confirmNewPassword: "",
	};

	const [userData, setUserData] = useState(initialUserData);
	const [isEditing, setIsEditing] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
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

	const saveChanges = () => {
		// Logic to save changes
		console.log("Changes saved:", userData);
		setIsEditing(false);
	};

	const cancelEdit = () => {
		setUserData(initialUserData);
		setIsEditing(false);
	};

	return (
		<div className="my-account">
			<h3>My Account</h3>
			<div className="form-container">
				<div className="row">
					<div className="col-md-6 left-div">
						<form>
							<div className="form-row">
								<div className="form-group col-md-12">
									<label htmlFor="firstName">First Name</label>
									<input
										type="text"
										className="form-control"
										id="firstName"
										name="firstName"
										value={userData.firstName}
										onChange={handleInputChange}
										readOnly={!isEditing}
									/>
								</div>
								<div className="form-group col-md-12">
									<label htmlFor="lastName">Last Name</label>
									<input
										type="text"
										className="form-control"
										id="lastName"
										name="lastName"
										value={userData.lastName}
										onChange={handleInputChange}
										readOnly={!isEditing}
									/>
								</div>
							</div>
							<div className="form-row">
								<div className="form-group col-md-12">
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
								</div>
								<div className="form-group col-md-12">
									<label htmlFor="phoneNumber">Phone Number</label>
									<input
										type="tel"
										className="form-control"
										id="phoneNumber"
										name="phoneNumber"
										value={userData.phoneNumber}
										onChange={handleInputChange}
										readOnly={!isEditing}
									/>
								</div>
							</div>

							{isEditing && (
								<>
									<div className="form-row">
										<div className="form-group col-md-12">
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
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md-12">
											<label htmlFor="password">Password</label>
											<input
												type="password"
												className="form-control"
												id="password"
												name="password"
												value={userData.password}
												onChange={handleInputChange}
											/>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md-12">
											<label htmlFor="newPassword">New Password</label>
											<input
												type="password"
												className="form-control"
												id="newPassword"
												name="newPassword"
												value={userData.newPassword}
												onChange={handleInputChange}
											/>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md-12">
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
							<div className="form-row">
								<div className="form-group col-md-12">
									{isEditing ? (
										<>
											<button type="button" className="btn btn-primary mr-2" onClick={saveChanges}>
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
					<div className="col-md-6 right-div">
            <img src={require("./profile_picture.jpg")} alt="Profile Pic" className="profile-picture"/>
          </div>
				</div>
			</div>
		</div>
	);
};

export default MyAccount;
