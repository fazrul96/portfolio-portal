import {Component} from '@angular/core';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-profile',
  imports: [
    MatTooltip
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profile = {
    name: 'Your Name',
    title: 'DevOps & Software Engineer',
    avatar: 'assets/images/avatar.jpg',
    location: 'Jakarta, Indonesia',
    email: 'your.email@example.com',
    bio: `I'm a passionate engineer who bridges the gap between development and operations.
          I build scalable, secure, and automated systems.`,
    github: 'https://github.com/yourhandle',
    linkedin: 'https://linkedin.com/in/yourhandle',
    website: 'https://yourportfolio.com',
  };

  skills: string[] = [
    'CI/CD', 'Infrastructure as Code', 'Kubernetes',
    'AWS & GCP', 'Monitoring & Logging', 'Automation Scripting',
    'Angular', 'Node.js', 'Python', 'Docker', 'Linux', 'Terraform'
  ];

  tools = [
    { name: 'Jenkins', icon: 'fab fa-jenkins' },
    { name: 'GitHub Actions', icon: 'fab fa-github' },
    { name: 'Docker', icon: 'fab fa-docker' },
    { name: 'Kubernetes', icon: 'fas fa-network-wired' },
    { name: 'Prometheus', icon: 'assets/images/icons/prometheus.png' },
    { name: 'Grafana', icon: 'assets/images/icons/grafana.png' },
    { name: 'Terraform', icon: 'assets/images/icons/terraform.png' }
  ];
}
