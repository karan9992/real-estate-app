const mongoose = require('mongoose')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const userController = {
    createUser: async (req, res) => {
        try {
            const { name, email, password, role } = req.body
            console.log(name, email, password, role);


            // Check if user already exists
            let user = await User.findOne({ email });
            if (user) return res.status(400).json({ message: "User already exists" });

            user = new User({ name, email, password, role });
            await user.save();  // password gets hashed here

            res.status(201).json({ message: "User registered successfully" });

            // const result = await User.create({ name, email, password, role })
            // console.log(result);
            // res.status(201).json({ result, message: "New user created Successfully" })

        } catch (err) {

            console.log("create user error :", err);
            res.status(500).json({ error: err, message: "Registration failed" })
        }

    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: "Invalid email or password" });

            const isMatch = await user.comparePassword(password);
            if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

            //jwt
            const token = jwt.sign({ name: user.name, id: user.id, role: user.role },
                process.env.JWT_SECRET, {
                expiresIn: "1h",
            });

            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
            });
            user.password = undefined;

            res.status(200).json({ message: "Login successful", user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    logout: (req, res) => {
        res.clearCookie("token");
        res.json({ message: "Logged out successfully" });
    },
    verify: (req, res) => {
        res.json({ user: req.user });
    }


}

module.exports = userController