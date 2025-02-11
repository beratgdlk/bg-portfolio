import React, { useState } from 'react';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <span>berat-gudelek</span>
      </div>
      
      <div className="navbar__center">
        <img src="/assets/images/bg-logo.png" alt="logo" className="navbar__logo" />
      </div>
      
      <button className="navbar__hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div className={`navbar__right ${isMenuOpen ? 'active' : ''}`}>
        <a href="#" className="active">_hello</a>
        <a href="#">_about-me</a>
        <a href="#">_projects</a>
        <a href="#" className="contact-link">_contact-me</a>
      </div>
    </nav>
  );
};

export default Navbar;