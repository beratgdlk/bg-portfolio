import React, { useEffect, useRef, useState } from 'react';
import { FaFolder, FaGithub, FaTerminal } from 'react-icons/fa';
import Navbar from '../components/Navbar/Navbar';
import './Projects.scss';

// CSS Custom Properties type definition
interface CSSPropertiesWithCustom extends React.CSSProperties {
  '--index'?: number;
}

// Terminal command types
interface TerminalCommand {
  command: string;
  output: React.ReactNode;
  delay: number;
}

// Sample project data - terminal output format
const projectsData = [
  {
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
    language: "TypeScript",
    languageColor: "#3178C6",
    githubLink: "https://github.com/beratgdlk/ecommerce-platform",
    status: "Public",
    lastCommit: "2 days ago"
  },
  {
    title: "Task Management App",
    description: "Collaborative task management application built with Next.js and Prisma. Real-time updates using Socket.io.",
    language: "JavaScript",
    languageColor: "#F7DF1E", 
    githubLink: "https://github.com/beratgdlk/task-manager",
    status: "Public",
    lastCommit: "5 days ago"
  },
  {
    title: "Weather Dashboard",
    description: "React-based weather dashboard with charts and forecasts. Uses OpenWeatherMap API for real-time data.",
    language: "React",
    languageColor: "#61DAFB",
    githubLink: "https://github.com/beratgdlk/weather-dashboard", 
    status: "Public",
    lastCommit: "1 week ago"
  },
  {
    title: "Blog CMS",
    description: "Content management system for blogs built with Express.js and MongoDB. Features markdown support and user roles.",
    language: "Node.js",
    languageColor: "#339933",
    githubLink: "https://github.com/beratgdlk/blog-cms",
    status: "Public", 
    lastCommit: "3 weeks ago"
  },
  {
    title: "Chat Application",
    description: "Real-time chat application using Socket.io, React, and Node.js. Supports multiple rooms and file sharing.",
    language: "TypeScript",
    languageColor: "#3178C6",
    githubLink: "https://github.com/beratgdlk/chat-app",
    status: "Public",
    lastCommit: "1 month ago"
  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio website built with React and GSAP animations. Responsive design with modern UI/UX.",
    language: "React", 
    languageColor: "#61DAFB",
    githubLink: "https://github.com/beratgdlk/portfolio",
    status: "Public",
    lastCommit: "Active development"
  }
];

// Terminal typing component
const TerminalTyping: React.FC<{ text: string; onComplete?: () => void; delay?: number }> = ({ 
  text, 
  onComplete, 
  delay = 50 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let currentIndex = 0;
    
    const typeWriter = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1));
        currentIndex++;
        timeoutRef.current = setTimeout(typeWriter, delay);
      } else {
        setShowCursor(false);
        onComplete?.();
      }
    };

    timeoutRef.current = setTimeout(typeWriter, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, delay, onComplete]);

  return (
    <span className="terminal-typing">
      {displayedText}
      {showCursor && <span className="terminal-cursor">_</span>}
    </span>
  );
};

// Project list component - terminal output style
const ProjectList: React.FC = () => {
  return (
    <div className="project-list-output">
      <div className="output-header">
        <span className="output-meta">total {projectsData.length}</span>
        <div className="column-headers">
          <span className="col-permissions">PERMISSIONS</span>
          <span className="col-language">LANGUAGE</span>
          <span className="col-size">LAST COMMIT</span>
          <span className="col-name">PROJECT NAME</span>
        </div>
      </div>
      
      {projectsData.map((project, index) => (
        <div 
          key={index}
          className="project-line"
          style={{ '--index': index } as CSSPropertiesWithCustom}
        >
          <span className="project-permissions">drwxr-xr-x</span>
          <span 
            className="project-language"
            style={{ color: project.languageColor }}
          >
            {project.language}
          </span>
          <span className="project-date">{project.lastCommit}</span>
          <a 
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="project-name"
          >
            <FaFolder className="folder-icon" />
            {project.title}
          </a>
        </div>
      ))}
    </div>
  );
};

// GitHub activity component - terminal style
const GitHubActivity: React.FC = () => {
  const [contributions, setContributions] = useState<number[][]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [displayedCount, setDisplayedCount] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(true);

  // Timeout references using useRef
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

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
  useEffect(() => {
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
  useEffect(() => {
    // This effect only runs when totalContributions changes
    if (totalContributions > 0) {
      setDisplayedCount("");
      setIsTyping(true);
    }
  }, [totalContributions]);

  // Generate contribution graph and add random flashing effect
  useEffect(() => {
    const generateInitialContributions = () => {
      const weeks = 52;
      const days = 7;
      const contribs = [];

      for (let w = 0; w < weeks; w++) {
        const week = [];
        for (let d = 0; d < days; d++) {
          let probability = 0.8; // Default high probability
          
          // Seasonal variations
          if (w >= 0 && w < 8) { probability = 0.85; }
          else if (w >= 8 && w < 18) { probability = 0.82; }
          else if (w >= 18 && w < 26) { probability = 0.75; }
          else if (w >= 26 && w < 36) { probability = 0.85; }
          else if (w >= 36 && w < 44) { probability = 0.95; }
          else { probability = 0.98; }

          // Day of week adjustments
          if (d === 0) { probability += 0.05; } // Monday
          else if (d === 3) { probability += 0.05; } // Thursday  
          else if (d === 6) { probability -= 0.05; } // Sunday

          probability = Math.max(0.7, Math.min(probability, 0.98));

          let level = 0;
          if (Math.random() < probability) {
            level = Math.floor(Math.random() * 4) + 1;
          }
          week.push(level);
        }
        contribs.push(week);
      }
      return { contribs };
    };

    // Generate initial contributions
    const { contribs } = generateInitialContributions();
    setContributions(contribs);

    // Interval update for flashing effect
    intervalRef.current = setInterval(() => {
      animationFrameRef.current = requestAnimationFrame(() => {
        setContributions(prevContribs => {
          const newContribs = [...prevContribs.map(week => [...week])];
          const updates = Math.floor(Math.random() * 2) + 1;

          for (let i = 0; i < updates; i++) {
            const randomWeek = Math.floor(Math.random() * 52);
            const randomDay = Math.floor(Math.random() * 7);
            
            const prevValue = newContribs[randomWeek][randomDay]; 

            if (prevValue === 0) {
              if (Math.random() < 0.8) {
                newContribs[randomWeek][randomDay] = Math.floor(Math.random() * 4) + 1;
              }
            } else {
              if (Math.random() < 0.1) {
                newContribs[randomWeek][randomDay] = 0;
              } else if (Math.random() < 0.3) {
                const newLevel = Math.floor(Math.random() * 4) + 1;
                newContribs[randomWeek][randomDay] = newLevel;
              }
            }
          }
          return newContribs;
        });
      });
    }, 1200);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Clean up all timeouts on component unmount
  useEffect(() => {
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

  return (
    <div className="github-activity-terminal">
      <div className="activity-output">
        <div className="github-stats-line">
          <FaGithub className="github-icon" />
          <span className="stats-text">
            Total contributions in 2025: 
            <span className="contribution-count"> {displayedCount}</span>
          </span>
        </div>
        
        <div className="contribution-graph-terminal">
          <div className="graph-header">
            <span className="graph-title">▊ Contribution Activity (52 weeks)</span>
          </div>
          
          <div className="contribution-grid-terminal">
            {contributions.map((week, weekIndex) => (
              <div 
                key={weekIndex} 
                className="contribution-week-terminal"
                style={{ '--index': weekIndex } as CSSPropertiesWithCustom}
              >
                {week.map((level, dayIndex) => (
                  <div 
                    key={dayIndex} 
                    className={`contribution-cell-terminal level-${level}`}
                    style={{ '--index': weekIndex * 7 + dayIndex } as CSSPropertiesWithCustom}
                  />
                ))}
              </div>
            ))}
          </div>
          
          <div className="graph-legend">
            <span>Less</span>
            <div className="legend-cells">
              <div className="legend-cell level-0"></div>
              <div className="legend-cell level-1"></div>
              <div className="legend-cell level-2"></div>
              <div className="legend-cell level-3"></div>
              <div className="legend-cell level-4"></div>
            </div>
            <span>More</span>
          </div>
        </div>
        
        <div className="github-link-terminal">
          <a href="https://github.com/beratgdlk" target="_blank" rel="noopener noreferrer">
            → View full GitHub profile
          </a>
        </div>
      </div>
    </div>
  );
};

// Main Projects component
const Projects: React.FC = () => {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [showProjectList, setShowProjectList] = useState(false);
  const [showGitHubActivity, setShowGitHubActivity] = useState(false);

  const commands: TerminalCommand[] = [
    {
      command: "cd ~/projects",
      output: <span className="success-text">✓ Directory changed to ~/projects</span>,
      delay: 1500
    },
    {
      command: "ls -la --color=auto",
      output: <ProjectList />,
      delay: 2000
    },
    {
      command: "git log --oneline --graph --all",
      output: <GitHubActivity />,
      delay: 2500
    }
  ];

  useEffect(() => {
    if (currentCommand < commands.length) {
      const timer = setTimeout(() => {
        if (currentCommand === 1) {
          setShowProjectList(true);
        } else if (currentCommand === 2) {
          setShowGitHubActivity(true);
        }
      }, commands[currentCommand].delay);

      return () => clearTimeout(timer);
    }
  }, [currentCommand, commands]);

  const handleCommandComplete = () => {
    setCurrentCommand(prev => prev + 1);
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <main id="main-content" role="main">
        <div className="projects-container">
          <div className="projects-content">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-controls">
                  <span className="control-dot close"></span>
                  <span className="control-dot minimize"></span>
                  <span className="control-dot maximize"></span>
                </div>
                <div className="terminal-title">
                  <FaTerminal className="terminal-icon" />
                  <span>projects@portfolio:~</span>
                </div>
              </div>
              
              <div className="terminal-body">
                <div className="welcome-line">
                  <span className="user-prompt">beratgdlk@portfolio</span>
                  <span className="path">:~/projects$</span>
                  <span className="welcome-text"> # Welcome to my projects terminal</span>
                </div>
                
                {commands.map((cmd, index) => (
                  <div key={index} className="command-block">
                    {index <= currentCommand && (
                      <>
                        <div className="command-line">
                          <span className="user-prompt">beratgdlk@portfolio</span>
                          <span className="path">:~/projects$</span>
                          <span className="command-text">
                            {index === currentCommand ? (
                              <TerminalTyping 
                                text={cmd.command} 
                                onComplete={handleCommandComplete}
                                delay={80}
                              />
                            ) : (
                              cmd.command
                            )}
                          </span>
                        </div>
                        
                        {((index === 1 && showProjectList) || 
                          (index === 2 && showGitHubActivity) || 
                          (index < currentCommand)) && (
                          <div className="command-output">
                            {cmd.output}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
                
                {currentCommand >= commands.length && (
                  <div className="command-line">
                    <span className="user-prompt">beratgdlk@portfolio</span>
                    <span className="path">:~/projects$</span>
                    <span className="terminal-cursor active">_</span>
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

export default Projects; 