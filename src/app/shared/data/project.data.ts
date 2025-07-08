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

export interface Tag {
  label: string;
  type: 'build' | 'test' | 'infra' | 'monitor' | 'security' | 'database' | 'network' | 'pipeline' | 'integration' | 'workflow' | 'e2e' | 'testing' | 'quality'| 'compliance' | 'observability';
}

export interface Incident {
  id: string;
  title: string;
  timestamp: Date;
  resolved: boolean;
}

export interface Tool {
  id: number;
  name: string;
  icon: string;
  status: 'Running' | 'Pending' | 'Critical' | 'Good' | 'Healthy';
  statusClass: 'ok' | 'warning' | 'error';
  progress: number;

  url: string;
  description: string;
  version?: string;
  category: string;

  tags: Tag[];

  uptime?: number;
  latency?: number;
  lastChecked?: Date;

  owner?: string;
  accessRoles?: string[];
  sensitive: boolean;

  riskLevel?: 'low' | 'medium' | 'high';
  slaViolations?: number;

  lastIncident?: Incident;
}

export const DEVOPS_TOOLS: Tool[] = [
  {
    id: 1,
    name: 'Jenkins',
    icon: 'fab fa-jenkins',
    status: 'Pending',
    statusClass: 'warning',
    progress: 65,
    url: 'http://localhost:8081',
    description: 'Popular automation server for orchestrating builds, tests, and deployments in CI/CD workflows.',
    version: '2.414.3',
    category: 'CI/CD',
    tags: [
      { label: 'Build', type: 'pipeline' },
      { label: 'CI/CD', type: 'integration' },
      { label: 'Automation', type: 'workflow' },
    ],
    uptime: 99.92,
    latency: 145,
    lastChecked: new Date('2025-07-05T08:30:00Z'),
    owner: 'DevOps Team',
    sensitive: false,
    riskLevel: 'medium',
    slaViolations: 1,
    accessRoles: ['devops', 'admin'],
    lastIncident: {
      id: 'INC-20250601-001',
      title: 'Job queue timeout due to node unavailability',
      timestamp: new Date('2025-06-01T04:20:00Z'),
      resolved: true,
    },
  },
  {
    id: 2,
    name: 'SonarQube',
    icon: 'assets/images/icons/sonarqube.png',
    status: 'Pending',
    statusClass: 'warning',
    progress: 0,
    url: 'http://sonarqube.example.com',
    description: 'Platform for continuous inspection of code quality to detect bugs, vulnerabilities, and code smells.',
    version: '9.9.1',
    category: 'Code Quality',
    tags: [
      { label: 'Static Analysis', type: 'quality' },
      { label: 'Security', type: 'compliance' },
      { label: 'Coverage', type: 'test' },
    ],
    uptime: 99.87,
    latency: 120,
    lastChecked: new Date('2025-07-05T08:45:00Z'),
    owner: 'QA Team',
    sensitive: false,
    riskLevel: 'low',
    slaViolations: 0,
    accessRoles: ['qa', 'developer'],
  },
  {
    id: 3,
    name: 'Selenium',
    icon: 'fas fa-vial',
    status: 'Pending',
    statusClass: 'warning',
    progress: 0,
    url: 'http://qa.example.com',
    description: 'Framework that allows running tests in parallel across multiple browsers and machines.',
    version: '4.12.0',
    category: 'QA Automation',
    tags: [
      { label: 'UI Testing', type: 'e2e' },
      { label: 'Parallel Execution', type: 'testing' },
      // { label: 'Cross Browser', type: 'compatibility' },
    ],
    uptime: 97.5,
    latency: 210,
    lastChecked: new Date('2025-07-05T08:50:00Z'),
    owner: 'QA Team',
    sensitive: false,
    riskLevel: 'medium',
    slaViolations: 2,
    accessRoles: ['qa'],
    lastIncident: {
      id: 'INC-20250615-003',
      title: 'Chrome node crashed during load testing',
      timestamp: new Date('2025-06-15T10:00:00Z'),
      resolved: true,
    },
  },
  {
    id: 4,
    name: 'Prometheus',
    icon: 'assets/images/icons/prometheus.png',
    status: 'Pending',
    statusClass: 'warning',
    progress: 0,
    url: 'http://prometheus.example.com',
    description: 'Monitoring system and time-series database widely used for recording real-time metrics.',
    version: '2.48.0',
    category: 'Monitoring',
    tags: [
      { label: 'Monitoring', type: 'observability' },
      // { label: 'Metrics', type: 'data' },
      // { label: 'Alerting', type: 'response' },
    ],
    uptime: 99.99,
    latency: 95,
    lastChecked: new Date('2025-07-05T08:55:00Z'),
    owner: 'SRE Team',
    sensitive: false,
    riskLevel: 'low',
    slaViolations: 0,
    accessRoles: ['sre', 'admin'],
  },
  {
    id: 5,
    name: 'Docker Hub',
    icon: 'fab fa-docker',
    status: 'Healthy',
    statusClass: 'ok',
    progress: 100,
    url: 'http://dockerhub.example.com',
    description: 'Centralized registry for publishing and managing container images across environments.',
    version: 'latest',
    category: 'Infrastructure',
    tags: [
      // { label: 'Containers', type: 'platform' },
      // { label: 'Image Registry', type: 'registry' },
      { label: 'Deployment', type: 'infra' },
    ],
    uptime: 89.5,
    latency: 345,
    lastChecked: new Date('2025-07-05T09:00:00Z'),
    owner: 'Infrastructure Team',
    sensitive: false,
    riskLevel: 'high',
    slaViolations: 4,
    accessRoles: ['infra', 'devops'],
    lastIncident: {
      id: 'INC-20250705-001',
      title: 'Registry unreachable for 2 hours due to DNS misconfig',
      timestamp: new Date('2025-07-05T05:00:00Z'),
      resolved: false,
    },
  },
  {
    id: 6,
    name: 'Cypress',
    icon: 'fas fa-vial',
    status: 'Pending',
    statusClass: 'warning',
    progress: 75,
    url: 'http://cypress.example.com',
    description: 'Modern JavaScript-based test framework for reliable and fast end-to-end testing.',
    version: '12.8.0',
    category: 'QA Automation',
    tags: [
      { label: 'E2E', type: 'test' },
      // { label: 'UI Tests', type: 'automation' },
      // { label: 'Assertions', type: 'framework' },
    ],
    uptime: 98.7,
    latency: 110,
    lastChecked: new Date('2025-07-05T09:10:00Z'),
    owner: 'QA Team',
    sensitive: false,
    riskLevel: 'low',
    slaViolations: 0,
    accessRoles: ['qa', 'developer'],
  },
  {
    id: 7,
    name: 'Nginx',
    icon: 'fab fa-nginx',
    status: 'Critical',
    statusClass: 'error',
    progress: 100,
    url: 'http://nginx.example.com',
    description: 'High-performance web server, reverse proxy, and load balancer for serving modern applications.',
    version: '1.24.0',
    category: 'Infrastructure',
    tags: [
      { label: 'Web Server', type: 'infra' },
      { label: 'Proxy', type: 'network' },
      { label: 'Load Balancer', type: 'infra' },
    ],
    uptime: 99.99,
    latency: 90,
    lastChecked: new Date('2025-07-05T09:15:00Z'),
    owner: 'Infrastructure Team',
    sensitive: false,
    riskLevel: 'low',
    slaViolations: 0,
    accessRoles: ['infra', 'network'],
  },
  {
    id: 8,
    name: 'Flyway',
    icon: 'fas fa-database',
    status: 'Critical',
    statusClass: 'error',
    progress: 100,
    url: 'http://flyway.example.com',
    description: 'Version control tool for database schema migrations, supporting SQL and Java-based changes.',
    version: '9.16.0',
    category: 'Database',
    tags: [
      { label: 'Migration', type: 'database' },
      { label: 'Schema Management', type: 'database' },
      { label: 'Versioning', type: 'database' },
    ],
    uptime: 99.9,
    latency: 105,
    lastChecked: new Date('2025-07-05T09:20:00Z'),
    owner: 'DBA Team',
    sensitive: true,
    riskLevel: 'medium',
    slaViolations: 1,
    accessRoles: ['dba'],
    lastIncident: {
      id: 'INC-20250620-002',
      title: 'Migration failed on production due to locked table',
      timestamp: new Date('2025-06-20T14:30:00Z'),
      resolved: true,
    },
  },
];


