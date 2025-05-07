const express = require('express');
const app = express();
const cors = require('cors');
const postRoutes = require('./routes/postRoutes'); 
const categoryRoutes = require('./routes/categoryRoutes');


app.use(cors({
    origin: 'http://localhost:5174',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

// Middleware
app.use(express.json()); // VERY important to parse JSON body!

// Routes
app.use('/posts', postRoutes);
app.use('/categories', categoryRoutes); // All routes related to posts

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to Blog Post API!');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
