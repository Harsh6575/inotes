const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'InotescraetedwithRE@(T';

//                            ===ROUTE 1 ===

// create a user  no login required
router.post('/createuser', [
    body('name', 'Enter name of length greater than 3 or enter valid name').isLength({ min: 3 }),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'password must be 5 characters').isLength({ min: 5 })
], async (req, res) => {

    let success = false;

    // if there are error, return bad request and the errors  

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    // check user exist with this email 
    try {

        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ success, error: "sorry a user with this email is already exist" });
        }

        // secure password 
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(authToken);

        success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error has been occur");
    }

});

//                            ===ROUTE 2 ===

// authentication of a user login required

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

    let success = false;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ success, authToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

//                            ===ROUTE 3 ===

// get logged in user details using :--  api/auth/getuser  login required


router.post('/getuser', fetchuser, async (req, res) => {
    try {

        userId = req.user.id;

        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

module.exports = router