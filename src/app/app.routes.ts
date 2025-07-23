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
  storage: 'storage',
  billing: 'billing',
  webtoon: 'webtoon',
  webtoonSeries: 'webtoon-series',
  webtoonReader: 'webtoon-reader',
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
  { path: ROUTE_PATHS.profile,
    loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent),
  },
  { path: ROUTE_PATHS.setting,
    loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent),
  },
  { path: ROUTE_PATHS.workspace,
    loadComponent: () => import('./features/workspace/workspace.component').then(m => m.WorkspaceComponent),
  },
  { path: ROUTE_PATHS.storage,
    loadComponent: () => import('./features/storage/storage.component').then(m => m.StorageComponent),
  },
  { path: ROUTE_PATHS.billing,
    loadComponent: () => import('./features/billing/billing.component').then(m => m.BillingComponent),
  },
  { path: ROUTE_PATHS.webtoon,
    loadComponent: () => import('./features/webtoon/webtoon.component').then(m => m.WebtoonComponent),
  },
  { path: ROUTE_PATHS.webtoonSeries,
    children: [
      {
        path: ':title',
        loadComponent: () => import('./features/webtoon-series/webtoon-series.component').then(m => m.WebtoonSeriesComponent),
      }
    ]
  },
  { path: ROUTE_PATHS.webtoonReader,
    children: [
      {
        path: ':title/chapter/:webtoonChapter',
        loadComponent: () => import('./features/webtoon-reader/webtoon-reader.component').then(m => m.WebtoonReaderComponent),
      }
    ]
  },
  { path: ROUTE_PATHS.root,
    redirectTo: ROUTE_PATHS.root,
    pathMatch: 'full'
  },
  { path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
];
