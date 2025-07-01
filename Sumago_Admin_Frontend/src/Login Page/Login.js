<<<<<<< HEAD
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import '../assets/css/Login.css';
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
import { Button } from 'react-bootstrap';
import logo from '../assets/img/SCOPE FINAL LOGO Black new 1.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1010/U1/Adminlogin', {
=======
  // ✅ Clears email and password fields on page refresh
  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1010/U1/login1', {
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
        email,
        password
      });
      setMessage(response.data.msg);
      localStorage.setItem('authToken', response.data.token);
      setTimeout(() => {
        history.push('/admin/dashboard');
      }, 1000);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      const response = await axios.post('http://localhost:1010/U1/ResetPasswordRequest', {
=======
      const response = await axios.post('http://localhost:1010/U1/ResetPasswordRequest1', {
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
        email
      });
      setMessage(response.data.msg);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
<<<<<<< HEAD
   
        
    

<div style={styles.container}>
    <div style={styles.loginContainer}>
      <img src={logo} alt="Logo" style={styles.logo} />
      <h3 style={styles.header}>Admin Login</h3>
=======
    <div style={styles.container}>
    <div style={styles.loginContainer}>
      <img src={logo} alt="Logo" style={styles.logo} />
      <h3 style={styles.header}>College Login</h3>
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
      <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <Button variant="primary" type="submit" style={styles.button}>
          Login
        </Button>

        {/* ✅ Display the error message below the form */}
        {message && <p style={styles.message}>{message}</p>}
      </form>

      <div style={styles.options}>
<<<<<<< HEAD
          <a href="#" onClick={handleResetPassword} style={styles.link}>
            Forgot Password?
          </a>
        </div>
=======
        <a style={styles.link}>Forgot</a>
        <a href="#" onClick={handleResetPassword} style={styles.sign}>
          {" "}
          Username / Password?
        </a>
        <br />
        <Link to="register">
          <a style={styles.link}>Don't have an account?</a>
          <a style={styles.sign}> Sign Up</a>
        </Link>
      </div>
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
    </div>
  </div>
);
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '95vh',
<<<<<<< HEAD
    backgroundColor: '#000000'
=======
    backgroundColor: '#000000',
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
  },
  loginContainer: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '400px'
  },
  logo: {
    maxWidth: '100%',
    height: 'auto',
    marginBottom: '1rem'
  },
  header: {
    marginBottom: '1rem'
  },
  form: {
    marginBottom: '1rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  button: {
    width: '80%',
    padding: '0.75rem',
    marginTop: '1rem',
    backgroundColor: '#000000',
    color: 'white',
  },
  options: {
    marginTop: '1rem',
  },
  link: {
<<<<<<< HEAD
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '0.9rem',
  },
  or: {
    margin: '0 0.5rem',
=======
    color: 'black',
    textDecoration: 'none',
    fontSize: '0.9rem',
  },
  sign: {
    color: 'blue',
    fontSize: '0.9rem',
    textDecoration: 'none',
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
  },
  message: {
    marginTop: '1rem',
    color: '#d9534f',
  }
};

export default Login;
