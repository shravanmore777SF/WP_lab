import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Step 7.3: Call backend GET API
  const fetchUsers = () => {
    setLoading(true);
    fetch('http://localhost:3000/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Submit new user via POST
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, age: Number(age) })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const newUser = await response.json();
      setUsers(prev => [...prev, newUser]);
      setName('');
      setEmail('');
      setAge('');
      setMessage({ text: `User "${newUser.name}" added successfully!`, type: 'success' });
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setSubmitting(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 4000);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-glow"></div>
        <h1>
          <span className="icon">🗄️</span> User Directory
        </h1>
        <p className="subtitle">Experiment 11 — MongoDB + Express + React Integration</p>
      </header>

      <main className="app-main">
        {/* Add User Form */}
        <section className="card form-card">
          <h2>
            <span className="section-icon">➕</span> Add New User
          </h2>
          <form onSubmit={handleSubmit} className="user-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="e.g. John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="e.g. john@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age (min 18)</label>
              <input
                id="age"
                type="number"
                placeholder="e.g. 25"
                value={age}
                onChange={e => setAge(e.target.value)}
                min="18"
                required
              />
            </div>
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? 'Saving...' : 'Save User'}
            </button>
          </form>
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.type === 'success' ? '✅' : '❌'} {message.text}
            </div>
          )}
        </section>

        {/* User List */}
        <section className="card list-card">
          <h2>
            <span className="section-icon">👥</span> Registered Users
            <span className="badge">{users.length}</span>
          </h2>

          {loading ? (
            <div className="loader-container">
              <div className="loader"></div>
              <p>Loading users from database...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📭</span>
              <p>No users found. Add one using the form above!</p>
            </div>
          ) : (
            <div className="user-grid">
              {/* Step 8: Display Data Dynamically */}
              {users.map((user, index) => (
                <div
                  key={user._id}
                  className="user-card"
                  style={{ animationDelay: `${index * 0.07}s` }}
                >
                  <div className="user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-info">
                    <h3>{user.name}</h3>
                    <p className="user-email">📧 {user.email}</p>
                    <p className="user-age">🎂 Age: {user.age}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>Experiment 11 — Full-Stack MERN Application &bull; MongoDB &bull; Express &bull; React &bull; Node.js</p>
      </footer>
    </div>
  );
}

export default App;
