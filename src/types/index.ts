// Örnek tip tanımlamaları
export interface User {
  id: number;
  name: string;
  email: string;
}

export type Theme = 'light' | 'dark';

export interface AppConfig {
  theme: Theme;
  language: string;
}
