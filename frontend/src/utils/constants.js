// API constants Dev
// const FALLBACK_URL = 'localhost:5000';
// export const BASE_URL = import.meta?.env?.VITE_BASE_URL || FALLBACK_URL;
// export const API_BASE_URL = `http://${BASE_URL}/api/`;

// API constants Prod
const FALLBACK_URL = 'bluewave-onboarding.vercel.app';
export const BASE_URL = import.meta?.env?.VITE_BASE_URL || FALLBACK_URL;
export const API_BASE_URL = `https://${BASE_URL}/api/`;

// Other constants
export const APP_TITLE = 'Bluewave Onboarding';
export const SUPPORT_EMAIL = 'support@bluewave.com';

export const DEMO_USER_CREDENTIALS = Object.freeze({
  email: 'demo@guidefox.com',
  password: 'DemoPassword123',
});

export const roles = Object.freeze(['admin', 'member']);
export const URL_REGEX = Object.freeze({
  PROTOCOL: /^(https?:\/\/)/,
  DOMAIN: /^https?:\/\/([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/,
});
