import React, { useState } from 'react';
import './Projects.scss';
import Navbar from '../components/Navbar/Navbar';
import { FaFolder, FaGithub } from 'react-icons/fa';

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
  
  // Katkı sayısını yerel depolamadan al veya yeni oluştur
  React.useEffect(() => {
    let savedContributionCount = localStorage.getItem('contributionCount');
    let savedTimestamp = localStorage.getItem('contributionTimestamp');
    let currentCount;
    
    const currentTime = new Date().getTime();
    
    // Sayfa yenilendi mi kontrolü
    const isPageRefresh = savedTimestamp && (currentTime - parseInt(savedTimestamp)) < 3000;
    
    if (savedContributionCount && isPageRefresh) {
      // Sayfa yenilendi ve katkı sayısı mevcut ise +1 artır
      currentCount = parseInt(savedContributionCount) + 1;
    } else {
      // Sayfa ilk kez açılıyor veya uzun süre sonra yenileniyorsa rastgele başlat
      currentCount = 1385 + Math.floor(Math.random() * (4743 - 1385));
    }
    
    // Değerleri güncelle ve sakla
    localStorage.setItem('contributionCount', currentCount.toString());
    localStorage.setItem('contributionTimestamp', currentTime.toString());
    setTotalContributions(currentCount);

    // Animasyon için dizi ve zamanlamalar oluştur
    const animateTypingAndErasing = () => {
      // Yeni rastgele sayı al
      const newRandomCount = 1385 + Math.floor(Math.random() * (4743 - 1385));
      // Yeni sayı metnini oluştur (kullanılmıyor ancak yorum satırında tutuyoruz)
      // const newCountString = newRandomCount.toString();
      localStorage.setItem('contributionCount', newRandomCount.toString());
      
      // Yazma animasyonu
      if (isTyping) {
        // Mevcut görüntülenen metni al
        const currentText = displayedCount;
        // Hedef sayı metni
        const targetText = totalContributions.toString();
        
        if (currentText.length < targetText.length) {
          // Sayıyı karakter karakter yazma
          setDisplayedCount(targetText.substring(0, currentText.length + 1));
          // Sabit yazma hızı: toplamda 6 saniye sürecek şekilde
          setTimeout(animateTypingAndErasing, 6000 / targetText.length);
        } else {
          // Yazma tamamlandı, silme moduna geç
          setIsTyping(false);
          setTimeout(animateTypingAndErasing, 30000); // Silmeye başlamadan önce 30 saniye bekle
        }
      } 
      // Silme animasyonu
      else {
        if (displayedCount.length > 0) {
          // Bir karakter sil
          setDisplayedCount(displayedCount.substring(0, displayedCount.length - 1));
          // Sabit silme hızı: toplamda 6 saniye sürecek şekilde
          setTimeout(animateTypingAndErasing, 6000 / totalContributions.toString().length);
        } else {
          // Silme tamamlandı, yeni sayıyı ayarla ve yazma moduna geç
          setTotalContributions(newRandomCount);
          setIsTyping(true);
          setTimeout(animateTypingAndErasing, 4000); // Yeni sayı yazmaya başlamadan önce 4 saniye bekle
        }
      }
    };
    
    // İlk kez animasyonu başlat
    setTimeout(animateTypingAndErasing, 500);
    
    return () => {};
  }, [displayedCount, isTyping]);

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
    const { contribs, total } = generateInitialContributions();
    setContributions(contribs);
    setTotalContributions(total);
    
    // Yanıp sönme efekti için aralıklı güncelleme
    const interval = setInterval(() => {
      setContributions(prevContribs => {
        const newContribs = [...prevContribs];
        
        // Rastgele 1-3 hücre seç ve değerlerini değiştir
        const updates = Math.floor(Math.random() * 3) + 1;
        let newTotal = totalContributions;
        
        for (let i = 0; i < updates; i++) {
          const randomWeek = Math.floor(Math.random() * 52);
          const randomDay = Math.floor(Math.random() * 7);
          
          // Önceki değeri al
          const prevValue = newContribs[randomWeek][randomDay];
          
          // Yeni bir değer ata
          if (prevValue === 0) {
            // Boş hücreyi doldur (yüksek olasılıkla)
            if (Math.random() < 0.9) {
              newContribs[randomWeek][randomDay] = Math.floor(Math.random() * 4) + 1;
              newTotal++;
            }
          } else {
            // Dolu hücreyi boşalt veya seviyesini değiştir (düşük olasılıkla boşalt)
            if (Math.random() < 0.15) {
              newContribs[randomWeek][randomDay] = 0;
              newTotal--;
            } else {
              const newLevel = Math.floor(Math.random() * 4) + 1;
              newContribs[randomWeek][randomDay] = newLevel;
            }
          }
        }
        
        // Toplam katkı sayısını güncelle
        setTotalContributions(newTotal);
        
        return newContribs;
      });
    }, 800); // 800ms aralıklarla güncelle
    
    return () => clearInterval(interval);
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
                ["--index" as any]: weekIndex
              }}
            >
              {week.map((level, dayIndex) => (
                <div 
                  className="contribution-cell" 
                  key={dayIndex}
                  data-level={level}
                  style={{
                    backgroundColor: level === 1 ? '#0e4429' : 
                                    level === 2 ? '#006d32' : 
                                    level === 3 ? '#26a641' : 
                                    level === 4 ? '#39d353' : '#161b22',
                    "--index": weekIndex * 7 + dayIndex
                  }}
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
      <div className="projects-container">
        <div className="projects-content">
          <h1>_projects</h1>
          
          <div className="project-grid">
            {projectsData.map((project, index) => (
              <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="card-link"
                key={index}
              >
                <div className="project-card" style={{ '--index': index } as React.CSSProperties}>
                  <div className="project-header">
                    <div className="project-icon">
                      <FaFolder />
                    </div>
                    <div className="project-title">
                      <h2 style={{ color: '#C0A93E' }}>{project.title}</h2>
                      <span className="project-visibility">Public</span>
                    </div>
                  </div>
                  
                  <p className="project-description">
                    {project.description}
                  </p>
                  
                  <div className="project-footer">
                    <div className="project-language">
                      <span className="language-dot" style={{ backgroundColor: project.languageColor }}></span>
                      <span>{project.language}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          {/* GitHub Contribution Graph */}
          <GitHubActivity />
        </div>
      </div>
    </div>
  );
};

export default Projects; 