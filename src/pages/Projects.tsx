import React from 'react';
import { FaFolder, FaGithub } from 'react-icons/fa';
import Navbar from '../components/Navbar/Navbar';
import './Projects.scss';

// CSS Custom Properties type definition
interface CSSPropertiesWithCustom extends React.CSSProperties {
  '--index'?: number;
}

// Sample project data - replace with real data when available
const projectsData = [
  {
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
    language: "TypeScript",
    languageColor: "#3178C6",
    githubLink: "https://github.com/beratgdlk/ecommerce-platform"
  },
  {
    title: "Task Management App",
    description: "Collaborative task management application built with Next.js and Prisma. Real-time updates using Socket.io.",
    language: "JavaScript",
    languageColor: "#F7DF1E",
    githubLink: "https://github.com/beratgdlk/task-manager"
  },
  {
    title: "Weather Dashboard",
    description: "React-based weather dashboard with charts and forecasts. Uses OpenWeatherMap API for real-time data.",
    language: "React",
    languageColor: "#61DAFB",
    githubLink: "https://github.com/beratgdlk/weather-dashboard"
  },
  {
    title: "Blog CMS",
    description: "Content management system for blogs built with Express.js and MongoDB. Features markdown support and user roles.",
    language: "Node.js",
    languageColor: "#339933",
    githubLink: "https://github.com/beratgdlk/blog-cms"
  },
  {
    title: "Chat Application",
    description: "Real-time chat application using Socket.io, React, and Node.js. Supports multiple rooms and file sharing.",
    language: "TypeScript",
    languageColor: "#3178C6",
    githubLink: "https://github.com/beratgdlk/chat-app"
  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio website built with React and GSAP animations. Responsive design with modern UI/UX.",
    language: "React",
    languageColor: "#61DAFB",
    githubLink: "https://github.com/beratgdlk/portfolio"
  }
];

// GitHub activity component with animated contribution graph
const GitHubActivity = () => {
  const [contributions, setContributions] = React.useState<number[][]>([]);
  const [totalContributions, setTotalContributions] = React.useState<number>(0);
  const [displayedCount, setDisplayedCount] = React.useState<string>("");
  const [isTyping, setIsTyping] = React.useState<boolean>(true);

  // Timeout references using useRef
  const typingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = React.useRef<number | null>(null);

  // Optimized typing and erasing animation logic
  const animateTypingAndErasing = React.useCallback(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    const newRandomCount = 1385 + Math.floor(Math.random() * (4743 - 1385));

    if (isTyping) {
      const currentText = displayedCount;
      const targetText = totalContributions.toString();

      if (currentText.length < targetText.length) {
        setDisplayedCount(targetText.substring(0, currentText.length + 1));
        typingTimeoutRef.current = setTimeout(animateTypingAndErasing, 6000 / targetText.length);
      } else {
        setIsTyping(false);
        typingTimeoutRef.current = setTimeout(animateTypingAndErasing, 30000);
      }
    } else {
      if (displayedCount.length > 0) {
        setDisplayedCount(displayedCount.substring(0, displayedCount.length - 1));
        typingTimeoutRef.current = setTimeout(animateTypingAndErasing, 6000 / totalContributions.toString().length);
      } else {
        setTotalContributions(newRandomCount);
        localStorage.setItem('contributionCount', newRandomCount.toString());
        setIsTyping(true);
        typingTimeoutRef.current = setTimeout(animateTypingAndErasing, 4000);
      }
    }
  }, [displayedCount, isTyping, totalContributions]);

  // Set initial contribution count - only when component mounts
  React.useEffect(() => {
    let savedContributionCount = localStorage.getItem('contributionCount');
    let savedTimestamp = localStorage.getItem('contributionTimestamp');
    let currentCount;

    const currentTime = new Date().getTime();
    const isPageRefresh = savedTimestamp && (currentTime - parseInt(savedTimestamp)) < 3000;

    if (savedContributionCount && isPageRefresh) {
      currentCount = parseInt(savedContributionCount) + 1;
    } else {
      currentCount = 1385 + Math.floor(Math.random() * (4743 - 1385));
    }

    localStorage.setItem('contributionCount', currentCount.toString());
    localStorage.setItem('contributionTimestamp', currentTime.toString());
    setTotalContributions(currentCount);

    // Start initial animation
    typingTimeoutRef.current = setTimeout(animateTypingAndErasing, 500);

    // Cleanup
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []); // Empty dependency array - only run on mount

  // Separate effect for typing animation
  React.useEffect(() => {
    // This effect only runs when totalContributions changes
    if (totalContributions > 0) {
      setDisplayedCount("");
      setIsTyping(true);
    }
  }, [totalContributions]);

  // Generate contribution graph and add random flashing effect
  React.useEffect(() => {
    const generateInitialContributions = () => {
      const weeks = 52;
      const days = 7;
      const contribs = [];
      let total = 0;

      for (let w = 0; w < weeks; w++) {
        const week = [];
        for (let d = 0; d < days; d++) {
          // Set different probabilities based on month and day combinations
          let probability = 0.8; // Default high probability (fewer empty cells)
          
          // Apr, May - starting months
          if (w >= 0 && w < 8) { probability = 0.85; }
          // Jun, Jul - high activity
          else if (w >= 8 && w < 18) { probability = 0.82; }
          // Aug, Sep - low level
          else if (w >= 18 && w < 26) { probability = 0.75; }
          // Oct, Nov - medium activity
          else if (w >= 26 && w < 36) { probability = 0.85; }
          // Dec, Jan - high level
          else if (w >= 36 && w < 44) { probability = 0.95; }
          // Feb, Mar - highest level
          else { probability = 0.98; }

          // Adjust based on day of week
          if (d === 0) { probability += 0.05; } // Monday
          else if (d === 3) { probability += 0.05; } // Thursday
          else if (d === 6) { probability -= 0.05; } // Sunday

          // Probability control
          probability = Math.max(0.7, Math.min(probability, 0.98));

          // Determine contribution level
          let level = 0;
          if (Math.random() < probability) {
            level = Math.floor(Math.random() * 4) + 1;
            total++;
          }
          week.push(level);
        }
        contribs.push(week);
      }
      return { contribs, total };
    };

    // Generate initial contributions
    const { contribs } = generateInitialContributions();
    setContributions(contribs);

    // Interval update for flashing effect - OPTIMIZED
    intervalRef.current = setInterval(() => {
      // Use requestAnimationFrame for performance improvement
      animationFrameRef.current = requestAnimationFrame(() => {
        setContributions(prevContribs => {
          const newContribs = [...prevContribs.map(week => [...week])]; // Deep copy
          const updates = Math.floor(Math.random() * 2) + 1; // Random 1-2 cells (fewer operations)

          for (let i = 0; i < updates; i++) {
            const randomWeek = Math.floor(Math.random() * 52);
            const randomDay = Math.floor(Math.random() * 7);
            
            // Get previous value
            const prevValue = newContribs[randomWeek][randomDay];

            // Assign new value
            if (prevValue === 0) {
              // Fill empty cell (high probability)
              if (Math.random() < 0.8) { // Reduced from 0.9 to 0.8
                newContribs[randomWeek][randomDay] = Math.floor(Math.random() * 4) + 1;
              }
            } else {
              // Empty filled cell or change level (low probability to empty)
              if (Math.random() < 0.1) { // Reduced from 0.15 to 0.1
                newContribs[randomWeek][randomDay] = 0;
              } else if (Math.random() < 0.3) { // Sometimes just change color
                const newLevel = Math.floor(Math.random() * 4) + 1;
                newContribs[randomWeek][randomDay] = newLevel;
              }
            }
          }
          return newContribs;
        });
      });
    }, 1200); // Increased from 800ms to 1200ms - less frequent updates

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); // Empty dependency array

  // Clean up all timeouts on component unmount
  React.useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Create months and days
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
  const days = ['Mon', 'Wed', 'Fri'];
  
  return (
    <div className="github-activity" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="activity-header">
        <div className="contribution-note">
          <span className="contribution-count">
            <FaGithub style={{ marginRight: '8px', fontSize: '20px' }} />
            <span style={{ color: "#32B74A", display: 'inline-block', minWidth: '60px', textAlign: 'right', fontSize: '18px' }}>{displayedCount}</span>
            <span style={{ fontSize: '18px' }}> contributions in 2025</span>
          </span>
        </div>
        <a href="https://github.com/beratgdlk" className="github-profile-link" style={{ color: '#C0A93E' }}>View GitHub Profile</a>
      </div>
      
      <div className="contribution-container">
        <div className="contribution-months">
          {months.map((month, index) => (
            <span key={index}>{month}</span>
          ))}
        </div>
        
        <div className="contribution-days">
          {days.map((day, index) => (
            <span key={index}>{day}</span>
          ))}
        </div>
        
        <div className="contribution-grid">
          {contributions.map((week, weekIndex) => (
            <div 
              key={weekIndex} 
              className="contribution-week"
              style={{
                '--index': weekIndex
              } as CSSPropertiesWithCustom}
            >
              {week.map((level, dayIndex) => (
                <div 
                  key={dayIndex} 
                  className="contribution-cell"
                  style={{
                    backgroundColor: level === 0 ? '#161b22' : 
                                    level === 1 ? '#0e4429' : 
                                    level === 2 ? '#006d32' : 
                                    level === 3 ? '#26a641' : 
                                    level === 4 ? '#39d353' : '#161b22',
                    '--index': weekIndex * 7 + dayIndex
                  } as CSSPropertiesWithCustom}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="contribution-legend">
        <span>Less</span>
        <div className="legend-cell" style={{ backgroundColor: '#161b22' }}></div>
        <div className="legend-cell" style={{ backgroundColor: '#0e4429' }}></div>
        <div className="legend-cell" style={{ backgroundColor: '#006d32' }}></div>
        <div className="legend-cell" style={{ backgroundColor: '#26a641' }}></div>
        <div className="legend-cell" style={{ backgroundColor: '#39d353' }}></div>
        <span>More</span>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main id="main-content" role="main">
        <div className="projects-container">
          <div className="projects-content">
            <h1>_projects</h1>
            
            <section className="project-grid" aria-labelledby="projects-heading">
              <h2 id="projects-heading" className="sr-only">Proje Listesi</h2>
              {projectsData.map((project, index) => (
                <article 
                  className="project-card" 
                  style={{ '--index': index } as CSSPropertiesWithCustom}
                  key={index}
                >
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="card-link"
                    aria-label={`${project.title} projesini GitHub'da görüntüle`}
                  >
                    <div className="project-header">
                      <div className="project-icon" aria-hidden="true">
                        <FaFolder />
                      </div>
                      <div className="project-title">
                        <h3 style={{ color: '#C0A93E' }}>{project.title}</h3>
                        <span className="project-visibility" aria-label="Açık kaynak proje">Public</span>
                      </div>
                    </div>
                    
                    <p className="project-description">
                      {project.description}
                    </p>
                    
                    <div className="project-footer">
                      <div className="project-language">
                        <span 
                          className="language-dot" 
                          style={{ backgroundColor: project.languageColor }}
                          aria-hidden="true"
                        ></span>
                        <span aria-label={`Programlama dili: ${project.language}`}>
                          {project.language}
                        </span>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </section>
            
            {/* GitHub Contribution Graph */}
            <section aria-labelledby="github-activity-heading">
              <h2 id="github-activity-heading" className="sr-only">GitHub Aktivite Grafiği</h2>
              <GitHubActivity />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects; 