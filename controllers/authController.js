const JWT = require("jsonwebtoken")
const User = require("../models/user");
const logger = require("../utils/logger")

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        logger.warn("User registration failed - missing required fields");
        return res.status(400).json({ message: "All fields are required" });
    }

    try{
        // Check if user already exit
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            logger.warn(`User registration failed - email already in use: ${email}`)
            return res.status(409).json({ message: "email already in use" });
        }
        
        //Create and save new user
        const newUser = new User({ name, email, password })
        await newUser.save()

        logger.info(`User registered successfully with email: ${email}`);
        res.status(201).json({ message: "User registered successfully" })
    }
    catch (error) {
        logger.error("Error registering user", { error: error.message });
        res.status(500).json({ message: "Error registering user", error: error.message })
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        logger.warn("Login failed - missing email or password");
        return res.status(400).json({ message: "Email and Password are required" });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            logger.warn(`Login failed - user not found: ${email}`);
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        const isMatch = await existingUser.comparePassword(password);

        if (!isMatch) {
            logger.warn(`Login failed - incorrect password for email: ${email}`);
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        // Create JWT token
        const token = JWT.sign(
            { id: existingUser._id, email: existingUser.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
        );

        // Set cookie with HttpOnly flag
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use HTTPS only in production
            sameSite: "Strict", // Prevent CSRF
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        logger.info(`User logged in successfully: ${email}`);
        res.status(200).json({ message: "Login successful" });

    } catch (error) {
        logger.error("Error logging in user", { error: error.message });
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};
