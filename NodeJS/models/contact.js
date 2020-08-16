const mongoose = require('mongoose');

var Contact = mongoose.model('Contact', {
    name: {type:String},
    phone1: {type:String},
    phone2: {type:String},
    phone3: {type:String},
    address: {type:String}
});

module.exports = {Contact};