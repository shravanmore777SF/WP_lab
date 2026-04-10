import React, { useState, useEffect } from 'react';
import { Plus, Download, Database, Mail, User } from 'lucide-react';

// Activity components consolidated for easy screenshotting
const App = () => {
  const [count, setCount] = useState(0);
  const [simData, setSimData] = useState(null);
  const [users] = useState([
    { id: 1, name: "Grumpy Cat", email: "no@cats.com" },
    { id: 2, name: "Crying Cat", email: "sob@cats.com" }
  ]);

  // Activity 1: Mount Log
  useEffect(() => { console.log("🐾 Activity 1: Loaded!"); }, []);

  // Activity 2: Dependency Experiments
  useEffect(() => { console.log("🐱 [No Dep] Updated"); });
  useEffect(() => { console.log("🐱 [Empty Dep] Mounted"); }, []);
  useEffect(() => { console.log(`🐱 [Count Dep] ${count}`); }, [count]);

  // Activity 3: Simulation (setTimeout)
  useEffect(() => {
    setTimeout(() => setSimData({ msg: "Data Fetched! 🐟" }), 2000);
  }, []);

  // Activity 4 & 5: Fetch & Async/Await
  const handleFetch = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(res => res.json()).then(data => console.log("A4:", data));
  };

  const handleAsync = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/2');
      console.log("A5:", await res.json());
    } catch (e) { console.error(e); }
  };

  return (
    <div className="app-container">
      <header className="nav-header">
        <h1>Web programming lab: Recitation Exp 9</h1>
      </header>

      <div className="activities-grid">
        <section className="glass-card">
          <h3>A1: Mount Log & A2: Counter</h3>
          <p>Count: {count}</p>
          <button className="btn-cat" onClick={() => setCount(c => c + 1)}><Plus size={16}/> Increment</button>
          <img src="https://cataas.com/cat/says/A1-A2?fontSize=15&fontColor=white" className="meme-cat-img" />
        </section>

        <section className="glass-card">
          <h3>A3: Timeout Simulation</h3>
          {!simData ? <p>Loading... 🐈</p> : <p>{simData.msg}</p>}
          <img src="https://cataas.com/cat/says/A3%20Done?fontSize=15&fontColor=white" className="meme-cat-img" />
        </section>

        <section className="glass-card">
          <h3>A4 & A5: Fetch API</h3>
          <div style={{display:'flex', gap:'5px'}}>
            <button className="btn-cat" onClick={handleFetch}><Download size={16}/> Fetch</button>
            <button className="btn-cat" onClick={handleAsync}><Database size={16}/> Async</button>
          </div>
          <img src="https://cataas.com/cat/says/A4-A5?fontSize=15&fontColor=white" className="meme-cat-img" />
        </section>

        <section className="glass-card">
          <h3>A6: List Rendering</h3>
          {users.map(u => (
            <div key={u.id} className="list-item">
              <User size={14}/> <b>{u.name}</b> | <Mail size={14}/> {u.email}
            </div>
          ))}
          <img src="https://cataas.com/cat/says/A6%20Council?fontSize=15&fontColor=white" className="meme-cat-img" />
        </section>
      </div>
    </div>
  );
};

export default App;
