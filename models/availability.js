var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AvailabilitySchema = new Schema({
  from: {type: Date, require: true},
  to: {type: Date, require: true},
});

module.exports = mongoose.model('Availability', AvailabilitySchema);
