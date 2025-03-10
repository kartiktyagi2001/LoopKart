const mongoose = require('mongoose');
const config = require('config');
const dbgr = require("debug")('development: mongoose'); //i had problems here(the name 'development' here must be same as config folder file)

mongoose
    .connect(`${config.get('MONGODB_URI')}/loopkart`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => dbgr("connection successful"))
    .catch(err => dbgr(err));

module.exports = mongoose.connection;