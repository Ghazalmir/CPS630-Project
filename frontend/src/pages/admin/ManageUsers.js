import React, { useEffect, useState } from "react";
import "./style.css";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
  });

  useEffect(() => {
    // Placeholder for API endpoint
    fetch("http://localhost:3000/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleSelectChange = (event) => {
    const userId = Number(event.target.value);
    const user = users.find((u) => u.id === userId);
    setSelectedUser(user);
    setEditFormData({
      ...user,
    });
  };

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEditFormData({
      ...editFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Placeholder for update API endpoint
    const updateUserEndpoint = `http:/localhost:3000/api/users/${selectedUser.id}`;

    // Example using fetch to update the user
    fetch(updateUserEndpoint, {
      method: "PUT", // or 'PATCH'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editFormData),
    })
      .then((response) => response.json())
      .then(() => {
        console.log("User updated successfully");
        // Refresh the user list or update the UI as needed
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  return (
    <div>
      <link rel="stylesheet" href="./style.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />

      <main>
        <section className="links">
          <a href="./ReportedAds">Reported Ads</a>
          <a href="./ReportedUsers">Reported Users</a>
          <a href="./ManageUsers" className="active">
            Manage Users
          </a>
        </section>
        <section>
          <select onChange={handleSelectChange} value={selectedUser.id || ""}>
            <option>Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {selectedUser.id && (
            <section>
              <form onSubmit={handleSubmit}>
                <h3>Edit User Profile</h3>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleFormChange}
                    placeholder="Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleFormChange}
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    value={editFormData.phone}
                    onChange={handleFormChange}
                    placeholder="Phone"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={editFormData.username || ""}
                    onChange={handleFormChange}
                    placeholder="Username"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status:</label>
                  <select
                    id="status"
                    name="status"
                    value={editFormData.status || ""}
                    onChange={handleFormChange}
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role:</label>
                  <input
                    id="role"
                    type="text"
                    name="role"
                    value={editFormData.role || ""}
                    onChange={handleFormChange}
                    placeholder="Role"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="isAdmin">Make Admin:</label>
                  <input
                    id="isAdmin"
                    type="checkbox"
                    name="isAdmin"
                    checked={editFormData.isAdmin}
                    onChange={handleFormChange}
                  />
                </div>
                {/* Consider adding a password change section, with appropriate security considerations */}
                <button type="submit">Save Changes</button>
              </form>
            </section>
          )}
        </section>
      </main>
    </div>
  );
}

export default ManageUsers;
