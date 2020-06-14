var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExamSchema = new Schema({
  date: {type: Date, require: true},
  status: {type: String, enum: ['NEW', 'NOT_VALIDATED', 'VALIDATED', 'PASSED'], require: true},
  score: {type: Number, min: 0, max: 100},
  student: { type: Schema.Types.ObjectId, ref: 'User' },
  supervisor: { type: Schema.Types.ObjectId, ref: 'User' },
  examRoom: { type: Schema.Types.ObjectId, ref: 'ExamRoom' },
});

module.exports = mongoose.model('Exam', ExamSchema);
