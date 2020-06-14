var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExamRoomSchema = new Schema({
  number: {type: String, require: true},
  availability: [{
    type: Schema.Types.ObjectId, ref: 'Availability'
  }]
});

module.exports = mongoose.model('ExamRoom', ExamRoomSchema);
