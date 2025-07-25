import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';
import { FaArrowUp, FaEnvelope, FaFileAlt, FaGithub, FaLinkedin, FaMapMarkerAlt, FaMedium, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useProfile } from '../../context/ProfileContext';
import './Footer.scss';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const profileData = useProfile();
  const footerRef = useRef<HTMLFooterElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!footerRef.current) return;
    
    // Footer'ın görünmesiyle beraber animasyon
    gsap.fromTo(footerRef.current.querySelectorAll('.footer-section'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%"
        }
      }
    );
    
    // Logo animasyonu
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-background">
        <div className="footer-shapes">
          {[...Array(10)].map((_, i) => (
            <div key={i} className={`footer-shape shape-${i % 3}`} />
          ))}
        </div>
      </div>
      
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            
            {/* Brand Section */}
            <div className="footer-section brand-section">
              <div className="footer-logo" ref={logoRef}>
                <div className="logo-shape">BG</div>
              </div>
              <h3>{profileData.name}</h3>
              <p className="brand-description">
                Full Stack Developer & Software Engineer passionate about creating 
                innovative web solutions and bringing ideas to life through code.
              </p>
              <div className="tech-stack">
                <span>React</span>
                <span>TypeScript</span>
                <span>Node.js</span>
                <span>GSAP</span>
              </div>
            </div>
            
            {/* Quick Navigation */}
            <div className="footer-section nav-section">
              <h4>Navigation</h4>
              <nav className="footer-nav">
                <Link to="/" className="footer-link">
                  <span className="link-icon">🏠</span>
                  Home
                </Link>
                <Link to="/_about-me" className="footer-link">
                  <span className="link-icon">👨‍💻</span>
                  About Me
                </Link>
                <Link to="/_projects" className="footer-link">
                  <span className="link-icon">💼</span>
                  Projects
                </Link>
                <Link to="/_contact-me" className="footer-link">
                  <span className="link-icon">📧</span>
                  Contact
                </Link>
              </nav>
            </div>
            
            {/* Contact Info */}
            <div className="footer-section contact-section">
              <h4>Get In Touch</h4>
              <div className="contact-items">
                <div className="contact-item">
                  <FaEnvelope className="contact-icon" />
                  <a href={`mailto:${profileData.contact.email}`}>
                    {profileData.contact.email}
                  </a>
                </div>
                <div className="contact-item">
                  <FaPhone className="contact-icon" />
                  <a href={`tel:${profileData.contact.telephoneNum}`}>
                    {profileData.contact.telephoneNum}
                  </a>
                </div>
                <div className="contact-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  <span>Istanbul, Turkey</span>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="footer-section social-section">
              <h4>Connect With Me</h4>
              <div className="social-links">
                <a 
                  href={profileData.contact.githubLink}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link github"
                  title="GitHub"
                >
                  <FaGithub />
                  <span>GitHub</span>
                </a>
                <a 
                  href={profileData.contact.linkedinPage}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link linkedin"
                  title="LinkedIn"
                >
                  <FaLinkedin />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href={profileData.contact.mediumLink}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link medium"
                  title="Medium"
                >
                  <FaMedium />
                  <span>Medium</span>
                </a>
                <a 
                  href="/assets/pdf/resume.pdf"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link resume"
                  title="Resume"
                >
                  <FaFileAlt />
                  <span>Resume</span>
                </a>
              </div>
            </div>
            
          </div>
          
          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="copyright">
                <p>&copy; {currentYear} {profileData.name}. All rights reserved.</p>
                <p className="subtitle">Built with React, TypeScript & GSAP</p>
              </div>
              
              <button 
                className="scroll-to-top"
                onClick={scrollToTop}
                title="Scroll to top"
              >
                <FaArrowUp />
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer; 