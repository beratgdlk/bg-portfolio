import React, { useState, useEffect, useRef } from 'react';
import './AboutMe.scss';
import Navbar from '../components/Navbar/Navbar';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaSass, FaGithub, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiNextdotjs, SiExpress, SiNestjs, SiPostgresql, SiBun } from 'react-icons/si';
import { TbBrandVscode } from 'react-icons/tb';

interface Technology {
  name: string;
  icon: React.ReactNode;
  category: 'frontend' | 'backend' | 'tools';
}

const AboutMe: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [displayTitle, setDisplayTitle] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Rotating developer titles - Only 2 titles
  const titles = ['Frontend Developer', 'Fullstack Developer'];
  
  // Animate title typing effect
  useEffect(() => {
    const currentTitle = titles[currentIndex % titles.length];
    
    // Typing or deleting effect
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing mode
        setDisplayTitle(currentTitle.substring(0, displayTitle.length + 1));
        
        // If typing is complete, wait 2 seconds and switch to deleting
        if (displayTitle.length === currentTitle.length) {
          setTimeout(() => {
            setIsDeleting(true);
            setTypingSpeed(80); // Faster when deleting
          }, 2000); // Wait 2 seconds instead of 3
        }
      } else {
        // Deleting mode
        setDisplayTitle(currentTitle.substring(0, displayTitle.length - 1));
        
        // If deletion is complete, move to next title
        if (displayTitle.length === 0) {
          setIsDeleting(false);
          setCurrentIndex(currentIndex + 1);
          setTypingSpeed(150); // Reset typing speed
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [displayTitle, isDeleting, currentIndex]);
  
  // Technologies data with icons
  const technologies: Technology[] = [
    // Frontend
    { name: 'React', icon: <FaReact />, category: 'frontend' },
    { name: 'TypeScript', icon: <SiTypescript />, category: 'frontend' },
    { name: 'JavaScript', icon: <SiJavascript />, category: 'frontend' },
    { name: 'Next.js', icon: <SiNextdotjs />, category: 'frontend' },
    { name: 'HTML5', icon: <FaHtml5 />, category: 'frontend' },
    { name: 'CSS3', icon: <FaCss3Alt />, category: 'frontend' },
    { name: 'SASS', icon: <FaSass />, category: 'frontend' },
    
    // Backend
    { name: 'Node.js', icon: <FaNodeJs />, category: 'backend' },
    { name: 'Express.js', icon: <SiExpress />, category: 'backend' },
    { name: 'Nest.js', icon: <SiNestjs />, category: 'backend' },
    { name: 'Elysia.js', icon: <SiBun />, category: 'backend' },
    { name: 'PostgreSQL', icon: <SiPostgresql />, category: 'backend' },
    
    // Tools
    { name: 'VSCode', icon: <TbBrandVscode />, category: 'tools' },
    { name: 'Git', icon: <FaGithub />, category: 'tools' },
  ];
  
  // Filter technologies based on active category
  const filteredTechnologies = activeCategory === 'all' 
    ? technologies 
    : technologies.filter(tech => tech.category === activeCategory);
  
  // Add fade-in animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle scrolling animation
  useEffect(() => {
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
    
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    
    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);
  
  // Category handlers
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="about-container">
        <div className={`about-me-container ${isVisible ? 'visible' : ''}`}>
          <h1>About Me</h1>
          
          <div className="about-content" ref={contentRef}>
            <div className="terminal-text">
              <p>I'm a <span className="highlight typing-text">{displayTitle}</span></p>
              <p>With expertise in both frontend (React, TypeScript, Next.js) and backend (Node.js, Express) technologies, I create seamless user experiences while implementing robust server-side solutions.</p>
              <p>I thrive on tackling complex problems, optimizing performance, and staying current with emerging technologies across the entire development stack.</p>
            </div>
            
            <div className="skills-section">
              <h2>Technologies</h2>
              
              <div className="skills-filter">
                <button 
                  className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('all')}
                >
                  All
                </button>
                <button 
                  className={`filter-btn ${activeCategory === 'frontend' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('frontend')}
                >
                  Frontend
                </button>
                <button 
                  className={`filter-btn ${activeCategory === 'backend' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('backend')}
                >
                  Backend
                </button>
                <button 
                  className={`filter-btn ${activeCategory === 'tools' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('tools')}
                >
                  Tools
                </button>
              </div>
              
              <div className="tech-grid">
                {filteredTechnologies.map((tech, index) => (
                  <div 
                    className={`tech-item ${tech.category}`} 
                    key={index}
                  >
                    <div className="tech-icon">
                      {tech.icon}
                    </div>
                    <div className="tech-name">{tech.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe; 