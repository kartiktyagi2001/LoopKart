const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const product = require('../models/product-model');

router.get('/', (req, res) => {
    res.send('users route');
});

// Signup logic 

router.post("/register", async(req, res) => {
    try{
        let {name, email, password} = req.body;

        let checkUser = await userModel.findOne({email});
        if(checkUser){
            return res.send("user already exists, try logging in!");
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if(err) res.send(err.message);
                else{
                    let user = await userModel.create({
                        name,
                        email,
                        password : hash
                    });

                    let token = jwt.sign({email, id: user._id}, "secret");
                    res.cookie("token", token);
                    // res.send("user created");
                    // res.render("shop"); 
                }
            });
        }); 

    } catch(err) {
        console.log(err.message);
    }
});

// Login logic

router.post("/login", async (req, res) => {
    let {email, password} = req.body;

    let user = await userModel.findOne({email: email});

    if(!user)
            return res.send("user not found");

    bcrypt.compare(password, user.password, async(err, result) => {
        if(result) {
            let token = jwt.sign({email, id: user._id}, "secret");
            res.cookie("token", token);
            // res.send("logged in!");

            let products = await product.find().lean();
            if (!products) products = [];
            // console.log(products);
            res.render("shop", {products});
        }    
        else{
            return res.send("Wrong Credentials!");
        }
    })
});

module.exports = router;