const checkRole = (requiredRole) => {
    return (req, res, next) => {
      if (!req.user || req.user.role !== requiredRole) {
        return res.status(403).json({
          error: '🚫 ليس لديك صلاحية للوصول إلى هذا المسار'
        });
      }
  
      // الدور صحيح، نسمح بالوصول
      next();
    };
  };
  
  module.exports = checkRole;