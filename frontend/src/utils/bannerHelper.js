import * as Yup from 'yup';

// const RELATIVE_URL_REGEX = /^\/([a-zA-Z0-9_-]+\/?)+$/;
// const ABSOLUTE_URL_REGEX = /^(https?:\/\/)[\w.-]+(?:\.[\w\.-]+)+(?:\/.*)?$/;

// const validateUrl = (url) => {
//   return RELATIVE_URL_REGEX.test(url) || ABSOLUTE_URL_REGEX.test(url);
// };

// const validateUrl = (url) => {
//   try {
//     const parsedUrl = new URL(url, 'http://dummy-base.com'); // Use a base URL for relative URLs
//     return (
//       parsedUrl.protocol === 'http:' ||
//       parsedUrl.protocol === 'https:' ||
//       url.startsWith('/')
//     );
//   } catch {
//     return false;
//   }
// };

// const validateUrl = (url) => {
//   try {
//     new URL(url);
//   } catch (e) {
//     return false;
//   }
//   return true;
// };

const RELATIVE_URL_REGEX = /^\/([a-zA-Z0-9_-]+\/?)+$/;
const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return RELATIVE_URL_REGEX.test(url);
  }
};

const newBannerSchema = Yup.object().shape({
  action: Yup.string().oneOf(
    ['no action', 'open url', 'open url in a new tab'],
    'Invalid value for action'
  ),
  url: Yup.string()
    .test('url', 'Invalid value for URL', validateUrl)
    .max(2000, 'URL must be at most 2000 characters'),
  actionUrl: Yup.string()
    .test('actionUrl', 'Invalid value for Action URL', validateUrl)
    .max(2000, 'URL must be at most 2000 characters'),
});

// In case user want to accept empty fields
// const appearanceSchema = Yup.object().shape({
//   backgroundColor: Yup.string()
//     .optional()
//     .matches(/^#[0-9A-Fa-f]{6}$/, 'Invalid value for Background Color'),
//   fontColor: Yup.string()
//     .optional()
//     .matches(/^#[0-9A-Fa-f]{6}$/, 'Invalid value for Font Color'),
// });

const appearanceSchema = Yup.object().shape({
  backgroundColor: Yup.string()
    .matches(/^#[0-9A-Fa-f]{6}$/, 'Invalid value for Background Color')
    .required('Background Color is required'),
  fontColor: Yup.string()
    .matches(/^#[0-9A-Fa-f]{6}$/, 'Invalid value for Font Color')
    .required('Font Color is required'),
});

export { newBannerSchema, appearanceSchema };
