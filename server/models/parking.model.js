const mongoose = require('mongoose')

const ParkingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Parking name is required']
  },
  city: {
    type: String,
    required: [true, 'City is required']
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
    required: [true, 'Number of spots is required']
  },
  prices: {
    type: String,
    required: [true, 'Price list is required']
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

module.exports = mongoose.model('Parking', ParkingSchema)