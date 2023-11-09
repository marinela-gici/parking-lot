const mongoose = require('mongoose')

const ReservationSchema = new mongoose.Schema({
  plate: {
    type: String,
    required: [true, 'Car plate is required']
  },
  parking: { type: mongoose.Schema.Types.ObjectId, ref: 'Parking' },
}, { timestamps: true })

module.exports = mongoose.model('Reservation', ReservationSchema)