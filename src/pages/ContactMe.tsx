import React, { useEffect, useRef, useState } from 'react';
import { FaEnvelope, FaFileAlt, FaGithub, FaLinkedin, FaMapMarkerAlt, FaMedium, FaPhone } from 'react-icons/fa';
import Navbar from '../components/Navbar/Navbar';
import { useProfile } from '../context/ProfileContext';
import './ContactMe.scss';

const ContactMe: React.FC = () => {
  const profileData = useProfile();
  const [isVisible, setIsVisible] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [activeFile, setActiveFile] = useState<string | null>(null);
  
  const contactRef = useRef<HTMLDivElement>(null);
  
  // Terminal yazı efekti
  useEffect(() => {
    const text = '> Contact me for work opportunities or any questions';
    let index = 0;
    
    const typingInterval = setInterval(() => {
      setTypingText(text.substring(0, index));
      index++;
      
      if (index > text.length) {
        clearInterval(typingInterval);
        setIsComplete(true);
      }
    }, 60);
    
    return () => clearInterval(typingInterval);
  }, []);
  
  // Görünürlük animasyonu
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (contactRef.current) {
      observer.observe(contactRef.current);
    }
    
    return () => {
      clearTimeout(timer);
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  // Dosya içeriğini göster
  const renderFileContent = () => {
    switch (activeFile) {
      case 'email':
        return (
          <div className="file-content">
            <div className="terminal-line">
              <span className="prompt">$</span> <span className="command">cat email.txt</span>
            </div>
            <div className="file-data">
              <div className="card-item">
                <div className="card-icon">
                  <FaEnvelope />
                </div>
                <div className="card-content">
                  <h3>Email</h3>
                  <a href={`mailto:${profileData.contact.email}`}>{profileData.contact.email}</a>
                </div>
              </div>
            </div>
          </div>
        );
      case 'phone':
        return (
          <div className="file-content">
            <div className="terminal-line">
              <span className="prompt">$</span> <span className="command">cat phone.txt</span>
            </div>
            <div className="file-data">
              <div className="card-item">
                <div className="card-icon">
                  <FaPhone />
                </div>
                <div className="card-content">
                  <h3>Phone</h3>
                  <a href={`tel:${profileData.contact.telephoneNum}`}>{profileData.contact.telephoneNum}</a>
                </div>
              </div>
            </div>
          </div>
        );
      case 'location':
        return (
          <div className="file-content">
            <div className="terminal-line">
              <span className="prompt">$</span> <span className="command">cat location.txt</span>
            </div>
            <div className="file-data">
              <div className="card-item">
                <div className="card-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="card-content">
                  <h3>Location</h3>
                  <p>Istanbul, Turkey</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'social':
        return (
          <div className="file-content">
            <div className="terminal-line">
              <span className="prompt">$</span> <span className="command">cat social-links.md</span>
            </div>
            <div className="file-data">
              <div className="social-grid terminal-social">
                <a 
                  href={profileData.contact.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  title="GitHub"
                  style={{ '--index': 1 } as React.CSSProperties}
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
                  style={{ '--index': 2 } as React.CSSProperties}
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
                  style={{ '--index': 3 } as React.CSSProperties}
                >
                  <FaMedium className="icon" />
                  <span>Medium</span>
                </a>

                <a 
                  href="/assets/pdf/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  title="CV"
                  style={{ '--index': 4 } as React.CSSProperties}
                >
                  <FaFileAlt className="icon" />
                  <span>Resume</span>
                </a>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };



  return (
    <div className="page-wrapper">
      <Navbar />
      <main id="main-content" role="main">
        <div className="contact-container">
          <div className={`contact-content ${isVisible ? 'visible' : ''}`} ref={contactRef}>
            <h1>_contact-me</h1>
            
            <div 
              className="terminal-container expanded"
              role="application"
              aria-label="İletişim bilgileri terminali"
            >
              <div className="terminal-header">
                <div className="terminal-buttons" aria-hidden="true">
                  <span className="terminal-button close"></span>
                  <span className="terminal-button minimize"></span>
                  <span className="terminal-button expand"></span>
                </div>
                <div className="terminal-title" role="banner">
                  contact@berat-gudelek
                </div>
              </div>
              
              <div className="terminal-body" role="main">
                <div className="terminal-line" aria-hidden="true">
                  <span className="prompt">$</span> <span className="command">cd ~/_contact-me</span>
                </div>
                <div className="terminal-line" aria-hidden="true">
                  <span className="prompt">$</span> <span className="command">ls -la</span>
                </div>
                
                {/* File List - Accessible Navigation */}
                <div className="terminal-line file-list" role="navigation" aria-label="İletişim bilgileri menüsü">
                  <button
                    className={`file email ${activeFile === 'email' ? 'active' : ''}`}
                    onClick={() => setActiveFile('email')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveFile('email');
                      }
                    }}
                    aria-label="E-posta bilgilerini görüntüle"
                    aria-pressed={activeFile === 'email'}
                    type="button"
                  >
                    email.txt
                  </button>
                  <button
                    className={`file phone ${activeFile === 'phone' ? 'active' : ''}`}
                    onClick={() => setActiveFile('phone')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveFile('phone');
                      }
                    }}
                    aria-label="Telefon bilgilerini görüntüle"
                    aria-pressed={activeFile === 'phone'}
                    type="button"
                  >
                    phone.txt
                  </button>
                  <button
                    className={`file location ${activeFile === 'location' ? 'active' : ''}`}
                    onClick={() => setActiveFile('location')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveFile('location');
                      }
                    }}
                    aria-label="Konum bilgilerini görüntüle"
                    aria-pressed={activeFile === 'location'}
                    type="button"
                  >
                    location.txt
                  </button>
                  <button
                    className={`file social ${activeFile === 'social' ? 'active' : ''}`}
                    onClick={() => setActiveFile('social')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveFile('social');
                      }
                    }}
                    aria-label="Sosyal medya bağlantılarını görüntüle"
                    aria-pressed={activeFile === 'social'}
                    type="button"
                  >
                    social-links.md
                  </button>
                </div>
                
                {!activeFile && (
                  <div role="region" aria-label="Hoşgeldin mesajları">
                    <div className="terminal-line" aria-hidden="true">
                      <span className="prompt">$</span> <span className="command">echo "For the fastest and most efficient communication, email is highly recommended! :)"</span>
                    </div>
                    <div className="terminal-line">
                      <span className="prompt" aria-hidden="true">$</span> 
                      <span className="command typing-text" aria-live="polite">{typingText}</span>
                      {!isComplete && <span className="cursor" aria-hidden="true">|</span>}
                    </div>
                  </div>
                )}
                
                {activeFile && (
                  <div role="region" aria-label={`${activeFile} dosya içeriği`} aria-live="polite">
                    {renderFileContent()}
                  </div>
                )}
                
                {activeFile && (
                  <div className="terminal-line back-option">
                    <span className="prompt" aria-hidden="true">$</span>
                    <button 
                      className="command back-command" 
                      onClick={() => setActiveFile(null)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveFile(null);
                        }
                      }}
                      aria-label="Ana menüye geri dön"
                      type="button"
                    >
                      cd ..
                    </button>
                    <span className="back-text" aria-hidden="true"> (go back)</span>
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