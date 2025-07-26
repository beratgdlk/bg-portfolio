import React, { useEffect, useRef, useState } from 'react';
import { FaEnvelope, FaFileAlt, FaGithub, FaLinkedin, FaMapMarkerAlt, FaMedium, FaPhone, FaTerminal } from 'react-icons/fa';
import Navbar from '../components/Navbar/Navbar';
import { useProfile } from '../context/ProfileContext';
import './ContactMe.scss';

// Contact file data structure
interface ContactFile {
  name: string;
  command: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

// Terminal typing component
const TerminalTyping: React.FC<{ text: string; onComplete?: () => void }> = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    
    const typeWriter = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeWriter, 50);
      } else {
        setShowCursor(false);
        onComplete?.();
      }
    };

    const timer = setTimeout(typeWriter, 500);
    return () => clearTimeout(timer);
  }, [text, onComplete]);

  return (
    <span className="terminal-typing">
      {displayedText}
      {showCursor && <span className="terminal-cursor">_</span>}
    </span>
  );
};

const ContactMe: React.FC = () => {
  const profileData = useProfile();
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  // Contact files configuration
  const contactFiles: ContactFile[] = [
    {
      name: 'email.txt',
      command: 'cat email.txt',
      icon: <FaEnvelope />,
      content: (
        <div className="contact-item">
          <div className="contact-icon">
            <FaEnvelope />
          </div>
          <div className="contact-info">
            <h3>Email Address</h3>
            <a href={`mailto:${profileData.contact.email}`} className="contact-link">
              {profileData.contact.email}
            </a>
          </div>
        </div>
      )
    },
    {
      name: 'phone.txt',
      command: 'cat phone.txt',
      icon: <FaPhone />,
      content: (
        <div className="contact-item">
          <div className="contact-icon">
            <FaPhone />
          </div>
          <div className="contact-info">
            <h3>Phone Number</h3>
            <a href={`tel:${profileData.contact.telephoneNum}`} className="contact-link">
              {profileData.contact.telephoneNum}
            </a>
          </div>
        </div>
      )
    },
    {
      name: 'location.txt',
      command: 'cat location.txt',
      icon: <FaMapMarkerAlt />,
      content: (
        <div className="contact-item">
          <div className="contact-icon">
            <FaMapMarkerAlt />
          </div>
          <div className="contact-info">
            <h3>Location</h3>
            <p className="contact-text">Istanbul, Turkey</p>
          </div>
        </div>
      )
    },
    {
      name: 'social.md',
      command: 'cat social.md',
      icon: <FaGithub />,
      content: (
        <div className="social-links-grid">
          <a
            href={profileData.contact.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link-item"
          >
            <FaGithub className="social-icon" />
            <span>GitHub</span>
          </a>
          <a
            href={profileData.contact.linkedinPage}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link-item"
          >
            <FaLinkedin className="social-icon" />
            <span>LinkedIn</span>
          </a>
          <a
            href={profileData.contact.mediumLink}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link-item"
          >
            <FaMedium className="social-icon" />
            <span>Medium</span>
          </a>
          <a
            href="/assets/pdf/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link-item"
          >
            <FaFileAlt className="social-icon" />
            <span>Resume</span>
          </a>
        </div>
      )
    }
  ];

  // Scroll to view on mount
  useEffect(() => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleFileSelect = (fileName: string) => {
    setActiveFile(fileName);
    setShowWelcome(false);
  };

  const handleBackToDirectory = () => {
    setActiveFile(null);
    setShowWelcome(true);
  };

  const getActiveFileData = () => {
    return contactFiles.find(file => file.name === activeFile);
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <main id="main-content" role="main">
        <div className="contact-container">
          <div className="contact-content" ref={contactRef}>
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-controls">
                  <span className="control-dot close"></span>
                  <span className="control-dot minimize"></span>
                  <span className="control-dot maximize"></span>
                </div>
                <div className="terminal-title">
                  <FaTerminal className="terminal-icon" />
                  <span>contact@portfolio:~</span>
                </div>
              </div>
              
              <div className="terminal-body">
                <div className="welcome-line">
                  <span className="user-prompt">beratgdlk@portfolio</span>
                  <span className="path">:~/contact$</span>
                  <span className="welcome-text"> # Contact information terminal</span>
                </div>
                
                <div className="command-line">
                  <span className="user-prompt">beratgdlk@portfolio</span>
                  <span className="path">:~/contact$</span>
                  <span className="command-text">ls -la</span>
                </div>
                
                {/* File listing */}
                <div className="file-listing">
                  <div className="listing-header">
                    <span className="permissions">PERMISSIONS</span>
                    <span className="file-name">FILENAME</span>
                    <span className="description">DESCRIPTION</span>
                  </div>
                  
                  {contactFiles.map((file, index) => (
                    <button
                      key={file.name}
                      className={`file-item ${activeFile === file.name ? 'active' : ''}`}
                      onClick={() => handleFileSelect(file.name)}
                      style={{ '--index': index } as React.CSSProperties}
                    >
                      <span className="file-permissions">-rw-r--r--</span>
                      <span className="file-name-display">
                        {file.icon}
                        {file.name}
                      </span>
                      <span className="file-description">
                        {file.name.includes('email') && 'Contact via email'}
                        {file.name.includes('phone') && 'Phone number'}
                        {file.name.includes('location') && 'Geographic location'}
                        {file.name.includes('social') && 'Social media links'}
                      </span>
                    </button>
                  ))}
                </div>
                
                {/* File content display */}
                {activeFile && (
                  <div className="file-content">
                    <div className="command-line">
                      <span className="user-prompt">beratgdlk@portfolio</span>
                      <span className="path">:~/contact$</span>
                      <TerminalTyping text={getActiveFileData()?.command || ''} />
                    </div>
                    
                    <div className="file-output">
                      {getActiveFileData()?.content}
                    </div>
                    
                    <div className="back-navigation">
                      <span className="user-prompt">beratgdlk@portfolio</span>
                      <span className="path">:~/contact$</span>
                      <button 
                        className="back-command"
                        onClick={handleBackToDirectory}
                      >
                        cd ..
                      </button>
                      <span className="back-hint"> # Go back to directory</span>
                    </div>
                  </div>
                )}
                
                {/* Welcome message when no file is selected */}
                {!activeFile && (
                  <div className="welcome-message">
                    <div className="command-line">
                      <span className="user-prompt">beratgdlk@portfolio</span>
                      <span className="path">:~/contact$</span>
                      <TerminalTyping 
                        text="echo 'Select a file to view contact information'" 
                        onComplete={() => setShowWelcome(true)}
                      />
                    </div>
                    
                    {showWelcome && (
                      <div className="help-text">
                        <p className="help-line">
                          <span className="help-prefix">→</span>
                          Click on any file above to view details
                        </p>
                        <p className="help-line">
                          <span className="help-prefix">→</span>
                          For fastest response, email is recommended!
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Terminal cursor */}
                {!activeFile && showWelcome && (
                  <div className="command-line">
                    <span className="user-prompt">beratgdlk@portfolio</span>
                    <span className="path">:~/contact$</span>
                    <span className="terminal-cursor active">_</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactMe; 