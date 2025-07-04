import {EnvironmentConfig} from '../app/core/models/configuration.model';
import {
  ANGULAR_APP_API_PRIVATE_URL,
  ANGULAR_APP_API_PUBLIC_URL,
  ANGULAR_APP_API_URL,
  ANGULAR_APP_AUTH0_AUDIENCE,
  ANGULAR_APP_AUTH0_CLIENT_ID,
  ANGULAR_APP_AUTH0_DOMAIN,
  ANGULAR_APP_BASE_URL,
  ANGULAR_APP_RECAPTCHA_SITE_KEY,
  ANGULAR_APP_STRIPE_PK,
  ANGULAR_APP_STRIPE_SK, ANGULAR_APP_USER_EMAIL,
  ENABLE_CAPTCHA,
  PRODUCTION
} from '@greda/common-config/portfolio-portal/prd/environment'

export const environment: EnvironmentConfig = {
  production: PRODUCTION,
  enableRecaptcha: ENABLE_CAPTCHA,
  apiBaseUrl: ANGULAR_APP_BASE_URL,
  apiUrl: ANGULAR_APP_API_URL,
  apiPrivateUrl: ANGULAR_APP_API_PRIVATE_URL,
  apiPublicUrl: ANGULAR_APP_API_PUBLIC_URL,
  user: {
    email: ANGULAR_APP_USER_EMAIL
  },
  auth0: {
    domain: ANGULAR_APP_AUTH0_DOMAIN,
    clientId: ANGULAR_APP_AUTH0_CLIENT_ID,
    authorizationParams: {
      audience: ANGULAR_APP_AUTH0_AUDIENCE,
      redirect_uri: window.location.origin,
    }
  },
  recaptcha: {
    siteKey: ANGULAR_APP_RECAPTCHA_SITE_KEY,
  },
  stripe: {
    publishableKey: ANGULAR_APP_STRIPE_PK,
    secretKey: ANGULAR_APP_STRIPE_SK
  },
  featureFlags: {
    showAchievementComponent: false,
    showWorkspaceComponent: false,
    showExperienceTabStepperComponent : false,
  }
};

