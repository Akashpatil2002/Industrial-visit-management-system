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
<<<<<<< HEAD
          <Route path="/" element={<Admin />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={Login} />
=======
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
        </Routes>
      </div>
    </Router>
  );
}

export default App;
