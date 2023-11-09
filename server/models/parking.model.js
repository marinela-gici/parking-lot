const mongoose = require('mongoose')

const ParkingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Parking name is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  latitude: {
    type: String,
    required: [true, 'Latitude is required'],
  },
  longitude: {
    type: String,
    required: [true, 'Longitude is required'],
  },
  spots: {
    type: Number,
    required: [true, 'Number of spots is required'],
    min: [1, "There must be at least one spot."]
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [1, 'Mininimum price must be 1 lek']
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
}, {
  timestamps: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
})

ParkingSchema.virtual('freeSpots').get(function () {
  return this.spots - this.reservations.length
})

module.exports = mongoose.model('Parking', ParkingSchema)
