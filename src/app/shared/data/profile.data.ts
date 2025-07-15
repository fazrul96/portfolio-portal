import {ProfileDetail} from '../enums/profile.enum';
import {environment} from '../../../environments/environment';

export const PROFILE_DETAILS: ProfileDetail[] = [
  { label: 'Expected Salary', value: 'MYR 102,000 per annum (Negotiable)' },
  { label: 'Availability', value: '1-month notice period' },
  { label: 'Citizenship', value: 'Malaysian' },
  { label: 'Residency Status', value: 'Permanent Resident (Malaysia)' },
  { label: 'Professional Experience', value: '6+ years in full-stack development and system delivery' },
  { label: 'Leadership Experience', value: 'Led cross-functional teams of 6–10 members' },
  { label: 'Travel Flexibility', value: 'Willing to travel regionally or internationally (60–100%)' },
];

export const PROFILE_CONTENT = {
  name: "Fazrul Romli",
  title: "Full-Stack Developer",
  avatar: "assets/images/profile/profile-img.jpg",
  location: "Selangor, Malaysia",
  email: environment.user?.email,
  status: ["Available", "6Y+ XP"],
  verified: true,
  tooltip: "Fazrul has verifications",
  introText:
    "Full-Stack Developer with 6+ years of experience in backend systems, frontend frameworks, DevOps, and cloud infrastructure.",
  skills: [
    "Java (Spring Boot) & RESTful API development",
    "React, Angular, and modern frontend design",
    "AWS services (EC2, S3, Lambda, CloudFront)",
    "CI/CD pipelines using Docker, Jenkins, SonarQube",
    "Automated testing with Cypress, PHPUnit, JUnit",
    "Payment gateway & third-party API integration",
  ],
  skillStack: ["Angular", "React", "Spring Boot", "AWS", "CI/CD"],
  description:
    "I specialize in building robust systems across domains including insurance, finance, telco, and logistics. My focus is on performance, scalability, and developer-first architecture. Passionate about automation and delivering high-quality, real-world solutions.",
  belief:
    "I believe technology should solve real problems. I'm driven to build systems that are reliable, efficient, and impactful to end users and developers alike.",
};

