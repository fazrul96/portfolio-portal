export type ProjectCategory = 'Fullstack' | 'Automation' | 'Mobile Automation';

export interface ProjectPortal {
  id: string;
  title: string;
  icon: string;
  frontend: string[];
  backend: string[];
  status: string[];
  github: string;
  liveUrl: string;
  description: string;
  features: string[];
  techStack: Tech[];
  category: ProjectCategory;
}

export interface Tech {
  name: string;
  avatar: string;
}

export interface MenuItem {
  label?: string;
  icon?: string;
  route?: string;
  isDivider?: boolean;
  isComponentSwitcher?: boolean;
}

export interface ExperienceCategories {
  id: number;
  title: string;
}

export interface ExperiencePortal {
  id: number;
  alias: string;
  role: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  companyName: string;
  companyType: string;
  industry: string;
  location: string;
  icon: string;
  image: string;
  summary: string;
  responsibilities: string[];
  achievements: string[];
  category: {
    id: number;
    title: string;
  };
}

export interface SkillPortal {
  id: string;
}
