var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExamRoomSchema = new Schema({
  number: {type: String, require: true},
  availability: [{
    from: {
      type: Date,
      require: true
    },
    to: {
      type: Date,
      require: true
    }
  }]
});

module.exports = mongoose.model('ExamRoom', ExamRoomSchema);
