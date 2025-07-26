import React from 'react';
import { FaFolder, FaGithub } from 'react-icons/fa';
import Navbar from '../components/Navbar/Navbar';
import './Projects.scss';

// CSS Custom Properties için type definition
interface CSSPropertiesWithCustom extends React.CSSProperties {
  '--index'?: number;
}

// Proje verileri
interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  language?: string;
  languageColor?: string;
}

const projectsData: Project[] = [
  {
    title: "blog-api",
    description: "RESTful API for managing blog content, built with Node.js, Express.js, and MongoDB. Features include creating, reading, updating, and deleting blog posts and users.",
    techStack: ["TypeScript", "Node.js", "Express", "MongoDB"],
    githubLink: "https://github.com/beratgdlk/blog-api",
    language: "TypeScript",
    languageColor: "#3178C6"
  },
  {
    title: "restaurant.knex.js",
    description: "A restaurant management API built with Node.js, Express, PostgreSQL and Knex.js. Features include category and product management with soft-delete functionality.",
    techStack: ["JavaScript", "Node.js", "Express", "PostgreSQL"],
    githubLink: "https://github.com/beratgdlk/restaurant.knex.js",
    language: "JavaScript",
    languageColor: "#F7DF1E"
  },
  {
    title: "hospital-appointment-api",
    description: "RESTful API for managing hospital appointments, built with TypeScript, Express.js, Prisma, and Zod.",
    techStack: ["TypeScript", "Express", "Prisma", "Zod"],
    githubLink: "https://github.com/beratgdlk/hospital-appointment-api",
    language: "TypeScript",
    languageColor: "#3178C6"
  },
  {
    title: "countdowntimer-todolist.js",
    description: "A simple, responsive web application built with HTML, CSS, and JavaScript. It features a customizable countdown timer and an interactive to-do list for better productivity.",
    techStack: ["JavaScript", "HTML", "CSS"],
    githubLink: "https://github.com/beratgdlk/countdowntimer-todolist-js",
    language: "JavaScript",
    languageColor: "#F7DF1E"
  },
  {
    title: "bg-portfolio",
    description: "My personal portfolio website built with React.js, TypeScript, SASS, and Vite. Showcasing my web development skills, projects, and professional experience.",
    techStack: ["React", "TypeScript", "SASS", "Vite"],
    githubLink: "https://github.com/beratgdlk/bg-portfolio",
    language: "SCSS",
    languageColor: "#CC6699"
  },
  {
    title: "star-wars",
    description: "Star Wars Characters is a JavaScript project showcasing real-time filtering. Built with HTML, CSS, and JavaScript, it lets users search and filter characters dynamically.",
    techStack: ["JavaScript", "HTML", "CSS"],
    githubLink: "https://github.com/beratgdlk/star-wars",
    language: "JavaScript",
    languageColor: "#F7DF1E"
  }
];

// Katkı grafiği için renkler - GitHub'ın gerçek katkı takvimi renkleri
// const contributionLevels = [
//   { color: "#161b22" },     // level 0 - boş
//   { color: "#0e4429" },     // level 1 - en açık yeşil
//   { color: "#006d32" },     // level 2 - açık yeşil
//   { color: "#26a641" },     // level 3 - orta yeşil
//   { color: "#39d353" }      // level 4 - en koyu yeşil
// ];

// GitHub aktivite grafiği için
const GitHubActivity = () => {
  // Bu örnek, 12 ay 7 gün içeren rastgele GitHub aktivitesi oluşturur
  // 1: açık yeşil, 2: orta yeşil, 3: koyu yeşil, 4: en koyu yeşil, 0: boş
  
  const [contributions, setContributions] = React.useState<number[][]>([]);
  const [totalContributions, setTotalContributions] = React.useState<number>(0);
  const [displayedCount, setDisplayedCount] = React.useState<string>("");
  const [isTyping, setIsTyping] = React.useState<boolean>(true);
  
  // Timeout referansları için useRef
  const typingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = React.useRef<number | null>(null);
  
  // Typing animasyon mantığını optimize edilmiş halde
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

  // İlk contribution count'u ayarla - sadece component mount olduğunda
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

    // İlk animasyonu başlat
    typingTimeoutRef.current = setTimeout(animateTypingAndErasing, 500);

    // Cleanup
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []); // Empty dependency array - sadece mount'ta çalışsın

  // Typing animasyonu için ayrı effect
  React.useEffect(() => {
    // Bu effect sadece totalContributions değiştiğinde çalışsın
    if (totalContributions > 0) {
      setDisplayedCount("");
      setIsTyping(true);
    }
  }, [totalContributions]);

  // Katkı grafiğini oluştur ve rastgele yanıp sönme efekti ekle
  React.useEffect(() => {
    // İlk katkı grafiğini oluştur
    const generateInitialContributions = () => {
      const weeks = 52;
      const days = 7;
      const contribs = [];
      let total = 0;
      
      // Görsel referansındaki gibi belirli bir dağılımla doldur
      for (let w = 0; w < weeks; w++) {
        const week = [];
        for (let d = 0; d < days; d++) {
          // Ay ve gün kombinasyonlarına göre farklı olasılıklar ata
          let probability = 0.8; // Varsayılan yüksek olasılık (daha az siyah kutu)
          
          // Apr, May - başlangıç ayları
          if (w >= 0 && w < 8) {
            probability = 0.85;
          }
          // Jun, Jul - orta seviye
          else if (w >= 8 && w < 18) {
            probability = 0.82; 
          }
          // Aug, Sep - düşük seviye
          else if (w >= 18 && w < 26) {
            probability = 0.75;
          }
          // Oct, Nov - orta seviye
          else if (w >= 26 && w < 36) {
            probability = 0.85;
          }
          // Dec, Jan - yüksek seviye
          else if (w >= 36 && w < 44) {
            probability = 0.95;
          }
          // Feb, Mar - en yüksek seviye
          else {
            probability = 0.98;
          }
          
          // Haftanın günlerine göre ayarlama
          if (d === 0) { // Pazartesi
            probability += 0.05;
          } else if (d === 3) { // Perşembe
            probability += 0.05;
          } else if (d === 6) { // Pazar
            probability -= 0.05;
          }
          
          // Olasılık kontrolü
          probability = Math.max(0.7, Math.min(probability, 0.98));
          
          // Katkı seviyesini belirle
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
    
    // İlk katkıları oluştur
    const { contribs } = generateInitialContributions();
    setContributions(contribs);
    
    // Yanıp sönme efekti için aralıklı güncelleme - OPTIMIZE EDİLDİ
    intervalRef.current = setInterval(() => {
      // RequestAnimationFrame kullanarak performans iyileştirmesi
      animationFrameRef.current = requestAnimationFrame(() => {
        setContributions(prevContribs => {
          const newContribs = [...prevContribs.map(week => [...week])]; // Deep copy
          
          // Rastgele 1-2 hücre seç (daha az işlem)
          const updates = Math.floor(Math.random() * 2) + 1;
          
          for (let i = 0; i < updates; i++) {
            const randomWeek = Math.floor(Math.random() * 52);
            const randomDay = Math.floor(Math.random() * 7);
            
            // Önceki değeri al
            const prevValue = newContribs[randomWeek][randomDay];
            
            // Yeni bir değer ata
            if (prevValue === 0) {
              // Boş hücreyi doldur (yüksek olasılıkla)
              if (Math.random() < 0.8) { // 0.9'den 0.8'e düşürdük
                newContribs[randomWeek][randomDay] = Math.floor(Math.random() * 4) + 1;
              }
            } else {
              // Dolu hücreyi boşalt veya seviyesini değiştir (düşük olasılıkla boşalt)
              if (Math.random() < 0.1) { // 0.15'ten 0.1'e düşürdük
                newContribs[randomWeek][randomDay] = 0;
              } else if (Math.random() < 0.3) { // Bazen sadece renk değiştir
                const newLevel = Math.floor(Math.random() * 4) + 1;
                newContribs[randomWeek][randomDay] = newLevel;
              }
            }
          }
          
          return newContribs;
        });
      });
    }, 1200); // 800ms'den 1200ms'ye çıkardık - daha az sıklıkta güncelleme
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); // Empty dependency array

  // Component unmount'ta tüm timeout'ları temizle
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
  
  // Ayları oluşturalım
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
  
  // Haftanın günleri
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