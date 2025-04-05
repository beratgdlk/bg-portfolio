import React, { useState } from 'react';
import './ContactMe.scss';
import Navbar from '../components/Navbar/Navbar';
import { useProfile } from '../context/ProfileContext';
import { FaGithub, FaLinkedin, FaMedium, FaFileAlt } from 'react-icons/fa';

const ContactMe: React.FC = () => {
  const profileData = useProfile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Form gönderimi için API çağrısı buraya eklenebilir
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="contact-container">
        <div className="contact-content">
          <h1>İletişim</h1>
          
          <div className="contact-sections">
            <div className="contact-info">
              <h2>İletişim Bilgilerim</h2>
              
              <div className="info-item">
                <span className="label">E-posta:</span>
                <a href={`mailto:${profileData.contact.email}`}>{profileData.contact.email}</a>
              </div>
              
              <div className="info-item">
                <span className="label">Telefon:</span>
                <a href={`tel:${profileData.contact.telephoneNum}`}>{profileData.contact.telephoneNum}</a>
              </div>
              
              <div className="social-links">
                <h3>Sosyal Medya</h3>
                
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
                    <span>CV</span>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <h2>Mesaj Gönder</h2>
              {isSubmitted ? (
                <div className="success-message">
                  Mesajınız başarıyla gönderildi. Teşekkür ederim!
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Adınız</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">E-posta</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Mesaj</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                  </div>
                  
                  <button type="submit" className="submit-btn">Gönder</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMe; 