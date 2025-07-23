export interface ButtonConfig {
  id: number;
  label: string;
  icon: string;
  backgroundColor: string;
  isActive: boolean;
}

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

export interface Icon {
  icon: string,
  text: string,
}

export interface DialogData {
  badge: string;
  title: string;
  subtitle?: string;
  features?: Icon[];
  note?: string;
  trialOffer?: boolean;
  showAction?: boolean;
  actionLabel?: string;
}

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

export const ACCESS_DIALOG_DATA: DialogData = {
  badge: 'PREMIUM ACCESS',
  title: 'Premium',
  subtitle: 'And save 25% if you stay!',
  features: [
    { icon: 'bolt', text: 'No credit card required' },
    { icon: 'local_offer', text: '25% discount after trial' },
    { icon: 'stars', text: 'Full access to all premium features' }
  ],
  note: '* This is a fictional premium offer for demonstration purposes only.',
  trialOffer: true,
  actionLabel: 'Start Free Trial'
};

export const FEATURE_DIALOG_DATA: DialogData = {
  badge: '🚧 IN DEVELOPMENT',
  title: 'Upcoming Features',
  subtitle: 'I’m actively working on improvements to this portfolio!',
  features: [
    { icon: 'build', text: 'Jenkins CI/CD Integration' },
    { icon: 'payment', text: 'Stripe Payment Setup' },
    { icon: 'schedule', text: 'Batch Job System' },
    { icon: 'web', text: 'Portfolio UI/UX Improvements' },
  ],
  note: '* This information reflects development progress and may change.',
  trialOffer: false,
  actionLabel: 'Got it!'
};

