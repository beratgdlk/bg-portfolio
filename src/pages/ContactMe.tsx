import React from 'react';
import './ContactMe.scss';
import Navbar from '../components/Navbar/Navbar';
import { useProfile } from '../context/ProfileContext';
import { FaGithub, FaLinkedin, FaMedium, FaFileAlt } from 'react-icons/fa';

const ContactMe: React.FC = () => {
  const profileData = useProfile();

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="contact-container">
        <div className="contact-content">
          <h1>_contact-me</h1>
          
          <div className="contact-sections centered">
            <div className="contact-info">
              <h2>Contact Information</h2>
              
              <div className="info-item">
                <span className="label">Email:</span>
                <a href={`mailto:${profileData.contact.email}`}>{profileData.contact.email}</a>
              </div>
              
              <div className="info-item">
                <span className="label">Phone:</span>
                <a href={`tel:${profileData.contact.telephoneNum}`}>{profileData.contact.telephoneNum}</a>
              </div>
              
              <div className="social-links">
                <h3>Social Media</h3>
                
                <div className="social-grid">
                  <a 
                    href={profileData.contact.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-link"
                    title="GitHub"
                  >
                    <FaGithub className="icon" />
                    <span>GitHub</span>
                  </a>

                  <a 
                    href={profileData.contact.linkedinPage} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-link"
                    title="LinkedIn"
                  >
                    <FaLinkedin className="icon" />
                    <span>LinkedIn</span>
                  </a>

                  <a 
                    href={profileData.contact.mediumLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-link"
                    title="Medium"
                  >
                    <FaMedium className="icon" />
                    <span>Medium</span>
                  </a>

                  <a 
                    href="/assets/pdf/cv-updated-25-1.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-link"
                    title="CV"
                  >
                    <FaFileAlt className="icon" />
                    <span>Resume</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMe; 