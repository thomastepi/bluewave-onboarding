const GUEST_EMAIL = 'demo@guidefox.com';
const isGuestUser = (email) => {
  return email === GUEST_EMAIL;
};

const accessGuard = (permissions) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role || !permissions.includes(req.user.role)) {
      return res.status(403).json({ error: 'User does not have required access level' });
    }
    const userEmail = req.user.email;
    const isWriteOperation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method);
    if (isGuestUser(userEmail) && isWriteOperation) {
      return res.status(403).json({
        error: 'Guest users have read-only access',
      });
    }
    next();
  };
};

module.exports = accessGuard;
