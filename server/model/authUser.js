const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        unique: true
    },
   password: String
    
})

const authUserdb = mongoose.model('authUserdb', schema);

module.exports = authUserdb;