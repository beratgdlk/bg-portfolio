import React from 'react';
import './Navbar.scss';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar__left">
        <span>berat-gudelek</span>
      </div>
      
      <div className="navbar__center">
        <img src="/assets/images/bg-logo.png" alt="logo" className="navbar__logo" />
      </div>
      
      <div className="navbar__right">
        <a href="#" className="active">_hello</a>
        <a href="#">_about-me</a>
        <a href="#">_projects</a>
        <a href="#" className="contact-link">_contact-me</a>
      </div>
    </nav>
  );
};

export default Navbar;