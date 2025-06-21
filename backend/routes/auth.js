const express = require("express")
const User = require("../models/User")
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
const fetchuser = require("../middleware/fetchuser")

// JSON Web Token
// Algorithm and Header + Payload(Data) + Signature(Secret)
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET

const router = express.Router()

// ROUTE 1: Create user using POST "/api/auth/createuser", No Login required
router.post("/createuser", [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false

    // If there are errors, return bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ success, errors: result.array() });
    }

    try {
        // Check whether the user with this email exists already
        let user = await User.findOne({email: req.body.email})
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" });
        }

        // Generating salt and hashing password
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)

        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)

        res.json({ success: true, authtoken })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 2: Authenticate a user using POST "/api/auth/login", No Login required
router.post("/login", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success = false

    // If there are errors, return bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ success, errors: result.array() });
    }

    const {email, password} = req.body
    try {
        let user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        res.json({ success: true, authtoken })

    } catch(err) {
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 3: Get logged in user details using POST "/api/auth/getuser", Login required
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router