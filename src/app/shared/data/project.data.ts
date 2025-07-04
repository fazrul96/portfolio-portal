export const WORK_EXPERIENCE = [
  {
    id: 'portfolio',
    title: 'Portfolio Portal (Main Hub)',
    icon: '🧩',
    frontend: ['React (Next.js)'],
    backend: ['Spring Boot'],
    status: ['Live', 'Portfolio App'],
    github: 'https://github.com/yourname/portfolio',
    liveUrl: 'https://yourdomain.com',
    description: 'Central hub for all your live apps, metrics, and tools.',
    features: [
      'Live metrics, scraping jobs, widgets',
      'API explorer, tech visualizer',
      'Interactive timeline, documentation hub',
    ],
    techStack: [
      { name: 'Angular', avatar: 'assets/logos/aposin_logo.ico' },
      { name: 'Spring Boot', avatar: 'assets/logos/aposin_logo.ico' },
    ]
  },
];

export const EXPERIENCES = [
  {
    "id": "accenture-fsd-2022",
    "role": "Full Stack Developer",
    "startDate": "12/2022",
    "endDate": "Present",
    "isCurrent": true,
    "companyName": "Accenture Solutions Sdn. Bhd.",
    "companyType": "MNC",
    "industry": "Insurance & Healthcare",
    "location": "Kuala Lumpur, Malaysia",
    "icon": "💼",
    "image": "assets/images/icons/acn.png",
    "summary": "Leading frontend and backend development on enterprise-grade healthcare platforms. Actively modernizing legacy systems, enhancing CI/CD automation, and improving test coverage with advanced testing frameworks.",
    "responsibilities": [
      "Led architectural planning and development of new feature modules in Angular and Spring Boot",
      "Refactored legacy code to improve maintainability and performance",
      "Integrated Cypress for end-to-end testing and reduced regression issues",
      "Built reusable UI components to standardize design across teams",
      "Collaborated closely with DevOps to streamline CI/CD deployment pipelines",
      "Participated in agile ceremonies and sprint planning as a senior team member"
    ],
    "achievements": [
      "Decreased critical bug count by 60% through proactive refactoring",
      "Shortened deployment times by 40% with improved CI/CD practices",
      "Recognized with multiple team awards for leadership and delivery excellence"
    ]
  },
  {
    "id": "accenture-backend-2020",
    "role": "Backend Developer",
    "startDate": "11/2020",
    "endDate": "12/2022",
    "isCurrent": false,
    "companyName": "Accenture Solutions Sdn. Bhd.",
    "companyType": "MNC",
    "industry": "Insurance & Healthcare",
    "location": "Kuala Lumpur, Malaysia",
    "icon": "💼",
    "image": "assets/images/icons/thelorry.png",
    "summary": "Focused on backend services in Java/Spring Boot to support core insurance platforms. Took ownership of service integration, performance tuning, and helped improve backend test automation.",
    "responsibilities": [
      "Developed RESTful APIs to support frontend and mobile apps",
      "Refactored legacy Java code to microservices for better scalability",
      "Wrote unit and integration tests to improve backend test coverage",
      "Monitored and tuned SQL queries to reduce API response times",
      "Maintained Swagger/OpenAPI documentation for internal consumers",
      "Worked with QA to implement test-driven backend development"
    ],
    "achievements": [
      "Improved API throughput by 30% through optimized queries and caching",
      "Helped migrate two monolith services into microservices with zero downtime",
      "Received internal recognition for reliability and mentorship to juniors"
    ]
  },
  {
    "id": "accenture-fsd-2019",
    "role": "Full Stack Developer",
    "startDate": "04/2019",
    "endDate": "11/2020",
    "isCurrent": false,
    "companyName": "Accenture Solutions Sdn. Bhd.",
    "companyType": "MNC",
    "industry": "Insurance & Healthcare",
    "location": "Kuala Lumpur, Malaysia",
    "icon": "💼",
    "image": "assets/images/icons/bizaid.png",
    "summary": "Joined the digital transformation team responsible for migrating legacy systems and introducing agile delivery to client projects. Contributed to both backend and frontend development across multiple applications.",
    "responsibilities": [
      "Implemented dynamic user interfaces using Angular",
      "Integrated frontend with backend APIs and GraphQL endpoints",
      "Helped migrate old JSP/Servlet apps to modern tech stacks",
      "Created SQL scripts and handled DB schema changes",
      "Participated in user story grooming and estimation sessions",
      "Worked with clients directly to refine technical requirements"
    ],
    "achievements": [
      "Led successful delivery of first agile project for key client",
      "Reduced frontend load times by 35% via asset optimizations",
      "Introduced coding standards and peer review practices to the team"
    ]
  },
  {
    id: 'tm-automation',
    role: 'QA Automation Engineer',
    startDate: '01/2022',
    endDate: '12/2022',
    isCurrent: false,
    companyName: 'Telekom Malaysia',
    companyType: 'GOV-Linked',
    industry: 'Telecommunication',
    location: 'Cyberjaya, Malaysia',
    icon: '📱',
    image: 'assets/companies/tm.png',
    summary: 'Automated onboarding flows for telco services including new 5G plans, MNP, supplementary lines and device add-ons using Appium and TestNG.',
    responsibilities: [
      'Developed mobile automation scripts using Appium and Java',
      'Simulated complex user flows like MNP, new installs, supplementary line adds',
      'Handled custom device capabilities and OTP mocking',
      'Integrated with Jenkins pipelines for scheduled runs'
    ],
    achievements: [
      'Automated 5G onboarding processes for mobile apps',
      'Improved release confidence with nightly regression runs'
    ]
  }
];

export const SOCIAL_LINKS = [
  {
    id: 1,
    name: 'LinkedIn',
    icon: 'assets/images/icons/linkedin.png',
    link: 'https://www.linkedin.com/in/fazrul-romli-79138415b/'
  },
  {
    id: 2,
    name: 'GitHub',
    icon: 'assets/images/icons/github.png',
    link: 'https://github.com/fazrul96/'
  },
  {
    id: 3,
    name: 'Bitbucket',
    icon: 'assets/images/icons/bitbucket.png',
    link: 'https://bitbucket.org/fazrulromli'
  },
  {
    id: 4,
    name: 'Gitlab',
    icon: 'assets/images/icons/gitlab.png',
    link: 'https://gitlab.com/greda'
  },
  {
    id: 5,
    name: 'Medium',
    icon: 'assets/images/icons/medium.png',
    link: 'https://medium.com/@mfbr'
  },
];

export interface ButtonConfig {
  id: number;
  label: string;
  icon: string;
  backgroundColor: string;
  isActive: boolean;
}

export const BUTTON_CONFIGS: ButtonConfig[] = [
  {
    id: 1,
    label: 'All',
    icon: '',
    backgroundColor: 'darkgoldenrod',
    isActive: true,
  },
  {
    id: 2,
    label: 'Web',
    icon: 'fa fa-globe',
    backgroundColor: '',
    isActive: false,
  },
  {
    id: 3,
    label: 'Backend',
    icon: 'fa fa-database',
    backgroundColor: '',
    isActive: false,
  },
  {
    id: 4,
    label: 'Frontend',
    icon: 'fa-solid fa-palette',
    backgroundColor: '',
    isActive: false,
  },
  {
    id: 5,
    label: 'Automation',
    icon: 'fa fa-cogs',
    backgroundColor: '',
    isActive: false,
  }
];
