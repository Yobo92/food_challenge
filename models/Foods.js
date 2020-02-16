var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Food = new Schema ({
    name: {type: String, required: true},
    description: {type: String},
    date_posted: {type: String},
    PId: {type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true}   
});

module.exports = mongoose.model('Food', Food);