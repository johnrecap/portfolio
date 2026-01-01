export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  type: 'mobile' | 'ecommerce' | 'educational' | 'portfolio' | 'saas';
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'mobile' | 'database' | 'soft';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  yearsOfExperience: number;
  location: string;
  phone: string;
  email: string;
  avatar?: string;
}
