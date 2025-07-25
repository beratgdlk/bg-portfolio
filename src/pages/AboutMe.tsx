import React, { useEffect, useRef, useState } from 'react';
import { FaCss3Alt, FaGithub, FaHtml5, FaNodeJs, FaReact, FaSass } from 'react-icons/fa';
import { SiCanva, SiExpress, SiFigma, SiJavascript, SiNestjs, SiNextdotjs, SiPassport, SiPostgresql, SiPostman, SiTypescript } from 'react-icons/si';
import { TbBrandVscode } from 'react-icons/tb';
import Navbar from '../components/Navbar/Navbar';
import './AboutMe.scss';

// Elysia.js için yeni bileşen - boş daire içinde tilki gözleri
const ElysiaIcon: React.FC = () => (
  <svg 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ height: "3rem", width: "3rem" }}
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
    <polygon points="3,5 5,10 11,12 3,5" fill="currentColor" />
    <polygon points="21,5 19,10 13,12 21,5" fill="currentColor" />
  </svg>
);

interface Technology {
  name: string;
  icon: React.ReactNode;
  category: 'frontend' | 'backend' | 'tools' | 'fullstack';
}

const AboutMe: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [displayTitle, setDisplayTitle] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  // Teknoloji yazıları için state'ler
  const [displayFrontendTech, setDisplayFrontendTech] = useState('');
  const [displayBackendTech, setDisplayBackendTech] = useState('');
  const [frontendTechIndex, setFrontendTechIndex] = useState(0);
  const [backendTechIndex, setBackendTechIndex] = useState(0);
  const [isFrontendDeleting, setIsFrontendDeleting] = useState(false);
  const [isBackendDeleting, setIsBackendDeleting] = useState(false);
  
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Rotating developer titles - Only 2 titles
  const titles = ['Frontend Developer', 'Fullstack Developer', 'Software Developer'];
  
  // Rotating technology names
  const frontendTechs = ['React', 'TypeScript', 'Next.js', 'HTML5'];
  const backendTechs = ['Node.js', 'Express.js', 'Nest.js'];
  
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
  
  // Frontend teknoloji yazısı efekti
  useEffect(() => {
    const currentTech = frontendTechs[frontendTechIndex % frontendTechs.length];
    
    const timeout = setTimeout(() => {
      if (!isFrontendDeleting) {
        // Yazma modu
        setDisplayFrontendTech(currentTech.substring(0, displayFrontendTech.length + 1));
        
        // Yazma tamamlanınca silme moduna geç
        if (displayFrontendTech.length === currentTech.length) {
          setTimeout(() => {
            setIsFrontendDeleting(true);
          }, 1500);
        }
      } else {
        // Silme modu
        setDisplayFrontendTech(currentTech.substring(0, displayFrontendTech.length - 1));
        
        // Silme tamamlanınca sonraki teknolojiye geç
        if (displayFrontendTech.length === 0) {
          setIsFrontendDeleting(false);
          setFrontendTechIndex(frontendTechIndex + 1);
        }
      }
    }, 120);
    
    return () => clearTimeout(timeout);
  }, [displayFrontendTech, isFrontendDeleting, frontendTechIndex]);
  
  // Backend teknoloji yazısı efekti
  useEffect(() => {
    const currentTech = backendTechs[backendTechIndex % backendTechs.length];
    
    const timeout = setTimeout(() => {
      if (!isBackendDeleting) {
        // Yazma modu
        setDisplayBackendTech(currentTech.substring(0, displayBackendTech.length + 1));
        
        // Yazma tamamlanınca silme moduna geç
        if (displayBackendTech.length === currentTech.length) {
          setTimeout(() => {
            setIsBackendDeleting(true);
          }, 1500);
        }
      } else {
        // Silme modu
        setDisplayBackendTech(currentTech.substring(0, displayBackendTech.length - 1));
        
        // Silme tamamlanınca sonraki teknolojiye geç
        if (displayBackendTech.length === 0) {
          setIsBackendDeleting(false);
          setBackendTechIndex(backendTechIndex + 1);
        }
      }
    }, 120);
    
    return () => clearTimeout(timeout);
  }, [displayBackendTech, isBackendDeleting, backendTechIndex]);
  
  // Technologies data with icons
  const technologies: Technology[] = [
    // Frontend
    { name: 'React', icon: <FaReact />, category: 'frontend' },
    { name: 'HTML5', icon: <FaHtml5 />, category: 'frontend' },
    { name: 'CSS3', icon: <FaCss3Alt />, category: 'frontend' },
    { name: 'SASS', icon: <FaSass />, category: 'frontend' },
    
    // Fullstack
    { name: 'TypeScript', icon: <SiTypescript />, category: 'fullstack' },
    { name: 'JavaScript', icon: <SiJavascript />, category: 'fullstack' },
    { name: 'Next.js', icon: <SiNextdotjs />, category: 'fullstack' },
    
    // Backend
    { name: 'Node.js', icon: <FaNodeJs />, category: 'backend' },
    { name: 'Express.js', icon: <SiExpress />, category: 'backend' },
    { name: 'Nest.js', icon: <SiNestjs />, category: 'backend' },
    { name: 'Elysia.js', icon: <ElysiaIcon />, category: 'backend' },
    { name: 'PostgreSQL', icon: <SiPostgresql />, category: 'backend' },
    { name: 'Passport.js', icon: <SiPassport />, category: 'backend' },
    
    // Tools
    { name: 'VSCode', icon: <TbBrandVscode />, category: 'tools' },
    { name: 'Git', icon: <FaGithub />, category: 'tools' },
    { name: 'Postman', icon: <SiPostman />, category: 'tools' },
    { name: 'Figma', icon: <SiFigma />, category: 'tools' },
    { name: 'Canva', icon: <SiCanva />, category: 'tools' },
  ];
  
  // Filter technologies based on active category
  const filteredTechnologies = activeCategory === 'all' 
    ? technologies 
    : technologies.filter(tech => 
        tech.category === activeCategory || 
        (activeCategory === 'frontend' && tech.category === 'fullstack') ||
        (activeCategory === 'fullstack' && (tech.category === 'frontend' || tech.category === 'backend'))
      );
  
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
          <h1>_about-me</h1>
          
          <div className="about-content" ref={contentRef}>
            <div className="terminal-text">
              <p>I'm a <span className="highlight typing-text">{displayTitle}</span></p>
              <p>With expertise in both frontend (<span className="highlight-frontend typing-text-tech">{displayFrontendTech}</span>) and backend (<span className="highlight-backend typing-text-tech">{displayBackendTech}</span>) technologies, I create seamless user experiences while implementing robust server-side solutions.</p>
              <p>By integrating AI-powered tools such as Cursor into my software development process, I optimize productivity, dedicating more time to project refinement, thereby delivering smoother results and continuously enhancing my skills.</p>
              <p>I thrive on tackling complex problems, optimizing performance, and staying current with emerging technologies across the entire development stack.</p>
              <p>I'm committed to staying on the cutting edge of emerging technologies, continuously integrating the latest trends into my development process with a firm belief that my work tomorrow must be better than today.</p>
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
                  className={`filter-btn ${activeCategory === 'fullstack' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('fullstack')}
                >
                  Fullstack
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