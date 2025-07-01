import React from "react";
import { Container } from "react-bootstrap";
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="py-4" style={{ 
      backgroundColor: '#f8f9fa',
      borderTop: '1px solid rgba(0,0,0,0.1)'
    }}>
      <Container fluid>
        <div className="text-center">
          <p className="mb-0" style={{
            color: '#6c757d',
            fontSize: '0.9rem',
            fontWeight: 400,
            lineHeight: 1.6
          }}>
            © {new Date().getFullYear()}{' '}
            <a href="https://website.sumagotraining.in/" 
               style={{
                 color: '#4e73df',
                 textDecoration: 'none',
                 transition: 'color 0.3s ease',
                 fontWeight: 500
               }}
               onMouseEnter={(e) => e.currentTarget.style.color = '#2e59d9'}
               onMouseLeave={(e) => e.currentTarget.style.color = '#4e73df'}>
              Sumago Infotech
            </a>, Crafted with{' '}
            <FaHeart style={{ 
              color: '#e83e8c',
              verticalAlign: 'middle',
              margin: '0 2px'
            }} />{' '}
            in Nashik
          </p>
          <p className="mt-2" style={{
            color: '#adb5bd',
            fontSize: '0.8rem'
          }}>
            Building digital experiences that matter
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;