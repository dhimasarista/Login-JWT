import React from 'react';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import EmployeesPage from './pages/EmployeesPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes >
          <Route path="/" exact element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/employees" element={<EmployeesPage/>} />
        </Routes >
      </div>
    </Router>
  );
}

export default App;