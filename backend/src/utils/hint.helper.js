const { body, param } = require('express-validator');
const { isValidHexColor } = require('./guide.helper');
const { validateUrl } = require('./link.helper');

const validActions = ['no action', 'open url', 'open url in a new tab'];

const hintValidator = [
  body('action')
    .isString()
    .notEmpty()
    .withMessage('action is required')
    .custom((value) => {
      return validActions.includes(value);
    })
    .withMessage('Invalid value for action'),
  body('headerBackgroundColor')
    .optional()
    .isString()
    .custom(isValidHexColor)
    .withMessage('Invalid value for headerBackgroundColor'),
  body('headerColor').optional().isString().custom(isValidHexColor).withMessage('Invalid value for headerColor'),
  body('textColor').optional().isString().custom(isValidHexColor).withMessage('Invalid value for textColor'),
  body('buttonBackgroundColor')
    .optional()
    .isString()
    .custom(isValidHexColor)
    .withMessage('Invalid value for buttonBackgroundColor'),
  body('buttonTextColor')
    .optional()
    .isString()
    .custom(isValidHexColor)
    .withMessage('Invalid value for buttonTextColor'),
  body('url')
    .optional()
    .isString()
    .withMessage('link URLs must be a string')
    .custom(validateUrl)
    .withMessage('Invalid value for link URLs'),
  body('actionButtonUrl')
    .optional()
    .isString()
    .withMessage('Invalid value for actionButtonUrl')
    .custom(validateUrl)
    .withMessage('Invalid value for actionButtonUrl'),
];

const paramIdValidator = [
  param('hintId').notEmpty().withMessage('hintId is required').isInt().withMessage('Invalid hint ID'),
];

const bodyUrlValidator = [body('url').notEmpty().withMessage('url is required').isURL().withMessage('Invalid URL')];

module.exports = { hintValidator, paramIdValidator, bodyUrlValidator };
