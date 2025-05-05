const express = require('express');
const app = express();
const postRoutes = require('./routes/posts');

app.use(express.json());

app.use('/posts', postRoutes);

// Fallback route for unmatched requests
app.use((req, res) => {
    res.status(404).json({message: 'Route not found'});
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})