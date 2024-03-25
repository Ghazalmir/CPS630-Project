import React, { useEffect, useState } from "react";
import "./style.css";

function ReportedUsers() {
  const [reportedUsers, setReportedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/reported-users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setReportedUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        setError(error.toString());
        setIsLoading(false);
      });
  }, []);
  const handleDeleteUser = (userId) => {
    // Assuming API endpoint for deleting a reported user might look something like this
    fetch(`http://localhost:3000/api/reported-users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete reported user");
        }
        // Remove the user from the state to update the UI
        setReportedUsers(reportedUsers.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Delete error:", error);
        setError(error.toString());
      });
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading reported users: {error}</div>;

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
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
          <a href="./ReportedUsers" className="active">
            Reported Users
          </a>
          <a href="./ManageUsers">Manage Users</a>
        </section>
        <section className="reportedUsers">
          {reportedUsers.map((user) => (
            <article key={user.id}>
              <p>
                Reported For: <span>{user.reason}</span>
              </p>
              <div className="deleteUserContainer">
                <p>{user.name}</p>
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete User
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default ReportedUsers;
