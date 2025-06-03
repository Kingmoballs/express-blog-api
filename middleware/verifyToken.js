const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const verifyToken = (req, res, next) => {
    // ✅ Read token from HttpOnly cookie
    const token = req.cookies.token;

    if (!token) {
        logger.warn("Unauthorized access attempt - no token found in cookies");
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        // ✅ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ Attach user info to request
        req.user = {
            id: decoded.id,
            email: decoded.email,
        };

        logger.info(`Token verified for user ID: ${decoded.id}`);
        next();
    } catch (error) {
        logger.warn("Invalid or expired token", { error: error.message });
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = verifyToken;
