import React from 'react';

const AboutMe: React.FC = () => {
  return (
    <div className="about-me-container">
      <h1>Hakkımda</h1>
      <div className="about-content">
        <p>Front-end geliştirici olarak çalışıyorum ve web teknolojilerine tutkuyla bağlıyım.</p>
        
        <div className="skills-section">
          <h2>Teknolojiler</h2>
          <div className="skills-grid">
            <div className="skill-item">TypeScript</div>
            <div className="skill-item">React</div>
            <div className="skill-item">Next.js</div>
            <div className="skill-item">JavaScript</div>
            <div className="skill-item">HTML5 & CSS3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe; 