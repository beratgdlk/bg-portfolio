import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef, useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import './Terminal.scss';

// GSAP plugin'ini kaydet
gsap.registerPlugin(ScrollTrigger);

// Replacement fonksiyonu için tip tanımı
type ReplacementFunction = (match: string, ...args: string[]) => React.ReactNode;

// Mock data for sections
const skillsData = [
  { name: 'React', level: 95, category: 'Frontend' },
  { name: 'TypeScript', level: 90, category: 'Language' },
  { name: 'Node.js', level: 88, category: 'Backend' },
  { name: 'GSAP', level: 85, category: 'Animation' },
  { name: 'PostgreSQL', level: 82, category: 'Database' },
  { name: 'Next.js', level: 87, category: 'Framework' }
];

const experienceData = [
  {
    id: '001',
    year: '2024',
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovation Co.',
    description: 'Leading development of scalable web applications using React, Node.js, and cloud technologies.',
    tech: ['React', 'TypeScript', 'AWS', 'Docker']
  },
  {
    id: '002', 
    year: '2023',
    title: 'Frontend Developer',
    company: 'Digital Solutions Ltd.',
    description: 'Developed responsive web interfaces and improved user experience with modern JavaScript frameworks.',
    tech: ['Vue.js', 'SASS', 'WebGL', 'GSAP']
  },
  {
    id: '003',
    year: '2022',
    title: 'Junior Developer',
    company: 'StartUp Inc.',
    description: 'Built interactive websites and learned modern development practices in an agile environment.',
    tech: ['JavaScript', 'PHP', 'MySQL', 'Bootstrap']
  }
];

const featuredProjects = [
  {
    id: '001',
    title: 'AI-Powered Dashboard',
    category: 'Web Application',
    description: 'Real-time analytics dashboard with machine learning insights and interactive data visualization.',
    year: '2024',
    tech: ['React', 'D3.js', 'Python', 'TensorFlow']
  },
  {
    id: '002', 
    title: 'E-Commerce Platform',
    category: 'Full Stack',
    description: 'Modern e-commerce solution with payment integration, inventory management, and admin panel.',
    year: '2024',
    tech: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis']
  },
  {
    id: '003',
    title: 'Mobile Finance App',
    category: 'React Native',
    description: 'Secure mobile banking application with biometric authentication and real-time transactions.',
    year: '2023',
    tech: ['React Native', 'Node.js', 'MongoDB', 'JWT']
  }
];

// Sözdizimi renklendirme işlevi (önceki kod aynı)
const syntaxHighlight = (line: string): React.ReactNode => {
  const patterns: Array<{
    pattern: RegExp;
    className?: string;
    replacement?: ReplacementFunction;
  }> = [
    { pattern: /(import|export|from|as|default)/g, className: 'import-keyword' },
    { pattern: /(const|let|var|function|class|interface|type|enum|namespace)/g, className: 'keyword' },
    { pattern: /(extends|implements|return|if|else|switch|case|break|continue|for|while|do|try|catch|finally|throw|new|this|super|static|public|private|protected|readonly|async|await|yield)/g, className: 'keyword' },
    { pattern: /(string|number|boolean|any|void|null|undefined|never|object|symbol|bigint|unknown)/g, className: 'type-keyword' },
    { pattern: /(useState|useEffect|useContext|useReducer|useCallback|useMemo|useRef|useLayoutEffect|useImperativeHandle|useDebugValue)/g, className: 'react-hook' },
    { 
      pattern: /\b([A-Z][a-zA-Z0-9]*)(\.|\(|\s|$)/g, 
      replacement: (_: string, m1: string, m2: string) => <><span className="component">{m1}</span>{m2}</> 
    },
    { pattern: /(React|ReactDOM|Express|Mongoose|MongoDB|Nest|TypeORM|Next|Router)/g, className: 'library' },
    { pattern: /(true|false)/g, className: 'boolean' },
    { pattern: /\b(\w+)(?=\s*\()/g, className: 'method' },
    { 
      pattern: /@(Get|Post|Put|Delete|Patch|Options|Head|All)\(/g, 
      replacement: (match: string) => <><span className="http-method">{match.slice(0, -1)}</span>{'('}</> 
    },
    { pattern: /(get|post|put|delete|patch)(?=\s*\()/g, className: 'http-method' },
    { pattern: /(req|res|next|params|query|body|headers)/g, className: 'express-param' },
    { pattern: /(\.status|\.json|\.send|\.end|\.redirect)/g, className: 'response-method' },
    { pattern: /(===|!==|==|!=|\+\+|--|&&|\|\||=>|<=|>=)/g, className: 'operator' },
    { pattern: /(\.find|\.findOne|\.findById|\.updateOne|\.updateMany|\.deleteOne|\.deleteMany|\.create|\.save|\.aggregate|\.populate)/g, className: 'mongo-method' },
    { pattern: /(console|document|window|process|module|global|Array|Object|String|Number|Boolean|Date|Math|JSON|Promise)/g, className: 'built-in' },
    { 
      pattern: /\s(\w+)=(?={|"|')/g, 
      replacement: (_: string, attr: string) => <><span className="attribute">{` ${attr}=`}</span></> 
    },
    { pattern: /(\{|\}|\(|\)|\[|\])/g, className: 'bracket' },
    { pattern: /(\$\{.*?\})/g, className: 'template-expr' },
    { 
      pattern: /(["'`])(.*?)(\1)/g, 
      replacement: (_: string, q1: string, content: string, q2: string) => 
        <><span className="string">{q1}{content}{q2}</span></> 
    },
    { pattern: /\b(\d+)\b/g, className: 'number' },
    { pattern: /(\/\/.*$)/g, className: 'comment' },
  ];

  const processTextWithPatterns = (text: string): React.ReactNode[] => {
    let result: React.ReactNode[] = [text];
    
    for (const { pattern, className, replacement } of patterns) {
      result = result.flatMap(part => {
        if (typeof part !== 'string') return [part];
        
        const segments: React.ReactNode[] = [];
        let lastIndex = 0;
        let match;
        
        pattern.lastIndex = 0;
        
        while ((match = pattern.exec(part)) !== null) {
          if (match.index > lastIndex) {
            segments.push(part.substring(lastIndex, match.index));
          }
          
          if (replacement) {
            segments.push(replacement(match[0], ...(match.slice(1) as string[])));
          } else if (className) {
            segments.push(<span className={className}>{match[0]}</span>);
          } else {
            segments.push(match[0]);
          }
          
          lastIndex = pattern.lastIndex;
        }
        
        if (lastIndex < part.length) {
          segments.push(part.substring(lastIndex));
        }
        
        return segments;
      });
    }
    
    return result;
  };

  return <>{processTextWithPatterns(line)}</>;
};

const CodeAnimation: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [codeExample, setCodeExample] = useState(0);
  
  const codeExamples = [
    [
      "// Modern React Component with TypeScript",
      "import React, { useState, useEffect } from 'react';",
      "import { gsap } from 'gsap';",
      "",
      "interface UserProfileProps {",
      "  userId: string;",
      "  onDataLoad: (data: UserData) => void;",
      "}",
      "",
      "const UserProfile: React.FC<UserProfileProps> = ({ userId, onDataLoad }) => {",
      "  const [userData, setUserData] = useState<UserData | null>(null);",
      "  const [loading, setLoading] = useState(true);",
      "",
      "  useEffect(() => {",
      "    const fetchUserData = async () => {",
      "      try {",
      "        const response = await fetch(`/api/users/${userId}`);",
      "        const data = await response.json();",
      "        setUserData(data);",
      "        onDataLoad(data);",
      "        ",
      "        // GSAP animation on data load",
      "        gsap.fromTo('.profile-card', ",
      "          { opacity: 0, y: 50 },",
      "          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }",
      "        );",
      "      } catch (error) {",
      "        console.error('Failed to fetch user data:', error);",
      "      } finally {",
      "        setLoading(false);",
      "      }",
      "    };",
      "",
      "    fetchUserData();",
      "  }, [userId, onDataLoad]);",
      "};"
    ]
  ];
  
  useEffect(() => {
    if (currentLine < codeExamples[codeExample].length) {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, codeExamples[codeExample][currentLine]]);
        setCurrentLine(prev => prev + 1);
      }, Math.random() * 100 + 50);
      
      return () => clearTimeout(timer);
    }
    
    if (currentLine === codeExamples[codeExample].length) {
      const resetTimer = setTimeout(() => {
        setLines([]);
        setCurrentLine(0);
        setCodeExample(0);
      }, 15000);
      
      return () => clearTimeout(resetTimer);
    }
  }, [currentLine, codeExample]);
  
  return (
    <div className="code-animation">
      <div className="code-editor">
        <div className="code-header">
          <div className="code-tabs">
            <div className="code-tab active">Modern Development</div>
          </div>
        </div>
        <div className="code-content">
          <div className="line-numbers">
            {lines.map((_, index) => (
              <span key={index}>{index + 1}</span>
            ))}
          </div>
          <div className="code-lines">
            {lines.map((line, index) => (
              <pre key={index}>
                {syntaxHighlight(line)}
                {index === lines.length - 1 && currentLine < codeExamples[codeExample].length && <span className="cursor">|</span>}
              </pre>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Terminal: React.FC = () => {
  const profileData = useProfile();
  
  // Refs for GSAP animations
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const geometryRef = useRef<HTMLDivElement>(null);
  
  // States for title animation
  const [displayTitle, setDisplayTitle] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const titles = ['Frontend Developer', 'Fullstack Developer', 'Software Engineer'];
  
  // Gelişmiş GSAP Scroll Animasyonları - Yazılım Temalı
  useEffect(() => {
    // Yazılım temalı kod elementleri oluştur
    const createCodeElements = () => {
      if (!geometryRef.current) return;
      
      // Kod elementleri ve sembolleri
      const codeElements = [
        // Binary kodları
        '01001010', '11010110', '00110011', '10101111',
        // Kod sembolleri
        '{', '}', '[', ']', '(', ')', '<', '>', 
        // Terminal sembolleri
        '$', '>', '~', '#', '|', '_',
        // Kod snippet'leri
        'fn()', 'var', 'if', 'for', '==', '=>', '&&', '||',
        // Git hash benzeri
        'a7f2c3d', '9e8b1f4', 'c4d2e9a', 'b3f7d8c',
        // Hex değerler
        '0xFF', '0x00', '0xAA', '0x33'
      ];
      
      // Matrix tarzı kod yağmuru için veriler
      const matrixChars = [
        'console.log', 'function', 'return', 'async', 'await',
        'React', 'useState', 'useEffect', 'const', 'let',
        'import', 'export', 'from', 'class', 'interface'
      ];
      
      // 30 adet kod elementi oluştur
      for (let i = 0; i < 30; i++) {
        const element = document.createElement('div');
        const isMatrix = i % 4 === 0; // Her 4'te bir matrix element
        
        if (isMatrix) {
          // Matrix tarzı kod yağmuru
          element.className = 'code-element matrix-code';
          element.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          element.style.fontSize = '12px';
          element.style.color = '#00ff41';
          element.style.textShadow = '0 0 5px #00ff41';
        } else {
          // Normal kod elementleri
          element.className = `code-element element-${i % 6}`;
          element.textContent = codeElements[Math.floor(Math.random() * codeElements.length)];
        }
        
        element.style.position = 'absolute';
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        element.style.fontFamily = 'Courier New, monospace';
        element.style.fontWeight = 'bold';
        element.style.pointerEvents = 'none';
        element.style.userSelect = 'none';
        element.style.zIndex = '1';
        
        geometryRef.current.appendChild(element);
        
        if (isMatrix) {
          // Matrix falling effect
          gsap.fromTo(element, 
            { y: -100, opacity: 0 },
            {
              y: window.innerHeight + 100,
              opacity: 1,
              duration: 8 + Math.random() * 4,
              repeat: -1,
              ease: "none",
              delay: Math.random() * 5
            }
          );
        } else {
          // Normal kod elementleri için farklı animasyonlar
          
          // Floating animasyon
          gsap.to(element, {
            y: Math.random() * 50 - 25,
            x: Math.random() * 50 - 25,
            duration: 6 + Math.random() * 4,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          });
          
          // Glitch effect - random opacity
          gsap.to(element, {
            opacity: 0.3 + Math.random() * 0.7,
            duration: 2 + Math.random() * 3,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
          });
          
          // Terminal blink effect için bazı elementler
          if (i % 5 === 0) {
            gsap.to(element, {
              opacity: 0,
              duration: 0.5,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut"
            });
          }
        }
        
        // Parallax effect
        gsap.to(element, {
          yPercent: -30 + Math.random() * 60,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
      
      // Digital noise efekti için rastgele pixeller
      for (let i = 0; i < 15; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'digital-noise';
        pixel.style.position = 'absolute';
        pixel.style.width = '2px';
        pixel.style.height = '2px';
        pixel.style.backgroundColor = '#00ff41';
        pixel.style.left = `${Math.random() * 100}%`;
        pixel.style.top = `${Math.random() * 100}%`;
        pixel.style.opacity = '0.3';
        pixel.style.pointerEvents = 'none';
        
        geometryRef.current.appendChild(pixel);
        
        // Random blink
        gsap.to(pixel, {
          opacity: 0,
          duration: 0.1,
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 2,
          ease: "none"
        });
      }
    };
    
    // Hero section animasyonları
    if (heroRef.current) {
      const heroElements = heroRef.current.querySelectorAll('.name, .intro-text, .title, .contact-info');
      
      gsap.fromTo(heroElements,
        { opacity: 0, y: 80, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%"
          }
        }
      );
      
      // Terminal parallax efekti
      const codeEditor = heroRef.current.querySelector('.code-animation');
      if (codeEditor) {
        gsap.to(codeEditor, {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      }
    }
    
    // Section headers için text reveal animasyonu
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach((header) => {
      gsap.fromTo(header,
        { opacity: 0, clipPath: "inset(0 100% 0 0)" },
        {
          opacity: 1,
          clipPath: "inset(0 0% 0 0)",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%"
          }
        }
      );
      
      // Line animasyonu
      const sectionLine = header.querySelector('.section-line');
      if (sectionLine) {
        gsap.fromTo(sectionLine,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: header,
              start: "top 80%"
            }
          }
        );
      }
    });
    
    // Skills section - Wave animasyonu
    if (skillsRef.current) {
      const skillItems = skillsRef.current.querySelectorAll('.skill-item');
      const skillBars = skillsRef.current.querySelectorAll('.skill-bar');
      
      // Wave entrance animasyonu
      gsap.fromTo(skillItems, 
        { 
          opacity: 0, 
          y: 100, 
          rotationY: -45,
          scale: 0.8 
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 1.2,
          stagger: {
            amount: 0.8,
            from: "start",
            ease: "power2.out"
          },
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 75%"
          }
        }
      );
      
      // Skill bars liquid fill effect
      skillBars.forEach((bar, index) => {
        const percentage = skillsData[index]?.level || 0;
        
        // Liquid wave effect
        gsap.timeline({
          scrollTrigger: {
            trigger: bar,
            start: "top 85%"
          }
        })
        .set(bar, { width: "0%" })
        .to(bar, {
          width: `${percentage}%`,
          duration: 2,
          ease: "elastic.out(1, 0.5)"
        })
        .to(bar, {
          boxShadow: "0 0 20px rgba(77, 91, 206, 0.6)",
          duration: 0.5
        }, "-=0.5");
      });
    }
    
    // Projects section - 3D Card Flip animasyonu
    if (projectsRef.current) {
      const projectCards = projectsRef.current.querySelectorAll('.project-card');
      
      gsap.fromTo(projectCards,
        { 
          opacity: 0, 
          rotationY: -90, 
          z: -200,
          scale: 0.5
        },
        {
          opacity: 1,
          rotationY: 0,
          z: 0,
          scale: 1,
          duration: 1.5,
          stagger: {
            amount: 1,
            from: "random",
            ease: "power3.out"
          },
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 70%"
          }
        }
      );
      
      // Parallax effect for project numbers
      projectCards.forEach((card) => {
        const projectNumber = card.querySelector('.project-number');
        if (projectNumber) {
          gsap.to(projectNumber, {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          });
        }
      });
    }
    
    // Experience timeline - Typewriter + morph animasyonu
    if (experienceRef.current) {
      const timelineItems = experienceRef.current.querySelectorAll('.timeline-item');
      
      timelineItems.forEach((item, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%"
          }
        });
        
        // Timeline number bounce effect
        const timelineNumber = item.querySelector('.timeline-number');
        tl.fromTo(timelineNumber,
          { scale: 0, rotation: -180 },
          { 
            scale: 1, 
            rotation: 0, 
            duration: 0.8, 
            ease: "back.out(2)" 
          }
        );
        
        // Content slide + typewriter effect
        const timelineContent = item.querySelector('.timeline-content');
        tl.fromTo(timelineContent,
          { 
            opacity: 0, 
            x: -150, 
            rotationX: -90,
            transformPerspective: 1000
          },
          { 
            opacity: 1, 
            x: 0, 
            rotationX: 0,
            duration: 1, 
            ease: "power3.out" 
          }, "-=0.4");
        
        // Tech badges cascade
        const techBadges = item.querySelectorAll('.tech-badge');
        tl.fromTo(techBadges,
          { opacity: 0, scale: 0, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)"
          }, "-=0.5");
      });
    }
    
    // Scroll-triggered code element effects
    const createScrollCodeEffects = () => {
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const progress = self.progress;
          const codeElements = document.querySelectorAll('.code-element');
          
          codeElements.forEach((element, index) => {
            const speed = (index % 3 + 1) * 0.3;
            const el = element as HTMLElement;
            
            if (el.classList.contains('matrix-code')) {
              // Matrix kodları için farklı hareket
              gsap.to(element, {
                rotationX: progress * 180 * speed,
                duration: 0.1,
                ease: "none"
              });
            } else {
              // Normal kod elementleri
              gsap.to(element, {
                rotation: progress * 360 * speed,
                scale: 0.8 + (Math.sin(progress * Math.PI * 4) * 0.2),
                duration: 0.1,
                ease: "none"
              });
            }
          });
        }
      });
    };
    
    // Initialize all animations
    createCodeElements();
    createScrollCodeEffects();
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Original typing effect
  useEffect(() => {
    const currentTitle = titles[currentIndex % titles.length];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayTitle(currentTitle.substring(0, displayTitle.length + 1));
        
        if (displayTitle.length === currentTitle.length) {
          setTimeout(() => {
            setIsDeleting(true);
            setTypingSpeed(80);
          }, 2000);
        }
      } else {
        setDisplayTitle(currentTitle.substring(0, displayTitle.length - 1));
        
        if (displayTitle.length === 0) {
          setIsDeleting(false);
          setCurrentIndex(currentIndex + 1);
          setTypingSpeed(150);
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [displayTitle, isDeleting, currentIndex]);
  
  return (
    <div className="terminal-page-wrapper" ref={mainRef}>
      {/* Code Elements Background */}
      <div className="code-background" ref={geometryRef}></div>
      
      {/* Hero Section */}
      <div className="terminal" ref={heroRef}>
        <div className="terminal__content">
          <div className="terminal__main-content">
            <div>
              <p className="intro-text">Hi all. I am</p>
              <h1 className="name">{profileData.name}</h1>
              <div className="title-container">
                <p className="title"><span className="typing-text">{displayTitle}</span></p>
              </div>
              
              <div className="contact-info code-editor">
                <div className="code-header">
                  <div className="code-tabs">
                    <div className="code-tab active">contact-info.js</div>
                  </div>
                </div>
                <div className="code-content">
                  <div className="line-numbers">
                    <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
                  </div>
                  <div className="code-lines">
                    <pre><span className="comment">// my phone number</span></pre>
                    <div className="blur-phone-wrapper" style={{position: 'relative', display: 'inline-block'}}>
                      <pre style={{margin: 0}}>
                        <span className="keyword">const</span> <span className="library">telephoneNum</span> = <span className="string">"{profileData.contact.telephoneNum}"</span>;
                      </pre>
                      <div className="blur-overlay-phone" style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backdropFilter: 'blur(8px)', background: 'rgba(30,45,61,0.6)', borderRadius: '4px', zIndex: 2, pointerEvents: 'none'}}></div>
                    </div>
                    <pre><span className="comment">// my e-mail address</span></pre>
                    <pre><span className="keyword">const</span> <span className="library">email</span> = <span className="string">"{profileData.contact.email}"</span>;</pre>
                    <pre><span className="comment">// check out my GitHub profile</span></pre>
                    <pre><span className="keyword">const</span> <span className="library">githubLink</span> = <span className="string">"{profileData.contact.githubLink}"</span>;</pre>
                    <pre><span className="comment">// read my articles on Medium</span></pre>
                    <pre><span className="keyword">const</span> <span className="library">mediumLink</span> = <span className="string">"{profileData.contact.mediumLink}"</span>;</pre>
                    <pre><span className="comment">// connect with me on LinkedIn</span></pre>
                    <pre><span className="keyword">const</span> <span className="library">linkedinPage</span> = <span className="string">"{profileData.contact.linkedinPage}"</span>;<span className="cursor"></span></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CodeAnimation />
        </div>
      </div>

      {/* Skills Section */}
      <section className="skills-section" ref={skillsRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-number">001</span>
            <h2>Technical Skills</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="skills-grid">
            {skillsData.map((skill, index) => (
              <div className="skill-item" key={index}>
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}%</span>
                </div>
                <div className="skill-bar-container">
                  <div className="skill-bar" data-level={skill.level}></div>
                </div>
                <span className="skill-category">{skill.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="projects-section" ref={projectsRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-number">002</span>
            <h2>Featured Projects</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="projects-grid">
            {featuredProjects.map((project, index) => (
              <div className="project-card" key={project.id}>
                <div className="project-number">{project.id}</div>
                <div className="project-content">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <span className="project-year">{project.year}</span>
                  </div>
                  <p className="project-category">{project.category}</p>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="experience-section" ref={experienceRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-number">003</span>
            <h2>Experience</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="timeline">
            {experienceData.map((exp, index) => (
              <div className="timeline-item" key={exp.id}>
                <div className="timeline-number">{exp.id}</div>
                <div className="timeline-content">
                  <div className="timeline-year">{exp.year}</div>
                  <h3>{exp.title}</h3>
                  <h4>{exp.company}</h4>
                  <p>{exp.description}</p>
                  <div className="timeline-tech">
                    {exp.tech.map((tech, i) => (
                      <span key={i} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terminal;