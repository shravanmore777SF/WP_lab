import React, { useState, useEffect } from 'react';

const UserList = () => {
  // Step 4: Initialize State
  const [users, setUsers] = useState([]); // Empty array for data
  const [loading, setLoading] = useState(true); // Loading starts as true
  const [error, setError] = useState(null); // Error starts as null

  // Step 5: Implement useEffect
  useEffect(() => {
    // Define the async function
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error("Failed to fetch data");
        
        const data = await response.json();
        setUsers(data); // Update state
      } catch (err) {
        setError(err.message); // Handle Errors
      } finally {
        setLoading(false); // Set loading to false regardless of outcome
      }
    };

    fetchUsers(); // Call the function
  }, []); // Empty array ensures it runs ONLY once on mount

  // Step 6 & 7: Conditional Rendering
  if (loading) return (
    <div className="loading-container">
      <img src="https://cataas.com/cat/says/Searching...?fontSize=20&fontColor=white" alt="Searching" className="meme-cat-img" />
      <div className="loading">Loading Users...</div>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <img src="https://cataas.com/cat/says/404%20Cat?fontSize=20&fontColor=white" alt="Error" className="meme-cat-img" />
      <div className="error">Error: {error}</div>
    </div>
  );

  // Step 8: Dynamic Rendering
  return (
    <div className="container">
      <h2>User Directory</h2>
      <div className="user-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Company:</strong> {user.company.name}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
