const Parking = require('../models/parking.model')
const Reservation = require('../models/reservation.model')
const paginate = require('express-paginate')
const moment = require('moment');

module.exports = {
  getDashboard: async (request, response) => {
    try {
      const parkings = await Parking.find({ user: request.user._id })
      const free = parkings.reduce((sum, parking) => sum + parking.freeSpots,
        0)

      response.json({ total: parkings.length, free })

    } catch (err) {
      response.status(400).json(err)
    }
  },

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

  getUserParking: (request, response) => {
    Parking.findOne({ _id: request.params.id, user: request.user._id }).
      populate({
        path: 'reservations',
        options: {
          sort: { 'createdAt': 'desc' },
        },
      }).
      then((parking) => {
        console.log(parking)
        response.json(parking)
      }).
      catch((err) => {
        console.log(err)
        response.status(400).json(err)
      })
  },

  getParkingDetails: (request, response) => {
    Parking.findOne({ _id: request.params.id })
      // .populate('applications')
      .then((parking) => {
        console.log(parking)
        response.json(parking)
      }).catch((err) => {
      console.log(err)
      response.status(400).json(err)
    })
  },

  getAllParkings: (request, response) => {
    let options = {}
    let city = request.query.city
    if (city) {
      options.city = city
    }

    Parking.find(options).sort({ createdAt: 'desc' }).then((parkings) => {
      // console.log(parkings)
      response.json(parkings)
    }).
      catch((err) => {
        console.log(err)
        response.status(400).json(err)
      })
  },

  getPaginatedParkings: async (request, response, next) => {
    try {
      let options = {}
      let city = request.query.city
      if (city) {
        options.city = city
      }

      const limit = request.query.limit ?? 5
      const skip = request.skip ?? 0
      const page = request.query.page ?? 1

      const [results, itemCount] = await Promise.all([
        Parking.find(options).
          skip(skip).
          limit(limit).
          sort({ createdAt: 'desc' }).
          exec(),
        Parking.count(options),
      ])

      const pageCount = Math.ceil(itemCount / limit)

      response.json({
        parkings: results,
        pageCount,
        itemCount,
        links: paginate.getArrayPages(request)(pageCount, pageCount, page),
      })
    } catch (err) {
      response.status(400).json(err)
    }
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

  reserveParking: async (request, response) => {
    const parking = await Parking.findOne({ _id: request.params.id })
    if (parking.freeSpots === 0) {
      return response.status(400).json({
        errors: { full: { message: 'Parking is full.' } },
      })
    }
    Reservation.exists({ plate: request.body.plate }).
      then((reservationExists) => {
        if (reservationExists) {
          return Promise.reject({
            errors: { plate: { message: 'Car with given plate number is already parked.' } },
          })
        }

        return Reservation.create(
          { ...request.body, parking: request.params.id }).
          then((reservation) => {
            Parking.findOne({ _id: reservation.parking }).
              then(async parking => {
                if (parking) {
                  parking.reservations.push(reservation._id)
                  await parking.save()

                  response.json(await reservation.populate('parking'))
                }
              }).
              catch((err) => Promise.reject(err))
          }).
          catch((err) => Promise.reject(err))
      }).catch((err) => response.status(400).json(err))
  },

  exitParking: async (request, response) => {
    try {
      const reservationNumber = request.body.reservationNumber
      const parking = await Parking.findOne({ _id: request.params.id })
      Reservation.findOneAndDelete({ _id: reservationNumber, parking: parking._id }).
        then(async reservation => {
          if (!reservation) {
            return Promise.reject({
              errors: { reservationNumber: { message: 'Please insert valid reservation number.' } },
            })
          }

          parking.reservations = parking.reservations.filter(function (item) {
            return item.toString() !== reservationNumber
          })
          await parking.save()

          const now = moment.utc();
          const seconds = now.diff(moment.utc(reservation.createdAt), 'seconds');
          const hours = Math.ceil(seconds / 3600);
          const total = parking.price * hours

          response.json({...reservation.toObject(), parking: parking, total: total})
        }).
        catch(err => response.status(400).json({
          errors: { reservationNumber: { message: 'Please insert valid reservation number.' } },
        }))
    } catch (err) {
      response.status(400).json({
        errors: { reservationNumber: { message: 'Please insert valid reservation number.' } },
      })
    }
  },
}
