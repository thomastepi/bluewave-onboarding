const settings = require('../../config/settings');

const URL_REGEX =
  /(?:https?:\/\/(?:www\.)?|www\.)?[a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-\d@:%_+.~#?&//=]*)|(?:\/[a-zA-Z0-9@:%._+~#&//=]*)/gi;

const RELATIVE_URL_REGEX = /^\/([a-zA-Z0-9_-]+\/?)+$/;

const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return RELATIVE_URL_REGEX.test(url);
  }
};

const validateTriggeringFrequency = (value) => {
  const validFrequencies = settings.tour.triggeringFrequency;
  return validFrequencies.includes(value.toLowerCase());
};

const validatePageTargeting = (value) => {
  const validPageTargetingValues = settings.tour.pageTargeting;
  return validPageTargetingValues.includes(value.toLowerCase());
};

const validateTheme = (value) => {
  const validThemes = settings.tour.themes;
  return validThemes.includes(value.toLowerCase());
};

module.exports = {
  validateTriggeringFrequency,
  validatePageTargeting,
  validateTheme,
  URL_REGEX,
  validateUrl,
};
