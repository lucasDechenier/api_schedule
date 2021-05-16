const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    userId: {type: String},
    startDay: {type: Number},
    startHour: {type: Number},
    startMinute: {type: Number},
    prediction: {type: String}
})  

module.exports = mongoose.model('Schedule', scheduleSchema);