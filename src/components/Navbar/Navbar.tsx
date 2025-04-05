import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoClick = () => {
    navigate('/');
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <span>berat-gudelek</span>
      </div>
      
      <div className="navbar__center">
        <img 
          src="/assets/images/bg-logo.png" 
          alt="logo" 
          className="navbar__logo" 
          onClick={handleLogoClick}
        />
      </div>
      
      <button className="navbar__hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div className={`navbar__right ${isMenuOpen ? 'active' : ''}`}>
        <Link 
          to="/" 
          className={location.pathname === '/' ? 'active' : ''}
        >_home</Link>
        <Link 
          to="/_about-me"
          className={location.pathname === '/_about-me' ? 'active' : ''}
        >_about-me</Link>
        <Link 
          to="/_projects"
          className={location.pathname === '/_projects' ? 'active' : ''}
        >_projects</Link>
        <Link 
          to="/_contact-me"
          className={`contact-link ${location.pathname === '/_contact-me' ? 'active' : ''}`}
        >_contact-me</Link>
      </div>
    </nav>
  );
};

export default Navbar;