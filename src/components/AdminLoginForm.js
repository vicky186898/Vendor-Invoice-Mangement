import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const AdminLoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook to navigate

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        // Successful login
        setError('');
        // Call the onLogin function to update isLoggedIn state in the App component
        onLogin();
        // Redirect the user to the home page
        navigate('/');
        console.log('Login successful');
      } else {
        // Failed login
        setError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred while logging in');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" className="form-control" value={username} onChange={handleUsernameChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" className="form-control" value={password} onChange={handlePasswordChange} />
          </div>
          {error && <div className="text-danger mb-3">{error}</div>}
          <button type="submit" className="btn btn-primary btn-block">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginForm;
