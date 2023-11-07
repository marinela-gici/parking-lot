const ParkingController = require('../controllers/parking.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
  app.post("/api/dashboard/create-parking", authenticate, ParkingController.createParking);
  app.get("/api/dashboard/user/parkings", authenticate, ParkingController.getUserParkings);

  app.get("/api/parkings", ParkingController.getAllParkings);
  app.get("/api/cities", ParkingController.getCities);
}