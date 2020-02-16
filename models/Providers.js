var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Provider = new Schema ({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    description: {type: String},
    isBusiness: {type: Boolean, required: true},
    address: {type: String},
    city: {type: String},
    lat: {type: String},
    lon: {type: String}
});

module.exports = mongoose.model('Provider', Provider);