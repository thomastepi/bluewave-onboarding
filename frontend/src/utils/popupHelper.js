import * as Yup from 'yup';

const RELATIVE_URL_REGEX = /^\/([a-zA-Z0-9_-]+\/?)+$/;
const COLOR_REGEX = /^#[0-9A-Fa-f]{6}$/;

const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return RELATIVE_URL_REGEX.test(url);
  }
};

export const popupContentSchema = Yup.object().shape({
  buttonRepetition: Yup.string().test(
    'is-valid-repetition',
    'Invalid value for repetition',
    (value) =>
      value
        ? ['show only once', 'show every visit'].some(
            (validValue) => validValue.toLowerCase() === value.toLowerCase()
          )
        : true
  ),
  action: Yup.string().test(
    'is-valid-action',
    'Invalid value for action',
    (value) =>
      value
        ? ['no action', 'open url', 'open url in a new tab'].some(
            (validValue) => validValue.toLowerCase() === value.toLowerCase()
          )
        : true
  ),
  url: Yup.string()
    .test('is-valid-url', 'Invalid value for URL', validateUrl)
    .max(2000, 'URL must be at most 2000 characters'),
  actionButtonUrl: Yup.string()
    .test('is-valid-action-url', 'Invalid value for URL', validateUrl)
    .max(2000, 'URL must be at most 2000 characters'),
  actionButtonText: Yup.string(),
});

export const apperanceSchema = Yup.object().shape({
  headerBackgroundColor: Yup.string()
    .optional()
    .matches(COLOR_REGEX, 'Invalid value for headerBackgroundColor'),
  headerColor: Yup.string()
    .optional()
    .matches(COLOR_REGEX, 'Invalid value for headerColor'),
  textColor: Yup.string()
    .optional()
    .matches(COLOR_REGEX, 'Invalid value for textColor'),
  buttonBackgroundColor: Yup.string()
    .optional()
    .matches(COLOR_REGEX, 'Invalid value for buttonBackgroundColor'),
  buttonTextColor: Yup.string()
    .optional()
    .matches(COLOR_REGEX, 'Invalid value for buttonTextColor'),
});
