import React, { useState, useEffect, useRef } from 'react';
import './Terminal.scss';
import { useProfile } from '../../context/ProfileContext';

const Terminal: React.FC = () => {
  const profileData = useProfile();
  
  // States for title animation
  const [displayTitle, setDisplayTitle] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  // Titles to alternate - Only 2 titles
  const titles = ['Frontend Developer', 'Fullstack Developer'];
  
  // useEffect for typing-deleting animation
  useEffect(() => {
    const currentTitle = titles[currentIndex % titles.length];
    
    // Process typing or deleting effect
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing mode
        setDisplayTitle(currentTitle.substring(0, displayTitle.length + 1));
        
        // If typing is complete, wait 2 seconds and switch to deleting mode
        if (displayTitle.length === currentTitle.length) {
          setTimeout(() => {
            setIsDeleting(true);
            setTypingSpeed(80); // Faster delete speed
          }, 2000); // Wait 2 seconds instead of 3
        }
      } else {
        // Deleting mode
        setDisplayTitle(currentTitle.substring(0, displayTitle.length - 1));
        
        // If deleting is complete, move to the next title
        if (displayTitle.length === 0) {
          setIsDeleting(false);
          setCurrentIndex(currentIndex + 1);
          setTypingSpeed(150); // Reset typing speed
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [displayTitle, isDeleting, currentIndex]);
  
  return (
    <div className="terminal-page-wrapper">
      <div className="terminal">
        <div className="terminal__content">
          <div className="terminal__main-content">
            <div>
              <p className="intro-text">Hi all. I am</p>
              <h1 className="name">{profileData.name}</h1>
              <p className="title"><span className="typing-text">{displayTitle}</span></p>
              
              <div className="contact-info">
                <p className="comment">// my number</p>
                <p className="const">telephoneNum</p><p> = "{profileData.contact.telephoneNum}";</p>
                
                <p className="comment">// my e-mail</p>
                <p className="const">email</p><p> = "{profileData.contact.email}";</p>
                
                <p className="comment">// you can also see it on my GitHub page</p>
                <p className="const">githubLink</p><p> = "{profileData.contact.githubLink}";</p>
                
                <p className="comment">// you can see my blog on Medium</p>
                <p className="const">mediumLink</p><p> = "{profileData.contact.mediumLink}";</p>
                
                <p className="comment">// you can check my LinkedIn page</p>
                <p className="const">linkedinPage</p><p> = "{profileData.contact.linkedinPage}";</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;