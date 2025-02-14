import React from 'react';
import './Footer.scss';
import { FaGithub, FaLinkedin, FaMedium, FaFileAlt } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <a 
        href="https://github.com/beratgdlk" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="footer__link"
      >
        <FaGithub className="icon" />
        github
      </a>

      <a 
        href="https://www.linkedin.com/in/beratgudelek/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="footer__link"
      >
        <FaLinkedin className="icon" />
        linkedin
      </a>

      <a 
        href="https://medium.com/@beratgdlk" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="footer__link"
      >
        <FaMedium className="icon" />
        medium
      </a>

      <a 
        href="/assets/pdf/cv-updated-25.pdf" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="footer__link"
      >
        <FaFileAlt className="icon" />
        cv
      </a>
    </footer>
  );
};

export default Footer;