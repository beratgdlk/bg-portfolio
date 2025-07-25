import React, { useEffect, useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import './Terminal.scss';

// Replacement fonksiyonu için tip tanımı
type ReplacementFunction = (match: string, ...args: string[]) => React.ReactNode;

// Sözdizimi renklendirme işlevi
const syntaxHighlight = (line: string): React.ReactNode => {
  // Temel desenleri tanımla
  const patterns: Array<{
    pattern: RegExp;
    className?: string;
    replacement?: ReplacementFunction;
  }> = [
    // Import/Export ifadeleri
    { pattern: /(import|export|from|as|default)/g, className: 'import-keyword' },
    { pattern: /(const|let|var|function|class|interface|type|enum|namespace)/g, className: 'keyword' },
    { pattern: /(extends|implements|return|if|else|switch|case|break|continue|for|while|do|try|catch|finally|throw|new|this|super|static|public|private|protected|readonly|async|await|yield)/g, className: 'keyword' },
    
    // Tip anahtar kelimeleri
    { pattern: /(string|number|boolean|any|void|null|undefined|never|object|symbol|bigint|unknown)/g, className: 'type-keyword' },
    
    // React Hooks
    { pattern: /(useState|useEffect|useContext|useReducer|useCallback|useMemo|useRef|useLayoutEffect|useImperativeHandle|useDebugValue)/g, className: 'react-hook' },
    
    // Bileşenler ve tipler (Pascal case)
    { 
      pattern: /\b([A-Z][a-zA-Z0-9]*)(\.|\(|\s|$)/g, 
      replacement: (_: string, m1: string, m2: string) => <><span className="component">{m1}</span>{m2}</> 
    },
    
    // Üst düzey kütüphaneler
    { pattern: /(React|ReactDOM|Express|Mongoose|MongoDB|Nest|TypeORM|Next|Router)/g, className: 'library' },
    
    // boolean değerleri
    { pattern: /(true|false)/g, className: 'boolean' },
    
    // Fonksiyon/metod isimleri
    { pattern: /\b(\w+)(?=\s*\()/g, className: 'method' },
    
    // HTTP metod isimleri
    { 
      pattern: /@(Get|Post|Put|Delete|Patch|Options|Head|All)\(/g, 
      replacement: (match: string) => <><span className="http-method">{match.slice(0, -1)}</span>{'('}</> 
    },
    { pattern: /(get|post|put|delete|patch)(?=\s*\()/g, className: 'http-method' },
    
    // Express parametreleri ve route tanımları
    { pattern: /(req|res|next|params|query|body|headers)/g, className: 'express-param' },
    { pattern: /(\.status|\.json|\.send|\.end|\.redirect)/g, className: 'response-method' },
    
    // Operatörler
    { pattern: /(===|!==|==|!=|\+\+|--|&&|\|\||=>|<=|>=)/g, className: 'operator' },
    
    // MongoDB/Mongoose metodları
    { pattern: /(\.find|\.findOne|\.findById|\.updateOne|\.updateMany|\.deleteOne|\.deleteMany|\.create|\.save|\.aggregate|\.populate)/g, className: 'mongo-method' },
    
    // Yerleşik global nesneler
    { pattern: /(console|document|window|process|module|global|Array|Object|String|Number|Boolean|Date|Math|JSON|Promise)/g, className: 'built-in' },
    
    // JSX özellikleri
    { 
      pattern: /\s(\w+)=(?={|"|')/g, 
      replacement: (_: string, attr: string) => <><span className="attribute">{` ${attr}=`}</span></> 
    },
    
    // Parantezler
    { pattern: /(\{|\}|\(|\)|\[|\])/g, className: 'bracket' },
    
    // Template ifadeleri
    { pattern: /(\$\{.*?\})/g, className: 'template-expr' },
    
    // Stringler
    { 
      pattern: /(["'`])(.*?)(\1)/g, 
      replacement: (_: string, q1: string, content: string, q2: string) => 
        <><span className="string">{q1}{content}{q2}</span></> 
    },
    
    // Sayılar
    { pattern: /\b(\d+)\b/g, className: 'number' },
    
    // Yorumlar en son işlenmeli
    { pattern: /(\/\/.*$)/g, className: 'comment' },
  ];

  // Bir metin parçası üzerinde tüm desenleri uygulayıp React elementleri oluştur
  const processTextWithPatterns = (text: string): React.ReactNode[] => {
    let result: React.ReactNode[] = [text];
    
    for (const { pattern, className, replacement } of patterns) {
      result = result.flatMap(part => {
        if (typeof part !== 'string') return [part];
        
        const segments: React.ReactNode[] = [];
        let lastIndex = 0;
        let match;
        
        // pattern'i reset et
        pattern.lastIndex = 0;
        
        while ((match = pattern.exec(part)) !== null) {
          if (match.index > lastIndex) {
            segments.push(part.substring(lastIndex, match.index));
          }
          
          if (replacement) {
            // Explicit type casting to make TypeScript happy
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
  
  // Different technology examples
  const codeExamples = [
    // React & TypeScript example
    [
      "// Component with React & TypeScript",
      "import React, { useState, useEffect } from 'react';",
      "",
      "interface UserProps {",
      "  username: string;",
      "  isActive: boolean;",
      "}",
      "",
      "const UserProfile: React.FC<UserProps> = ({ username, isActive }) => {",
      "  const [status, setStatus] = useState<string>('offline');",
      "",
      "  useEffect(() => {",
      "    setStatus(isActive ? 'online' : 'offline');",
      "    document.title = `${username} is ${isActive ? 'online' : 'offline'}`;",
      "  }, [isActive, username]);",
      "",
      "  return (",
      "    <div className={`user-profile ${status}`}>",
      "      <h2>{username}</h2>",
      "      <span className=\"status-indicator\"></span>",
      "      <p>Status: {status}</p>",
      "    </div>",
      "  );",
      "};"
    ],
    
    // Node.js & Express example
    [
      "// API endpoint with Node.js & Express",
      "import express from 'express';",
      "import { connectDB } from './database';",
      "",
      "const app = express();",
      "const PORT = process.env.PORT || 3000;",
      "",
      // Configure middleware
      "app.use(express.json());",
      "app.use(express.urlencoded({ extended: true }));",
      "",
      // Define routes
      "app.get('/api/users', async (req, res) => {",
      "  try {",
      "    const db = await connectDB();",
      "    const users = await db.collection('users').find().toArray();",
      "    res.status(200).json({ success: true, data: users });",
      "  } catch (error) {",
      "    res.status(500).json({ success: false, error: error.message });",
      "  }",
      "});",
      "",
      "app.listen(PORT, () => console.log(`Server running on port ${PORT}`));"
    ],
    
    // NestJS example
    [
      "// Service and controller with NestJS",
      "import { Controller, Get, Post, Body, Param, Injectable } from '@nestjs/common';",
      "",
      "@Injectable()",
      "export class TasksService {",
      "  private tasks = [];",
      "",
      "  findAll() {",
      "    return this.tasks;",
      "  }",
      "",
      "  create(task: { title: string; description: string }) {",
      "    const newTask = {",
      "      id: Date.now().toString(),",
      "      ...task,",
      "      completed: false,",
      "    };",
      "    this.tasks.push(newTask);",
      "    return newTask;",
      "  }",
      "}",
      "",
      "@Controller('tasks')",
      "export class TasksController {",
      "  constructor(private tasksService: TasksService) {}",
      "",
      "  @Get()",
      "  findAll() {",
      "    return this.tasksService.findAll();",
      "  }",
      "",
      "  @Post()",
      "  create(@Body() createTaskDto: { title: string; description: string }) {",
      "    return this.tasksService.create(createTaskDto);",
      "  }",
      "}"
    ],
    
    // Next.js example
    [
      "// Next.js page component",
      "import { GetServerSideProps } from 'next';",
      "import Head from 'next/head';",
      "import { useState } from 'react';",
      "",
      "interface Post {",
      "  id: number;",
      "  title: string;",
      "  body: string;",
      "}",
      "",
      "export default function Blog({ posts }: { posts: Post[] }) {",
      "  const [searchTerm, setSearchTerm] = useState('');",
      "",
      "  // Filter posts based on search term",
      "  const filteredPosts = posts.filter(post =>",
      "    post.title.toLowerCase().includes(searchTerm.toLowerCase())",
      "  );",
      "",
      "  return (",
      "    <div className=\"container\">",
      "      <Head>",
      "        <title>My Tech Blog</title>",
      "      </Head>",
      "      <input",
      "        type=\"text\"",
      "        value={searchTerm}",
      "        onChange={(e) => setSearchTerm(e.target.value)}",
      "        placeholder=\"Search posts...\"",
      "      />",
      "      <div className=\"posts-grid\">",
      "        {filteredPosts.map(post => (",
      "          <article key={post.id}>",
      "            <h2>{post.title}</h2>",
      "            <p>{post.body}</p>",
      "          </article>",
      "        ))}",
      "      </div>",
      "    </div>",
      "  );",
      "}",
      "",
      // Fetch data on server side
      "export const getServerSideProps: GetServerSideProps = async () => {",
      "  const res = await fetch('https://api.example.com/posts');",
      "  const posts = await res.json();",
      "  return { props: { posts } };",
      "}"
    ],
    
    // PostgreSQL example
    [
      "// PostgreSQL database operations",
      "import { Pool } from 'pg';",
      "import { config } from './config';",
      "",
      "// Initialize connection pool",
      "const pool = new Pool({",
      "  host: config.db.host,",
      "  port: config.db.port,",
      "  user: config.db.user,",
      "  password: config.db.password,",
      "  database: config.db.name,",
      "  ssl: config.db.ssl",
      "});",
      "",
      "export async function getUserById(userId: string) {",
      "  const query = {",
      "    text: 'SELECT * FROM users WHERE id = $1',",
      "    values: [userId],",
      "  };",
      "",
      "  try {",
      "    const result = await pool.query(query);",
      "    return result.rows[0] || null;",
      "  } catch (error) {",
      "    console.error('Database error:', error);",
      "    throw new Error('Failed to fetch user data');",
      "  }",
      "}",
      "",
      "export async function createUser(userData: { name: string, email: string }) {",
      "  const query = {",
      "    text: 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *',",
      "    values: [userData.name, userData.email],",
      "  };",
      "",
      "  const client = await pool.connect();",
      "  try {",
      "    await client.query('BEGIN');",
      "    const result = await client.query(query);",
      "    await client.query('COMMIT');",
      "    return result.rows[0];",
      "  } catch (error) {",
      "    await client.query('ROLLBACK');",
      "    throw error;",
      "  } finally {",
      "    client.release();",
      "  }",
      "}"
    ],
    
    // Elysia.js example
    [
      "// Elysia.js API example",
      "import { Elysia } from 'elysia';",
      "import { swagger } from '@elysiajs/swagger';",
      "import { cors } from '@elysiajs/cors';",
      "import { t } from 'elysia';",
      "import { UserService } from './services/user.service';",
      "",
      "const app = new Elysia()",
      "  .use(swagger())",
      "  .use(cors())",
      "  .decorate('userService', new UserService())",
      "",
      // User routes with validation
      "app.group('/api/users', (app) => ",
      "  app",
      "    .get('/', ({ userService }) => ",
      "      userService.findAll()",
      "    )",
      "    .get('/:id', ({ params, userService }) => ",
      "      userService.findById(params.id)",
      "    )",
      "    .post('/', ({ body, userService }) => ",
      "      userService.create(body), {",
      "        body: t.Object({",
      "          name: t.String(),",
      "          email: t.String({ format: 'email' }),",
      "          role: t.Optional(t.String())",
      "        })",
      "      }",
      "    )",
      "    .put('/:id', ({ params, body, userService }) => ",
      "      userService.update(params.id, body)",
      "    )",
      "    .delete('/:id', ({ params, userService }) => ",
      "      userService.delete(params.id)",
      "    )",
      ")",
      "",
      // Start server
      "app.listen(3000, () => ",
      "  console.log(`🦊 Server running at http://localhost:3000`)",
      ");"
    ]
  ];
  
  useEffect(() => {
    if (currentLine < codeExamples[codeExample].length) {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, codeExamples[codeExample][currentLine]]);
        setCurrentLine(prev => prev + 1);
      }, Math.random() * 150 + 50); // Random typing speed for realism
      
      return () => clearTimeout(timer);
    }
    
    // When completed, change to next example
    if (currentLine === codeExamples[codeExample].length) {
      const resetTimer = setTimeout(() => {
        setLines([]);
        setCurrentLine(0);
        setCodeExample((prev) => (prev + 1) % codeExamples.length);
      }, 8000); // 8 seconds wait and switch to next example
      
      return () => clearTimeout(resetTimer);
    }
  }, [currentLine, codeExample]);
  
  // Determine technology name
  const getTechName = () => {
    switch(codeExample) {
      case 0: return "React & TypeScript";
      case 1: return "Node.js & Express";
      case 2: return "NestJS";
      case 3: return "Next.js";
      case 4: return "PostgreSQL";
      case 5: return "Elysia.js";
      default: return "Code";
    }
  };
  
  return (
    <div className="code-animation">
      <div className="code-editor">
        <div className="code-header">
          <div className="code-tabs">
            <div className="code-tab active">{getTechName()}</div>
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
  
  // States for title animation
  const [displayTitle, setDisplayTitle] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  // Titles to alternate - Only 2 titles
  const titles = ['Frontend Developer', 'Fullstack Developer'];
  

  
  // Original typing effect for title
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
    <div className="terminal-page-wrapper">
      <div className="terminal">
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
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
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
    </div>
  );
};

export default Terminal;