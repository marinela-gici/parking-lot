const Parking = require('../models/parking.model')
const { request } = require('express')

module.exports = {
  createParking: (request, response) => {
    Parking.create({ ...request.body, user: request.user._id }).
      then((saveResult) => response.json(saveResult)).
      catch((err) => response.status(400).json(err))
  },

  getUserParkings: (request, response) => {
    Parking.find({ user: request.user._id }).
      populate('user').
      sort({ createdAt: 'desc' }).
      then((parkings) => {
        console.log(parkings)
        response.json(parkings)
      }).
      catch((err) => {
        console.log(err)
        response.status(400).json(err)
      })
  },
//   getUserPost: (request, response) => {
//     Post.findOne({_id: request.params.id, user: request.user._id})
//       // .populate('applications')
//       .then((post) => {
//         console.log(post);
//         response.json(post);
//       })
//       .catch((err) => {
//       console.log(err);
//       response.status(400).json(err)
//     });
//   },
//
  getAllParkings: (request, response) => {
    let options = {}
    let city = request.query.city
    if (city) {
      options.city = city
    }

    console.log(options)

    Parking.find(options).sort({ createdAt: 'desc' })
    .then((parkings) => {
        // console.log(parkings)
        response.json(parkings)
      }).
      catch((err) => {
        console.log(err)
        response.status(400).json(err)
      })
  },

  getCities: (request, response) => {
    Parking.find().
      distinct('city').
      then(cities => response.json(cities)).
      catch((err) => {
        console.log(err)
        response.status(400).json(err)
      })
  },
//
//   updatePost: (request, response) => {
//     Post.findOneAndUpdate({_id: request.params.id}, request.body, {
//       new: true, runValidators: true
//     })
//     .then((updatedPost) => response.json(updatedPost))
//     .catch((err) => response.status(400).json(err));
//   },
//
//   deletePost: (request, response) => {
//     Post.deleteOne({_id: request.params.id})
//     .then((deleteConfirmation) => {
//       // Application.deleteMany({job: request.params.id})
//       //     .then(res => console.log(res))
//       response.json(deleteConfirmation);
//     })
//     .catch((err) => response.status(400).json(err)
//     );
//   },
//
}

