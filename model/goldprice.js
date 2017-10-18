var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var goldPrice = new Schema({
  "buy9999": Number,
  "sell9999": Number,
  "buy95_5": Number,
  "sell95_5": Number,
  "buy95": Number,
  "sell95": Number,
  "buy68": Number,
  "sell68": Number,
  "buy61": Number,
  "sell61": Number,
  "buy41_6": Number,
  "sell41_6": Number,
  "buy75_g": Number,
  "sell75_g": Number
}, {collection: 'goldPrice'});

module.exports = mongoose.model('goldPrice', goldPrice);