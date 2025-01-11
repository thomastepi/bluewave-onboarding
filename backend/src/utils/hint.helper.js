const { body } = require('express-validator');
const { isValidHexColor } = require('./guide.helper');

const validActions = ['no action', 'open url', 'open url in a new tab'];

const validateHintData = ({
  action,
  headerBackgroundColor,
  headerColor,
  textColor,
  buttonBackgroundColor,
  buttonTextColor,
}) => {
  const errors = [];

  // Validate action
  if (!action) {
    errors.push({ msg: 'action is required' });
    return errors;
  }

  if (!validActions.includes(action)) {
    errors.push({ msg: 'Invalid value for action' });
    return errors;
  }

  // Validate color fields
  const colorFields = {
    headerBackgroundColor,
    headerColor,
    textColor,
    buttonBackgroundColor,
    buttonTextColor,
  };

  for (const [field, value] of Object.entries(colorFields)) {
    if (value && !isValidHexColor(value)) {
      errors.push({ msg: `Invalid value for ${field}` });
    }
  }

  return errors;
};

const addHintValidator = [
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
];

module.exports = { validateHintData, addHintValidator };
