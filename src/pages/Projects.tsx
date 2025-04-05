import React from 'react';
import './Projects.scss';
import Navbar from '../components/Navbar/Navbar';

const Projects: React.FC = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="projects-container">
        <div className="projects-content">
          <h1>Projelerim</h1>
          
          <div className="project-grid">
            <div className="project-card">
              <h2>Portfolyo Sitesi</h2>
              <p className="project-description">
                Terminal temalı kişisel portfolyo sitesi. React, TypeScript ve SASS ile geliştirildi.
              </p>
              <div className="tech-stack">
                <span className="tech-tag">React</span>
                <span className="tech-tag">TypeScript</span>
                <span className="tech-tag">SASS</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/beratgdlk" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Demo</a>
              </div>
            </div>
            
            <div className="project-card">
              <h2>E-Ticaret Uygulaması</h2>
              <p className="project-description">
                Modern bir e-ticaret arayüzü. Next.js ve React ile geliştirildi.
              </p>
              <div className="tech-stack">
                <span className="tech-tag">Next.js</span>
                <span className="tech-tag">React</span>
                <span className="tech-tag">CSS Modules</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/beratgdlk" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Demo</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects; 