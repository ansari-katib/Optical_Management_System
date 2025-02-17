const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  appointmentId: { type: Number, required: true},
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  doctorName: { type: String, required: true },
  status: { type: String, default: 'Scheduled' }, // e.g., Scheduled, Completed, Missed
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;
