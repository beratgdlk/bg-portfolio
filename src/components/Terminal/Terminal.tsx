import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef, useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import './Terminal.scss';

// GSAP plugin'ini kaydet
gsap.registerPlugin(ScrollTrigger);

// Replacement fonksiyonu için tip tanımı
type ReplacementFunction = (match: string, ...args: string[]) => React.ReactNode;

// Sözdizimi renklendirme işlevi - CodeAnimation için gerekli
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
  
  // Refs for GSAP animations - sadeleştirildi
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const codeBackgroundRef = useRef<CodeBackgroundRef>(null);
  
  // States for title animation
  const [displayTitle, setDisplayTitle] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const titles = ['Frontend Developer', 'Fullstack Developer', 'Software Engineer'];
  
  // Hero section ve global animasyonlar - SADELEŞTIRILDI
  useEffect(() => {
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
      
      // Terminal parallax efekti - hafifletildi
      const codeEditor = heroRef.current.querySelector('.code-animation');
      if (codeEditor) {
        gsap.to(codeEditor, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2
          }
        });
      }
    }
    
    // Section headers için text reveal animasyonu - GLOBAL
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
    
    return () => {
      // Sadece bu component'e ait ScrollTrigger'ları temizle
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === heroRef.current || 
            heroRef.current?.contains(trigger.trigger as Node) ||
            (trigger.trigger && document.querySelectorAll('.section-header').length > 0 && 
             Array.from(document.querySelectorAll('.section-header')).includes(trigger.trigger as Element))) {
          trigger.kill();
        }
      });
    };
  }, []);
  
  // Typing effect - önceki kod aynı
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
      <CodeBackground ref={codeBackgroundRef} mainRef={mainRef} />
      
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

      {/* Sections - Now Separated Components */}
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
    </div>
  );
};

export default Terminal;