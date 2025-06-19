export const PORTAL = [
    {
        id: 'portfolio',
        title: 'Portfolio Portal (Main Hub)',
        icon: '🧩',
        status: 'Live',
        frontend: ['React (Next.js)'],
        backend: ['Spring Boot'],
        github: 'https://github.com/fazrul96/portfolio-portal',
        liveUrl: 'https://portfolio-portal.mfzrl.cyou',
        description: 'Central hub for all live apps, analytics, and dev tools.',
        features: [
            'Live metrics, scraping jobs, and widgets',
            'API explorer, tech visualizer',
            'Interactive timeline, documentation hub'
        ],
        techStack: ['React', 'Spring Boot', 'CloudFront', 'Swagger']
    },
    {
        id: 'insurance',
        title: 'Insurance Portal',
        icon: '📄',
        status: 'Live',
        frontend: ['Angular 19', 'NGXS'],
        backend: ['Spring Boot'],
        github: 'https://github.com/fazrul96/insurance-portal',
        liveUrl: 'https://insurance-portal.mfzrl.cyou/',
        description: 'Policy management system with integrated Stripe, SSO, and secure file storage.',
        features: [
            'Policy purchase, servicing, and claims',
            'Stripe payments, SSO, CAPTCHA integration',
            'S3 file uploads and management'
        ],
        techStack: ['Angular', 'Spring Boot', 'Stripe', 'S3', 'OAuth2']
    },
    {
        id: 'mosque',
        title: 'Mosque Management Portal',
        icon: '🕌',
        status: 'Live',
        frontend: ['React (Vite)'],
        backend: ['Spring Boot'],
        github: 'https://github.com/fazrul96/mosque-management-portal',
        liveUrl: 'https://mosque-portal.mfzrl.cyou',
        description: 'Donation and prayer management with real-time dashboards.',
        features: [
            'CRUD for donations, logistics, and announcements',
            'Prayer time API integration',
            'i18n support, dark mode, and responsive design'
        ],
        techStack: ['React', 'Spring Boot', 'Tailwind CSS', 'REST APIs']
    },
    {
        id: 'guard',
        title: 'Guard Management Portal',
        icon: '🛡️',
        status: 'In Development',
        frontend: ['React'],
        backend: ['Spring Boot'],
        github: 'https://github.com/fazrul96/guard-portal',
        liveUrl: '',
        description: 'Access control and incident tracking system for security guards.',
        features: [
            'Shift scheduling and location tracking',
            'Incident reporting and visitor logs',
            'Admin dashboard with role-based access'
        ],
        techStack: ['React', 'Spring Boot', 'PostgreSQL', 'Map APIs']
    },
    {
        id: 'dietitian',
        title: 'Dietitian Portal',
        icon: '🥗',
        status: 'In Development',
        frontend: ['Vue 3'],
        backend: ['Spring Boot'],
        github: 'https://github.com/fazrul96/dietitian-portal',
        liveUrl: '',
        description: 'Nutrition planner and consultation tool for dietitians and patients.',
        features: [
            'Personalized diet plans',
            'Client progress tracking',
            'Meal suggestions and reminders'
        ],
        techStack: ['Vue 3', 'Spring Boot', 'Firebase', 'Tailwind']
    },
    {
        id: 'ml',
        title: 'Machine Learning Portal',
        icon: '🤖',
        status: 'In Development',
        frontend: ['Next.js'],
        backend: ['Python FastAPI'],
        github: 'https://github.com/fazrul96/ml-portal',
        liveUrl: '',
        description: 'Visualization and deployment platform for ML models and predictions.',
        features: [
            'Model upload, versioning, and testing',
            'Real-time inference with REST API',
            'Training metrics and dataset explorer'
        ],
        techStack: ['Next.js', 'FastAPI', 'TensorFlow', 'Docker']
    }
];
