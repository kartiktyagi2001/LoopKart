const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');

console.log(process.env.NODE_ENV); //development environment

// if(process.env.NODE_ENV === "development"){
//     router.post('/create', async(req, res) => {

        
// }

router.post("/create", async(req, res, next) => {
    if (process.env.NODE_ENV !== "development") {
      return res.status(403).send("Not allowed in production");
    }

    let owner = await ownerModel.find();
    if (owner.length > 0) {
      return res.status(403).send("You cannot become an owner.");
    }

    let {name, password, email} = req.body;

        let createdOwner = await ownerModel.create({
            name,
            password,
            email,
        });
        res.status(201).send(createdOwner);
    });


router.get('/', (req, res) => {
    res.send('owners route');
});


// NODE_ENV=development
module.exports = router;