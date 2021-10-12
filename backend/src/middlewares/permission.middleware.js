const resources = {
  user: {
    create: ['admin', 'user'],
    read: ['admin'],
    update: ['admin'],
    delete: ['admin'],
  },
  foodEntry: {
    create: ['admin', 'user'],
    read: ['admin', 'user'],
    update: ['admin'],
    delete: ['admin'],
  },
  meal: {
    create: ['admin', 'user'],
    read: ['admin', 'user'],
    update: ['admin', 'user'],
    delete: ['admin'],
  },
  userReport: {
    read: ['user', 'admin'],
  },
  adminReport: {
    read: ['admin'],
  },
};

function hasPermission(action, resource) {
  return async (req, res, next) => {
    try {
      const role = req.user.role;
      if (resources[resource][action].includes(role)) {
        next();
      } else {
        return res.status(403).json({
          success: false,
          error: 'Not authorised.',
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(403).json({
        success: false,
        error: 'Not authorised.',
      });
    }
  };
}

export default hasPermission;
