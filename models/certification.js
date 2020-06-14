var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CertificationSchema = new Schema({
  name: {type: String, require: true},
  duration: {type: Number, min: 1, require: true},
  provider: {type: String, require: true},
});

module.exports = mongoose.model('Certification', CertificationSchema);
