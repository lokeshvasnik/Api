const express = require('express');
const Project = require('./model/Links');
const mongoose = require('mongoose');
const app = express();
const URI =
    'mongodb+srv://ProjectsLinks:c9LfXyalAfT1dQMw@projects.ifutfhs.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 3000;

// Middle ware
app.use(express.json());

// Connection to db

mongoose.connect(
    URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Succesfully connect to db');
        }
    }
);

//Routes
// Get all documents
app.get('/api', async (req, res) => {
    try {
        const Projects = await Project.find();
        res.json(Projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'something went wrong' });
    }
});

// Register route
app.post('/api', async (req, res) => {
    const { title, des, website, img } = req.body;
    try {
        const Projects = await Project.create({ title, des, website, img });
        res.json(Projects);
    } catch (error) {
        // log the error message
        console.log(error);
        res.status(400).json(error);
    }
});

// Listening to port
app.listen(PORT, () => {
    console.log(`Connect to port ${PORT}`);
});

// c9LfXyalAfT1dQMw
