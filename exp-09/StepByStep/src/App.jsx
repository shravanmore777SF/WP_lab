import React from 'react';
import UserList from './UserList';

function App() {
  return (
    <div className="App">
      <header className="main-header">
        <h1>Web programming lab:Exp 9</h1>
        <p>St. Francis Institute of Technology | SE – AIML</p>
      </header>
      <main>
        <UserList />
      </main>
      <footer className="main-footer">
        <p>&copy; 2026 Experiment 9 - Side Effects & API Calls</p>
      </footer>
    </div>
  );
}

export default App;
