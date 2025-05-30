const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("./utils/logger");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "https://my-blog-api-0wgd.onrender.com", 
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

const postRoutes = require('./routes/posts');
const authRoutes = require("./routes/auth");

app.use('/posts', postRoutes);
app.use('/auth', authRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use((req, res) => {
  logger.warn(`Route not found: ${req.originalUrl}`);
  res.status(404).json({ message: 'Route not found' });
});

mongoose.connect(process.env.mongoURI)
  .then(() => {
    logger.info("MongoDB connected successfully");
    app.listen(PORT, () => {
      logger.info(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    logger.error("MongoDB connection error", err);
  });
