const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
  app.post("/api/register", UserController.register);
  app.post("/api/login", UserController.login);
  app.post("/api/logout", UserController.logout);

  app.get("/api/dashboard/profile", authenticate, UserController.getOneUser);
  app.patch("/api/dashboard/profile", authenticate, UserController.updateUser);
  app.post("/api/dashboard/profile/change-password", authenticate, UserController.updatePassword);
}