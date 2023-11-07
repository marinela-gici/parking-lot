const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

module.exports.authenticate = (request, response, next) => {
  try {
    const token = request.cookies?.usertoken;
    console.log(token);
    if (!token) {
      return response.status(401).json();
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
      if (err) {
        return response.status(401).json();
      } else {
        const user = await User.findOne({ _id: payload.id });
        if (!user) {
          return response.status(401).json();
        }

        request.user = user;
        next();
      }
    });
  } catch (e) {
    return response.status(401).json();
  }
};
