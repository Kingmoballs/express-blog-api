const express = require('express');
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const logger = require("./utils/logger")
const cors = require("cors");
app.use(cors());

const postRoutes = require('./routes/posts');
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 3000; // ✅ Moved this up

mongoose.connect(process.env.mongoURI)
  .then(() => {
    logger.info("mongoDB connected successfully");
    app.listen(PORT, () => {
      logger.info(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => logger.error("mongoDB connection error", err));

app.use(express.json());

app.use('/posts', postRoutes);
app.use("/auth", authRoutes); // ✅ Ensure routes/auth.js exports the router

// Fallback route for unmatched requests
app.use((req, res) => {
  logger.warn(`Route not found: ${req.originalUrl}`);
  res.status(404).json({ message: 'Route not found' });
});
