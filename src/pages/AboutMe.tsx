import React, { useEffect, useRef, useState } from 'react';
import { FaCss3Alt, FaGithub, FaHtml5, FaNodeJs, FaReact, FaSass } from 'react-icons/fa';
import { SiCanva, SiExpress, SiFigma, SiJavascript, SiNestjs, SiNextdotjs, SiPassport, SiPostgresql, SiPostman, SiTypescript } from 'react-icons/si';
import { TbBrandVscode } from 'react-icons/tb';
import Navbar from '../components/Navbar/Navbar';
import { Technology, TechnologyCategory } from '../types/Profile';
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
  
  // Technologies data with icons - Updated with TechnologyCategory enum
  const technologies: Technology[] = [
    // Frontend
    { name: 'React', icon: <FaReact />, category: TechnologyCategory.FRONTEND },
    { name: 'HTML5', icon: <FaHtml5 />, category: TechnologyCategory.FRONTEND },
    { name: 'CSS3', icon: <FaCss3Alt />, category: TechnologyCategory.FRONTEND },
    { name: 'SASS', icon: <FaSass />, category: TechnologyCategory.FRONTEND },
    
    // Fullstack
    { name: 'TypeScript', icon: <SiTypescript />, category: TechnologyCategory.FULLSTACK },
    { name: 'JavaScript', icon: <SiJavascript />, category: TechnologyCategory.FULLSTACK },
    { name: 'Next.js', icon: <SiNextdotjs />, category: TechnologyCategory.FULLSTACK },
    
    // Backend
    { name: 'Node.js', icon: <FaNodeJs />, category: TechnologyCategory.BACKEND },
    { name: 'Express.js', icon: <SiExpress />, category: TechnologyCategory.BACKEND },
    { name: 'Nest.js', icon: <SiNestjs />, category: TechnologyCategory.BACKEND },
    { name: 'Elysia.js', icon: <ElysiaIcon />, category: TechnologyCategory.BACKEND },
    { name: 'PostgreSQL', icon: <SiPostgresql />, category: TechnologyCategory.BACKEND },
    { name: 'Passport.js', icon: <SiPassport />, category: TechnologyCategory.BACKEND },
    
    // Tools
    { name: 'VSCode', icon: <TbBrandVscode />, category: TechnologyCategory.TOOLS },
    { name: 'Git', icon: <FaGithub />, category: TechnologyCategory.TOOLS },
    { name: 'Postman', icon: <SiPostman />, category: TechnologyCategory.TOOLS },
    { name: 'Figma', icon: <SiFigma />, category: TechnologyCategory.TOOLS },
    { name: 'Canva', icon: <SiCanva />, category: TechnologyCategory.TOOLS },
  ];
  
  // Filter technologies based on active category
  const filteredTechnologies = activeCategory === 'all' 
    ? technologies 
    : technologies.filter(tech => 
        tech.category === activeCategory || 
        (activeCategory === 'frontend' && tech.category === TechnologyCategory.FULLSTACK) ||
        (activeCategory === 'fullstack' && (tech.category === TechnologyCategory.FRONTEND || tech.category === TechnologyCategory.BACKEND))
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
      <main id="main-content" role="main">
        <div className="about-container">
          <div className={`about-me-container ${isVisible ? 'visible' : ''}`}>
            <h1>_about-me</h1>
            
            <div className="about-content" ref={contentRef}>
              <section className="terminal-text" aria-label="Kişisel tanıtım">
                <p>I'm a <span className="highlight typing-text" aria-live="polite">{displayTitle}</span></p>
                <p>With expertise in both frontend (<span className="highlight-frontend typing-text-tech" aria-live="polite">{displayFrontendTech}</span>) and backend (<span className="highlight-backend typing-text-tech" aria-live="polite">{displayBackendTech}</span>) technologies, I create seamless user experiences while implementing robust server-side solutions.</p>
                <p>By integrating AI-powered tools such as Cursor into my software development process, I optimize productivity, dedicating more time to project refinement, thereby delivering smoother results and continuously enhancing my skills.</p>
                <p>I thrive on tackling complex problems, optimizing performance, and staying current with emerging technologies across the entire development stack.</p>
                <p>I'm committed to staying on the cutting edge of emerging technologies, continuously integrating the latest trends into my development process with a firm belief that my work tomorrow must be better than today.</p>
              </section>
              
              <section className="skills-section" aria-labelledby="technologies-heading">
                <h2 id="technologies-heading">Technologies</h2>
                
                <div 
                  className="skills-filter" 
                  role="tablist" 
                  aria-label="Teknoloji kategorileri"
                  aria-describedby="filter-description"
                >
                  <div id="filter-description" className="sr-only">
                    Teknolojileri kategoriye göre filtreleyebilirsiniz. Ok tuşları ile navigasyon yapabilirsiniz.
                  </div>
                  
                  <button 
                    className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('all')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCategoryChange('all');
                      }
                    }}
                    role="tab"
                    aria-selected={activeCategory === 'all'}
                    aria-controls="tech-grid"
                    aria-label="Tüm teknolojileri göster"
                    type="button"
                  >
                    All
                  </button>
                  <button 
                    className={`filter-btn ${activeCategory === 'frontend' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('frontend')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCategoryChange('frontend');
                      }
                    }}
                    role="tab"
                    aria-selected={activeCategory === 'frontend'}
                    aria-controls="tech-grid"
                    aria-label="Frontend teknolojilerini göster"
                    type="button"
                  >
                    Frontend
                  </button>
                  <button 
                    className={`filter-btn ${activeCategory === 'backend' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('backend')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCategoryChange('backend');
                      }
                    }}
                    role="tab"
                    aria-selected={activeCategory === 'backend'}
                    aria-controls="tech-grid"
                    aria-label="Backend teknolojilerini göster"
                    type="button"
                  >
                    Backend
                  </button>
                  <button 
                    className={`filter-btn ${activeCategory === 'fullstack' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('fullstack')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCategoryChange('fullstack');
                      }
                    }}
                    role="tab"
                    aria-selected={activeCategory === 'fullstack'}
                    aria-controls="tech-grid"
                    aria-label="Fullstack teknolojilerini göster"
                    type="button"
                  >
                    Fullstack
                  </button>
                  <button 
                    className={`filter-btn ${activeCategory === 'tools' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('tools')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCategoryChange('tools');
                      }
                    }}
                    role="tab"
                    aria-selected={activeCategory === 'tools'}
                    aria-controls="tech-grid"
                    aria-label="Araçları göster"
                    type="button"
                  >
                    Tools
                  </button>
                </div>
                
                <div 
                  className="tech-grid"
                  id="tech-grid"
                  role="tabpanel"
                  aria-label={`${activeCategory} teknolojileri`}
                  aria-live="polite"
                >
                  {filteredTechnologies.map((tech, index) => (
                    <div 
                      className={`tech-item ${tech.category}`} 
                      key={index}
                      role="article"
                      aria-label={`${tech.name} - ${tech.category} teknolojisi`}
                    >
                      <div className="tech-icon" aria-hidden="true">
                        {tech.icon}
                      </div>
                      <div className="tech-name">{tech.name}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutMe; 