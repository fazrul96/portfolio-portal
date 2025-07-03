import {ProfileDetail} from '../enums/profile.enum';
import {MenuItem} from '../types/portal.type';

export const PROFILE_DETAILS: ProfileDetail[] = [
  { label: 'Expected Salary', value: 'MYR 102,000 per annum (negotiable)' },
  { label: 'Availability', value: 'Available with 1-month notice' },
  { label: 'Citizenship', value: 'Malaysian Citizen' },
  { label: 'Residency Status', value: 'Permanent Resident (Malaysia)' },
  { label: 'Experience', value: '6+ years in leadership and delivery roles' },
  { label: 'Team Leadership', value: 'Led cross-functional teams of 6–10 people' },
  { label: 'Mobility', value: 'Open to regional/international travel (60–100%)' }
];

export const USER_MENU_ITEMS: MenuItem[] = [
  { label: 'Profile', icon: 'fa-user', route: '/profile' },
  { label: 'Settings', icon: 'fa-cog', route: '/settings' },
  { isComponentSwitcher: true },
  { isDivider: true },
  { label: 'Logout', icon: 'fa-sign-out', route: '/logout' },
];

export const PROFILE_CONTENT = {
  introText: "I am a Full Stack Developer with over 6 years of experience. I’m passionate about creating scalable, efficient, and user-friendly software solutions. My expertise lies in:",
  skills: [
    "Building backend systems with Java (Spring Boot) and REST APIs",
    "Cloud-based applications and services (especially with AWS)",
    "Optimizing performance and enhancing system security",
    "Integrating third-party services like payment systems",
    "Modern frontend development with React and Angular",
    "CI/CD pipelines and automating tests with Docker"
  ],
  description: "Over the years, I’ve refactored legacy systems to be more scalable and efficient. I am always focused on delivering solutions that not only meet user needs but also exceed performance, security, and availability expectations.",
  belief: "I believe in the power of technology to solve real-world problems, and I’m constantly looking for opportunities to collaborate, learn, and build meaningful projects that make a difference."
};
