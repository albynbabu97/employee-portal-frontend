import React from "react";
import "./users.scss";

const Users = () => {
  const users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <div className="users-page">
      <h1 className="heading">User List</h1>
      <p className="tagline">Here is the list of users</p>

      <div className="users-list">
        <table>
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date of Birth</th>
              <th>Project</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item}>
                <td>1</td>
                <td>Albyn Babu</td>
                <td>albynbabu97@gmail.com</td>
                <td>+91 9947869202</td>
                <td>16.05.1997</td>
                <td>Bozzuto</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
