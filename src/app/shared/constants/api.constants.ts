const BASE_S3 = 's3';
const BASE_AUTH = 'auth';
const BASE_LEETCODE = 'leetcode';

const PORTFOLIO_CONTENT = 'portfolio-content';
const WEBTOON_CONTENT = 'webtoons-content';

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
  experienceCategories: 'experience-categories',
  skills: 'skills',
  educations: 'educations',
  certifications: 'certifications',
  notifications: 'notifications',
  webtoons: 'webtoons',
} as const;

export const PORTFOLIO_API = {
  BASE: BASE_PATHS,
  ID_PATH: (entity: PortfolioEntity, id: number): string => `${entity}/${id}`,
};

export const LEETCODE_API = {
  GRAPHQL_SUBMIT_STATS: `https://${BASE_LEETCODE}.com/graphql`,
  GRAPHQL_STATS: `https://${BASE_LEETCODE}-stats-api.herokuapp.com/fazrul96`,
};

export const EMAIL_API = {
  ACCOUNT_MESSAGES: 'accounts/messages',
};

export const S3_API = {
  BASE: BASE_S3 ,
  UPLOAD_FILES: `${BASE_S3}/uploadFiles`,
  DELETE_FILE: `${BASE_S3}/deleteFile`,
  DELETE_FOLDER: `${BASE_S3}/deleteFolder`,
  VIEW_FILE: `${BASE_S3}/viewFile`,
  DOWNLOAD_FILE: `${BASE_S3}/downloadFile`,
  DOWNLOAD_FOLDER: `${BASE_S3}/downloadFolder`,
  LIST_FILES: `${BASE_S3}/listFiles`,
  PRESIGN_URL: `${BASE_S3}/presignUrl`,

  PREFIXES: {
    PORTFOLIO: `${(PORTFOLIO_CONTENT)}/`,
    RESUME: `${(PORTFOLIO_CONTENT)}/resume/`,
    SNAPSYNCH: `${(PORTFOLIO_CONTENT)}/snapsynch/snapSynch.pdf`,
    WEBTOONS: `${(WEBTOON_CONTENT)}/`,
  },
};
