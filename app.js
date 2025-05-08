const express = require('express');
const app = express();
const mongoose = require("mongoose")
require("dotenv").config();
const postRoutes = require('./routes/posts');


mongoose.connect(process.env.mongoURI)
.then(() => {
    console.log("mongoDB connected successfully");
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`)
    })
})
.catch(err => console.log("mongoDB connection error", err))

app.use(express.json());

app.use('/posts', postRoutes);

// Fallback route for unmatched requests
app.use((req, res) => {
    res.status(404).json({message: 'Route not found'});
});

const PORT = 3000;
