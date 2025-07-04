import {Routes} from '@angular/router';
import {CallbackComponent} from './shared/components/callback/callback.component';

export const ROUTE_PATHS = {
  about: 'about',
  achievement: 'achievement',
  blog: 'blog-medium',
  callback: 'callback',
  contact: 'contact',
  dashboard: 'dashboard',
  login: 'login',
  profile: 'profile',
  registration: 'registration',
  resources: 'resources',
  setting: 'settings',
  workspace: 'workspace',
  root: '',
};

export const routes: Routes = [
  { path: ROUTE_PATHS.callback, component: CallbackComponent },
  { path: ROUTE_PATHS.root,
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent),
    runGuardsAndResolvers: 'always',
  },
  { path: ROUTE_PATHS.dashboard,
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  { path: ROUTE_PATHS.achievement,
    loadComponent: () => import('./shared/components/card-achievement/card-achievement.component').then(m => m.CardAchievementComponent),
  },
  { path: ROUTE_PATHS.blog,
    loadComponent: () => import('./features/blog-medium/blog-medium.component').then(m => m.BlogMediumComponent),
  },
  { path: ROUTE_PATHS.root,
    redirectTo: ROUTE_PATHS.root,
    pathMatch: 'full'
  },
  { path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
];
