import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../assets/css/Registration.css';
import { Button } from 'react-bootstrap';
import logo from '../assets/img/SCOPE FINAL LOGO Black new 1.png';

const Register = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const history = useHistory();

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleChange = (input) => (e) => {
        setFormData({ ...formData, [input]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:1010/U1/Colpost', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            setMessage(response.data.msg);
            setTimeout(() => {
                history.push('/login');
            }, 1000);
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
            <div style={styles.registerContainer}>
                <img src={logo} alt="Logo" style={styles.logo} />
                <h2 style={styles.header}>Register</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    {step === 1 && (
                        <>
                            <input
                                type="text"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange('name')}
                                required
                                style={styles.input}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange('email')}
                                required
                                style={styles.input}
                            />
                            <Button variant="primary" onClick={nextStep} style={styles.button}>
                                Next
                            </Button>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <input
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange('password')}
                                required
                                style={styles.input}
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange('confirmPassword')}
                                required
                                style={styles.input}
                            />
                            <div style={styles.buttonGroup}>
                                <Button variant="secondary" onClick={prevStep} style={styles.prevButton}>
                                    Previous
                                </Button>
                                <Button variant="primary" type="submit" style={styles.button}>
                                    Register
                                </Button>
                            </div>
                        </>
                    )}
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
        height: '100vh',
        backgroundColor: '#000000',
    },
    registerContainer: {
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
        // marginTop: '1rem',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '1rem'
    },
    prevButton: {
        marginRight: '10px'
    },
    message: {
        marginTop: '1rem',
        color: '#d9534f',
    }
};

export default Register;
