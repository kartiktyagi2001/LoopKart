const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async (req, res, next) => {
    if(!req.cookies.token) {
        req.flash("error", "Please login first");
        return
            res.redirect('/');
    }

    try{
        let decodedToken = jwt.verify(req.cookies.token, "secret");

        let user = await userModel.findOne({email: decodedToken.email});

        req.user = user; // created a new property in req object(user) and assigned the user object to it

        next();
    }
    catch(err) {
        req.flash("error", "Something went wrong, try again");
        res.redirect('/');
    }
};