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

export interface WebtoonPortal {
  id: number;
  alias: string;
  title: string;
  author: string;
  artist: string;
  genre: string;
  description: string;
  rating: number;
  chapterCount: number;
  source: string;
  status: string;
  type: string;
  image: string | null;
  bannerImage: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
  submissionCalendar: Record<string, number>;
}

export interface DifficultyStats {
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'All';
  count: number;
  submissions: number;
}

export interface Files {
  folders: S3File[];
  files: S3File[];
}

export interface S3File {
  name: string;
  size?: number;
  lastModified?: string;
  type?: string;
}
