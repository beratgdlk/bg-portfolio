import React, { useState, useEffect, useRef } from 'react';
import './Terminal.scss';
import { useProfile } from '../../context/ProfileContext';

// Sözdizimi renklendirme işlevi
const syntaxHighlight = (line: string): React.ReactNode => {
  // Temel desenleri tanımla
  const patterns = [
    // Import/Export ifadeleri
    { pattern: /(import|export|from|as|default)/g, className: 'import-keyword' },
    { pattern: /(const|let|var|function|class|interface|type|enum|namespace)/g, className: 'keyword' },
    { pattern: /(extends|implements|return|if|else|switch|case|break|continue|for|while|do|try|catch|finally|throw|new|this|super|static|public|private|protected|readonly|async|await|yield)/g, className: 'keyword' },
    
    // Tip anahtar kelimeleri
    { pattern: /(string|number|boolean|any|void|null|undefined|never|object|symbol|bigint|unknown)/g, className: 'type-keyword' },
    
    // React Hooks
    { pattern: /(useState|useEffect|useContext|useReducer|useCallback|useMemo|useRef|useLayoutEffect|useImperativeHandle|useDebugValue)/g, className: 'react-hook' },
    
    // Bileşenler ve tipler (Pascal case)
    { pattern: /\b([A-Z][a-zA-Z0-9]*)(\.|\(|\s|$)/g, replacement: (_: string, m1: string, m2: string) => <><span className="component">{m1}</span>{m2}</> },
    
    // Üst düzey kütüphaneler
    { pattern: /(React|ReactDOM|Express|Mongoose|MongoDB|Nest|TypeORM|Next|Router)/g, className: 'library' },
    
    // boolean değerleri
    { pattern: /(true|false)/g, className: 'boolean' },
    
    // Fonksiyon/metod isimleri
    { pattern: /\b(\w+)(?=\s*\()/g, className: 'method' },
    
    // HTTP metod isimleri
    { pattern: /@(Get|Post|Put|Delete|Patch|Options|Head|All)\(/g, replacement: (match: string) => <><span className="http-method">{match.slice(0, -1)}</span>{'('}</> },
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
    { pattern: /\s(\w+)=(?={|"|')/g, replacement: (_: string, attr: string) => <><span className="attribute">{` ${attr}=`}</span></> },
    
    // Parantezler
    { pattern: /(\{|\}|\(|\)|\[|\])/g, className: 'bracket' },
    
    // Template ifadeleri
    { pattern: /(\$\{.*?\})/g, className: 'template-expr' },
    
    // Stringler
    { pattern: /(["'`])(.*?)(\1)/g, replacement: (_: string, q1: string, content: string, q2: string) => 
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
            segments.push(replacement(...match as unknown as [string, ...string[]]));
          } else {
            segments.push(<span className={className}>{match[0]}</span>);
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

// Teknoloji örnekleri
const codeExamples = {
  react: [
    "// React & TypeScript component example",
    "import React, { useState, useEffect } from 'react';",
    "import { User } from '../types/user';",
    "",
    "interface ProfileProps {",
    "  userId: string;",
    "  showDetails: boolean;",
    "}",
    "",
    "export const UserProfile: React.FC<ProfileProps> = ({ userId, showDetails }) => {",
    "  const [user, setUser] = useState<User | null>(null);",
    "  const [loading, setLoading] = useState<boolean>(true);",
    "",
    "  useEffect(() => {",
    "    const fetchUserData = async () => {",
    "      try {",
    "        const response = await fetch(`/api/users/${userId}`);",
    "        const data = await response.json();",
    "        setUser(data);",
    "      } catch (error) {",
    "        console.error('Failed to fetch user:', error);",
    "      } finally {",
    "        setLoading(false);",
    "      }",
    "    };",
    "",
    "    fetchUserData();",
    "  }, [userId]);",
    "",
    "  if (loading) return <div>Loading...</div>;",
    "  if (!user) return <div>User not found</div>;",
    "",
    "  return (",
    "    <div className=\"user-profile\">",
    "      <h2>{user.name}</h2>",
    "      {showDetails && (",
    "        <div className=\"user-details\">",
    "          <p>Email: {user.email}</p>",
    "          <p>Role: {user.role}</p>",
    "        </div>",
    "      )}",
    "    </div>",
    "  );",
    "};",
  ],
  nodejs: [
    "// Node.js & Express API example",
    "import express from 'express';",
    "import { connect } from 'mongoose';",
    "import { UserModel } from './models/user';",
    "",
    "const app = express();",
    "app.use(express.json());",
    "",
    // Database connection
    "connect('mongodb://localhost:27017/myapp', {",
    "  useNewUrlParser: true,",
    "  useUnifiedTopology: true",
    "});",
    "",
    // Get all users
    "app.get('/api/users', async (req, res) => {",
    "  try {",
    "    const users = await UserModel.find()",
    "      .select('-password')",
    "      .sort({ createdAt: -1 });",
    "      ",
    "    res.status(200).json(users);",
    "  } catch (error) {",
    "    console.error('Error fetching users:', error);",
    "    res.status(500).json({ message: 'Server error' });",
    "  }",
    "});",
    "",
    // Create new user
    "app.post('/api/users', async (req, res) => {",
    "  const { name, email, password } = req.body;",
    "",
    "  try {",
    "    const userExists = await UserModel.findOne({ email });",
    "    if (userExists) {",
    "      return res.status(400).json({ message: 'User already exists' });",
    "    }",
    "",
    "    const user = await UserModel.create({",
    "      name,",
    "      email,",
    "      password,", 
    "    });",
    "",
    "    res.status(201).json({",
    "      _id: user._id,",
    "      name: user.name,",
    "      email: user.email",
    "    });",
    "  } catch (error) {",
    "    res.status(500).json({ message: 'Server error' });",
    "  }",
    "});",
  ],
  nestjs: [
    "// NestJS API example",
    "import { Controller, Injectable, Get, Post, Param, Body } from '@nestjs/common';",
    "import { InjectRepository } from '@nestjs/typeorm';",
    "import { Repository } from 'typeorm';",
    "import { Task } from './task.entity';",
    "import { CreateTaskDto } from './dto/create-task.dto';",
    "",
    "@Injectable()",
    "export class TasksService {",
    "  constructor(",
    "    @InjectRepository(Task)",
    "    private tasksRepository: Repository<Task>,",
    "  ) {}",
    "",
    "  async findAll(): Promise<Task[]> {",
    "    return this.tasksRepository.find();",
    "  }",
    "",
    "  async findOne(id: string): Promise<Task> {",
    "    const task = await this.tasksRepository.findOne({ where: { id } });",
    "    ",
    "    if (!task) {",
    "      throw new Error(`Task with id ${id} not found`);",
    "    }",
    "    ",
    "    return task;",
    "  }",
    "",
    "  async create(createTaskDto: CreateTaskDto): Promise<Task> {",
    "    const task = this.tasksRepository.create(createTaskDto);",
    "    return this.tasksRepository.save(task);",
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
    "  @Get(':id')",
    "  findOne(@Param('id') id: string) {",
    "    return this.tasksService.findOne(id);",
    "  }",
    "",
    "  @Post()",
    "  create(@Body() createTaskDto: CreateTaskDto) {",
    "    return this.tasksService.create(createTaskDto);",
    "  }",
    "}",
  ],
  nextjs: [
    "// Next.js page example",
    "import { GetServerSideProps } from 'next';",
    "import { useRouter } from 'next/router';",
    "import React, { useEffect, useState } from 'react';",
    "import Layout from '../components/Layout';",
    "import ProductCard from '../components/ProductCard';",
    "import { getProducts } from '../lib/api';",
    "import { Product } from '../types';",
    "",
    "interface ProductsPageProps {",
    "  initialProducts: Product[];",
    "  totalCount: number;",
    "}",
    "",
    "export default function ProductsPage({ initialProducts, totalCount }: ProductsPageProps) {",
    "  const router = useRouter();",
    "  const [products, setProducts] = useState<Product[]>(initialProducts);",
    "  const [loading, setLoading] = useState<boolean>(false);",
    "  const [page, setPage] = useState<number>(1);",
    "",
    // Handle pagination change
    "  const handlePageChange = async (newPage: number) => {",
    "    setLoading(true);",
    "    setPage(newPage);",
    "    ",
    "    router.push({",
    "      pathname: '/products',",
    "      query: { page: newPage }",
    "    }, undefined, { shallow: true });",
    "    ",
    "    try {",
    "      const response = await fetch(`/api/products?page=${newPage}`);",
    "      const data = await response.json();",
    "      setProducts(data.products);",
    "    } catch (error) {",
    "      console.error('Error fetching products:', error);",
    "    } finally {",
    "      setLoading(false);",
    "    }",
    "  };",
    "",
    "  return (",
    "    <Layout title=\"Products | My Store\">",
    "      <div className=\"products-container\">",
    "        <h1>Products</h1>",
    "        ",
    "        {loading ? (",
    "          <div>Loading products...</div>",
    "        ) : (",
    "          <div className=\"products-grid\">",
    "            {products.map((product) => (",
    "              <ProductCard key={product.id} product={product} />",
    "            ))}",
    "          </div>",
    "        )}",
    "        ",
    "        {/* Pagination controls would go here */}",
    "      </div>",
    "    </Layout>",
    "  );",
    "}",
    "",
    "export const getServerSideProps: GetServerSideProps = async (context) => {",
    "  const page = Number(context.query.page) || 1;",
    "  const { products, totalCount } = await getProducts(page);",
    "  ",
    "  return {",
    "    props: {",
    "      initialProducts: products,",
    "      totalCount,",
    "    },",
    "  };",
    "};",
  ],
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
  
  // useEffect for typing-deleting animation
  useEffect(() => {
    const currentTitle = titles[currentIndex % titles.length];
    
    // Process typing or deleting effect
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing mode
        setDisplayTitle(currentTitle.substring(0, displayTitle.length + 1));
        
        // If typing is complete, wait 2 seconds and switch to deleting mode
        if (displayTitle.length === currentTitle.length) {
          setTimeout(() => {
            setIsDeleting(true);
            setTypingSpeed(80); // Faster delete speed
          }, 2000); // Wait 2 seconds instead of 3
        }
      } else {
        // Deleting mode
        setDisplayTitle(currentTitle.substring(0, displayTitle.length - 1));
        
        // If deleting is complete, move to the next title
        if (displayTitle.length === 0) {
          setIsDeleting(false);
          setCurrentIndex(currentIndex + 1);
          setTypingSpeed(150); // Reset typing speed
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
                    <pre><span className="keyword">const</span> <span className="library">telephoneNum</span> = <span className="string">"{profileData.contact.telephoneNum}"</span>;</pre>
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