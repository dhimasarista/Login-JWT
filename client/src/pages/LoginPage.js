import React, { useState } from 'react';
// import { useNavigate  } from 'react-router-dom';
import '../LoginPage.css'; // Import CSS file for styling

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const history = useNavigate ();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Lakukan proses login untuk mendapatkan token dari server
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const data = await response.json();
      const token = data.token;

      // Simpan token ke sessionStorage
      sessionStorage.setItem('jwtToken', token);

      // Alihkan ke halaman /employees setelah berhasil login
      // history('/employees');
      window.location.href = '/employees';
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message || 'Login failed. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
}

export default LoginPage;
