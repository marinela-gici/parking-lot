const ParkingController = require('../controllers/parking.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
  app.get("/api/dashboard", authenticate, ParkingController.getDashboard);
  app.post("/api/dashboard/create-parking", authenticate, ParkingController.createParking);
  app.get("/api/dashboard/user/parkings", authenticate, ParkingController.getUserParkings);
  app.get("/api/dashboard/user/parkings/:id", authenticate, ParkingController.getUserParking);

  app.get("/api/parkings", ParkingController.getAllParkings);
  app.get("/api/parkings-paginated", ParkingController.getPaginatedParkings);
  app.get("/api/parkings/:id", ParkingController.getParkingDetails);
  app.get("/api/cities", ParkingController.getCities);

  app.post("/api/parkings/:id/reserve", ParkingController.reserveParking);
  app.post("/api/parkings/:id/exit", ParkingController.exitParking);
}