import React, { useEffect, useState } from 'react';

// Task 6: Fetch in React
const StudentList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log("Backend not running? Make sure the Node server is active.");
      }
    };
    getUsers();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Student Roster (Experiment 11)</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
