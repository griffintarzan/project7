import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateCrewmate from './components/CreateCrewmate';
import EditCrewmate from './components/EditCrewmate';
import CrewmateDetail from './components/CrewmateDetail';
import CrewmateList from './components/CrewmateList';

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1>👾 Crewmates Builder</h1>
        <Routes>
          <Route path="/" element={<CrewmateList />} />
          <Route path="/new" element={<CreateCrewmate />} />
          <Route path="/edit/:id" element={<EditCrewmate />} />
          <Route path="/crewmate/:id" element={<CrewmateDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;