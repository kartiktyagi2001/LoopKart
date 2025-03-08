const mongoose = require('mongoose');

const ownerModel = mongoose.Schema({
name : {
    type : String,
    trim : true,
    minLength : 2
},
password :  String,
email :  String,
contact :  Number,
products : {
    type : Array,
    default : []
},
gstin : String
});

module.exports = mongoose.model('owner', ownerModel);