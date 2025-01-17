import * as Yup from 'yup';

const RELATIVE_URL_REGEX = /^\/([a-zA-Z0-9_-]+\/?)+$/;

const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return RELATIVE_URL_REGEX.test(url);
  }
};

const newHintSchema = Yup.object().shape({
  actionButtonText: Yup.string(),
  actionButtonUrl: Yup.string()
    .test('url', 'Invalid value for URL', validateUrl)
    .max(2000, 'URL must be at most 2000 characters'),
  action: Yup.string().oneOf(
    ['no action', 'open url', 'open url in a new tab'],
    'Invalid value for action'
  ),
  targetElement: Yup.string().test(
    'targetElement',
    'Invalid value for targetElement',
    (value) => {
      return value.startsWith('#') || value.startsWith('.');
    }
  ),
  tooltipPlacement: Yup.string().oneOf(
    ['top', 'bottom', 'right', 'left'],
    'Invalid value for tooltipPlacement'
  ),
  url: Yup.string()
    .test('url', 'Invalid value for URL', validateUrl)
    .max(2000, 'URL must be at most 2000 characters'),
});

export { newHintSchema };
