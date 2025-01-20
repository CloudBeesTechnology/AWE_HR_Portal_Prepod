import React from "react";

import "../../../../src/index.css";
export const ScrollableTable = () => {
  const data = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: ["Developer", "Designer", "Manager", "Analyst"][i % 4],
    department: ["Engineering", "Marketing", "Finance", "HR"][i % 4],
    location: ["New York", "San Francisco", "Chicago", "Austin"][i % 4],
    joiningDate: `202${i % 10}-0${(i % 12) + 1}-15`,
    status: i % 2 === 0 ? "Active" : "Inactive",
  }));

  return (
    <div className="table-wrapper">
      <div className="table-scrollable">
        <table className="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
              <th>Location</th>
              <th>Joining Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.role}</td>
                <td>{row.department}</td>
                <td>{row.location}</td>
                <td>{row.joiningDate}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
