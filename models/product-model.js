const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
name : {
    type : String,
    trim : true,
    minLength : 2
},
password :  String,
email :  String,
contact :  Number,
cart :  {
    type : Array,
    default : []
},
orders :  {
    type : Array,
    default : []
}
});

module.exports = mongoose.model('user', userSchema);