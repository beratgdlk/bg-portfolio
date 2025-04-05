import React, { useState, useEffect, useRef } from 'react';
import './Terminal.scss';
import { useProfile } from '../../context/ProfileContext';

const Terminal: React.FC = () => {
  const profileData = useProfile();
  
  // Unvan değişim animasyonu için state'ler
  const [displayTitle, setDisplayTitle] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  // Değişecek ünvanlar - Sadece 2 unvan
  const titles = ['Frontend Developer', 'Fullstack Developer'];
  
  // useEffect ile yazma-silme animasyonu
  useEffect(() => {
    const currentTitle = titles[currentIndex % titles.length];
    
    // Yazma veya silme efektini işle
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Yazma modu
        setDisplayTitle(currentTitle.substring(0, displayTitle.length + 1));
        
        // Eğer yazma tamamlandıysa, 2 saniye bekle ve silme moduna geç
        if (displayTitle.length === currentTitle.length) {
          setTimeout(() => {
            setIsDeleting(true);
            setTypingSpeed(80); // Silme hızı daha yüksek
          }, 2000); // 3 saniye yerine 2 saniye bekle
        }
      } else {
        // Silme modu
        setDisplayTitle(currentTitle.substring(0, displayTitle.length - 1));
        
        // Eğer silme tamamlandıysa, bir sonraki ünvana geç
        if (displayTitle.length === 0) {
          setIsDeleting(false);
          setCurrentIndex(currentIndex + 1);
          setTypingSpeed(150); // Yazma hızını sıfırla
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