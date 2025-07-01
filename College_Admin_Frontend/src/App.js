import React, { useState } from 'react';
import Admin from './layouts/Admin';
import Login from "./Login Page/Login";
import Register from 'Register Page/Register';
// import LocationDashboard from './Components/LocationDashboard.jsx';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
