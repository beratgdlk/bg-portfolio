import React from 'react';
import './Navbar.scss';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">berat-gudelek</div>
      <div className="navbar__links">
        <a href="#" className="active">_hello</a>
        <a href="#">_about-me</a>
        <a href="#">_projects</a>
        <a href="#" className="contact-link">_contact-me</a>
      </div>
    </nav>
  );
};

export default Navbar;