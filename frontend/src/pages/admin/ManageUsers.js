import React from 'react';
import './style.css';
function ManageUsers() {
      return (
        <div>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <link rel="stylesheet" href="./style.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
          <main>
            <section className="links">
              <a href="./ReportedAds">Reported Ads</a>
              <a href="./ReportedUsers">Reported Users</a>
              <a href="./ManageUsers" className="active">Manage Users</a>
            </section>
            <section>
              <form action="#" method="post">
                <h2>Name LastName</h2>
                <h3>Edit User Profile</h3>
                <div className="grid-box">
                  <div className="row">
                    <label htmlFor="fname">First Name</label>
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id="fname" placeholder="Md" />
                    <input type="text" id="lname" placeholder="Rimel" />
                  </div>
                  <div className="row">
                    <label htmlFor="email">Email</label>
                    <label htmlFor="phone">Phone</label>
                    <input type="text" id="email" placeholder="demo111@gmail.com" />
                    <input type="text" id="phone" placeholder={883287282782} />
                  </div>
                  <label htmlFor="passChange">Password Changes</label>
                  <input type="password" id="passChange" placeholder="Current Password" />
                  <input type="password" placeholder="New Password" />
                  <input type="password" placeholder="Confirm New Password" />
                  <div className="flex">
                    <span>Make Admin</span>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round" />
                    </label>
                  </div>
                  <div>
                    <input type="button" defaultValue="Cancel" />
                    <input type="button" defaultValue="Save Changes" />
                    <input type="button" defaultValue="Delete User" />
                  </div>
                </div>
              </form>
            </section>
          </main>
        </div>
      );
    }

  export default ManageUsers;