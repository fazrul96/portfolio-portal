export interface EnvironmentConfig {
  production: boolean,
  enableRecaptcha: boolean,
  apiBaseUrl: string,
  apiUrl: string,
  apiPrivateUrl: string,
  apiPublicUrl: string,
  user?: EnvironmentAdmin,
  auth0: EnvironmentAuth0,
  recaptcha: EnvironmentCaptcha
  stripe: EnvironmentStripe,
  featureFlags?:EnvironmentFeatureFlags
}

export interface EnvironmentAuth0 {
  domain: string,
  clientId: string,
  authorizationParams: {
    audience: string,
    redirect_uri: string,
  }
}

export interface EnvironmentCaptcha {
  siteKey: string
}

export interface EnvironmentStripe {
  publishableKey: string,
  secretKey: string
}

export interface EnvironmentAdmin {
  email: string,
}

export interface EnvironmentFeatureFlags {
  showAchievementComponent: boolean,
  showWorkspaceComponent: boolean
  showExperienceTabStepperComponent: boolean
}
