var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var userModel = new Schema({
  username: String,
  password: String
}, {collection: 'userAcount'});

module.exports = mongoose.model('userModel', userModel);