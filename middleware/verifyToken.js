const jwt = require("jsonwebtoken");
const logger = require("../utils/logger")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        logger.warn("Unauthorized access attempt - missing or malformed token");
        return res.status(401).json({ message: "unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    try{
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoder; //Attach user info to request
        logger.info(`Token verified for user ID: ${decoded.id}`);
        next(); //Proceed to next middleware
    }
    catch (error) {
        logger.warn("Invalid or expired token", { error: error.message });
        res.status(401).json({ message: "Invalid or expired token" })

    }
}

module.exports = verifyToken;