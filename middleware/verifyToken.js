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
        const decoder = jwt.verify(token, process.env.JWT_SECRET);const jwt = require("jsonwebtoken");
        const logger = require("../utils/logger");
        
        const verifyToken = (req, res, next) => {
            // Read token from HttpOnly cookie
            const token = req.cookies.token;
        
            if (!token) {
                logger.warn("Unauthorized access attempt - no token found in cookies");
                return res.status(401).json({ message: "Unauthorized: No token provided" });
            }
        
            try {
                // Verify and decode token
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
                // Attach user info to request object
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
        
        req.user = decoder; //Attach user info to request
        logger.info(`Token verified for user ID: ${decoder.id}`);
        next(); //Proceed to next middleware
    }
    catch (error) {
        logger.warn("Invalid or expired token", { error: error.message });
        res.status(401).json({ message: "Invalid or expired token" })

    }
}

module.exports = verifyToken;