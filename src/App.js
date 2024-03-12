import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AddInvoiceForm from './components/AddInvoiceForm';
import InvoiceList from './components/InvoiceList';
import Home from './components/Home'; // Import the Home component
import AdminLoginForm from './components/AdminLoginForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <Sidebar isLoggedIn={isLoggedIn} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/invoice-form" element={<AddInvoiceForm />} />
            {isLoggedIn && <Route path="/invoice-list" element={<InvoiceList />} />} {/* Render InvoiceList route only when admin is logged in */}
            <Route path="/admin-login" element={<AdminLoginForm onLogin={handleLogin} />} /> {/* Add this route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Sidebar({ isLoggedIn }) {
  return (
    <div className="sidebar">
      <h3>Vendor Invoice Management</h3>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/invoice-form">Invoice Form</Link>
        </li>
        {isLoggedIn && <li><Link to="/invoice-list">Invoice List</Link></li>} {/* Render Invoice List link only when admin is logged in */}
        <li>
          <Link to="/admin-login">Admin Login</Link> {/* Link to the admin login page */}
        </li>
      </ul>
    </div>
  );
}

export default App;
