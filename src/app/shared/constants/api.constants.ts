const BASE_S3 = 's3';
const BASE_AUTH = 'auth';

export const USER_API = {
  USER_LOGIN: `${BASE_AUTH}/login`,
  USER_LOGIN_AUTH0: `${BASE_AUTH}/loginAuth0`,
  USER_REGISTRATION: `${BASE_AUTH}/signup`
};

export const MEDIUM_API = {
  MEDIUM: `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40mfbr`,
};

export const PAYMENT_API = {
  POST_STRIPE_INTENT: 'stripe/payment-intent',
};

type PortfolioEntity = keyof typeof BASE_PATHS;

const BASE_PATHS = {
  projects: 'projects',
  experiences: 'experiences',
  skills: 'skills',
  educations: 'educations',
  certifications: 'certifications',
  notifications: 'notifications',
} as const;

export const PORTFOLIO_API = {
  BASE: BASE_PATHS,
  ID_PATH: (entity: PortfolioEntity, id: number): string => `${entity}/${id}`,
};

export const EMAIL_API = {
  ACCOUNT_MESSAGES: 'accounts/messages',
};

export const S3_API = {
  BASE: BASE_S3 ,
  UPLOAD_FILES: `${BASE_S3}/uploadFiles`,
  DELETE_FILE: `${BASE_S3}/deleteFile`,
  DOWNLOAD_FILE: `${BASE_S3}/downloadFile`,
  LIST_FILES: `${BASE_S3}/listFiles`
};
