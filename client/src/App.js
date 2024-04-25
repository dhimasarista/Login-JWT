import React from 'react';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import { Navigate  } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import EmployeesPage from './pages/EmployeesPage';

function App() {
  const NotFound = () => <Navigate to="/" replace={true} />;
  // jika path === /employees && sessionStorage.getItem('jwtToken') === null
  // redirect to /login
  // else /login
  // if server response error: 'Forbidden' alihkan kehalaman /login
  const jwtToken = sessionStorage.getItem('jwtToken');

  const isLoggedIn = () => {
    return jwtToken !== null;
  };
  return (
    <Router>
      <div className="App">
        <Routes >
          <Route path="/" exact element={<HomePage/>} />
          <Route path="/login" element={isLoggedIn() ? <Navigate to="/employees" /> : <LoginPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes >
      </div>
    </Router>
  );
}

export default App;
