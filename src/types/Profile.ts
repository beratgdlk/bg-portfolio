// Separate interface for contact information 
export interface ContactInfo {
  telephoneNum: string;
  email: string;
  githubLink: string;
  linkedinPage: string;
  mediumLink: string;
}

// Main profile data interface
export interface ProfileData {
  name: string;
  title: string;
  contact: ContactInfo;
}

// Enum for technology categories
export enum TechnologyCategory {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  FULLSTACK = 'fullstack',
  TOOLS = 'tools'
}

// Technology interface
export interface Technology {
  name: string;
  icon: React.ReactNode;
  category: TechnologyCategory;
  level?: number;
}

// Project interface
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

// Experience interface
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

// Skills interface
export interface Skill {
  name: string;
  level: number;
  category: string;
}

// GitHub contribution interface
export interface GitHubContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}