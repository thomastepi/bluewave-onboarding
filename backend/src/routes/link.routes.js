const express = require('express');
const linkController = require('../controllers/link.controller');
const authenticateJWT = require('../middleware/auth.middleware');
const settings = require('../../config/settings');
const accessGuard = require('../middleware/accessGuard.middleware');
const { linkValidator, queryValidator, idParamValidator, bodyUrlValidator } = require('../utils/link.helper');
const { handleValidationErrors } = require('../middleware/validation.middleware');

const router = express.Router();
const teamPermissions = settings.team.permissions;

router.get('/get_link_by_url', bodyUrlValidator, handleValidationErrors, linkController.getLinkByUrl);

router.use(authenticateJWT);

router.post(
  '/add_link',
  accessGuard(teamPermissions.links),
  linkValidator,
  handleValidationErrors,
  linkController.addLink
);
router.get('/get_links', queryValidator, handleValidationErrors, linkController.getLinksByHelperId);
router.get('/all_links', linkController.getAllLinks);
router.get('/get_link/:id', idParamValidator, handleValidationErrors, linkController.getLinksById);
router.put(
  '/edit_link/:id',
  accessGuard(teamPermissions.links),
  idParamValidator,
  linkValidator,
  handleValidationErrors,
  linkController.editLink
);
router.delete(
  '/delete_link/:id',
  accessGuard(teamPermissions.links),
  idParamValidator,
  handleValidationErrors,
  linkController.deleteLink
);

module.exports = router;
