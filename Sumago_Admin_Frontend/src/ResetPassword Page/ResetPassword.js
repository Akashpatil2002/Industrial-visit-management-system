import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import logo from '../assets/img/SCOPE FINAL LOGO Black new 1.png';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const query = useQuery();
  const token = query.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      const response = await axios.post('http://localhost:1010/U1/UpdatePassword', {
=======
      const response = await axios.post('http://localhost:1010/U1/UpdatePassword1', {
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
        token,
        newPassword
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
    <div style={styles.container}>
  <div style={styles.loginContainer}>
    <img src={logo} alt="Logo" style={styles.logo} />
    <h2 style={styles.header}>Reset Password</h2>
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        style={styles.input}
      />
      <Button variant="primary" type="submit" style={styles.button}>
        Reset Password
      </Button>
    </form>
    {message && <p style={styles.message}>{message}</p>}
  </div>
</div>

  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    width: '100%',
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
    width: '100%',
    padding: '0.75rem',
    marginTop: '1rem',
  },
  message: {
    marginTop: '1rem',
    color: '#d9534f',
    textAlign: 'center',
  }
};

export default ResetPassword;
