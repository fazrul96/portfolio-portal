export const API_BASE_URL = process.env.REACT_APP_BASE_URL || "https://spring-boot-app.mfzrl.cyou" || 'http://localhost:8080';
export const API_PRIVATE_URL = process.env.REACT_APP_API_PRIVATE_URL;
export const API_PUBLIC_URL = process.env.REACT_APP_API_PUBLIC_URL;

export const API_FLASK_BASE_URL = process.env.REACT_APP_API_FLASK_BASE_URL || 'http://localhost:5001';

export const AUTH0_AUDIENCE = process.env.REACT_APP_AUTH0_AUDIENCE;
export const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
export const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;

export const AUTH0_SCOPE_READ_ITEMS = 'read:items';
export const AUTH0_PROMPT = 'consent';

export const BLOGS = 'blogs';
export const CERTIFICATIONS = 'certifications';
export const EDUCATIONS = 'educations';
export const EXPERIENCES = 'experiences';
export const PROJECTS = 'projects';
export const SKILLS = 'skills';

export const UPLOAD_WEBTOON = 'upload-webtoon';
export const GENERATE_GRAPH_BLOOD_PRESSURE = 'generate-graph';
export const WEBTOON_SYNC = 'webtoon-sync';
export const DOWNLOAD_WEBTOON = 'download-webtoon';
export const LATEST_CHAPTER_WEBTOON = 'latest-chapter-webtoon';
export const PROCESS_ZIP = 'process-zip';
export const WEBTOONS = 'webtoons';
export const WEBTOON_EXTRACT = 'downloadAndExtract';
export const PROCESS_OCR = 'processOCR';
export const MOSQUE_USERS = 'mosque-user-donations';
export const MOSQUE_USER_ID = 'mosque-user-donations/{id}';
export const MOSQUE_INVENTORIES = 'mosque-inventories';
export const MOSQUE_INVENTORY_ID = 'mosque-inventories/{id}';

export const ACCOUNT_MESSAGES = 'accounts/messages';

export const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour

export const LOCAL_STORAGE_KEY = 'webtoon-images-cache';

export const MINIO_LIST_FILES = 'listFiles';
export const MINIO_DOWNLOAD_FILE = 'downloadFile';
export const MINIO_UPLOAD_FILES = 'uploadFiles';
export const MINIO_DELETE_FILE = 'deleteFile';