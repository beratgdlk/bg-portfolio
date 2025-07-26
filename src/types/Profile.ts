// Contact bilgileri için ayrı interface
export interface ContactInfo {
  telephoneNum: string;
  email: string;
  githubLink: string;
  linkedinPage: string;
  mediumLink: string;
}

// Ana profil data interface'i
export interface ProfileData {
  name: string;
  title: string;
  contact: ContactInfo;
}

// Technology kategorileri için enum
export enum TechnologyCategory {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  FULLSTACK = 'fullstack',
  TOOLS = 'tools'
}

// Teknoloji interface'i
export interface Technology {
  name: string;
  icon: React.ReactNode;
  category: TechnologyCategory;
  level?: number;
}

// Proje interface'i
export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  tech: string[];
  githubLink?: string;
  liveLink?: string;
  image?: string;
}

// Experience interface'i
export interface Experience {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  tech: string[];
  location?: string;
  duration?: string;
}

// Skills interface'i
export interface Skill {
  name: string;
  level: number;
  category: string;
}

// GitHub contribution interface'i
export interface GitHubContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}