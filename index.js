require('dotenv').config();
const express = require('express');
const Project = require('./model/Links');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const URI = process.env.URL;
const PORT = process.env.PORT || 3000;
const morgan = require('morgan');

// Middle ware
app.use(express.json());
app.use(cors());
morgan('tiny');

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
    const { title, description, imageLink, githubLink, websiteLink, category } =
        req.body;
    try {
        await Project.create({
            title,
            description,
            imageLink,
            githubLink,
            websiteLink,
            category,
        });
        res.status(200).json({ message: 'SUCCESSFULLY DATA ADDED' });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

// Find Project by id
app.get('/api/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const Projects = await Project.findById(id);
        res.json(Projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'something went wrong' });
    }
});

app.put('/api/:id', async (req, res) => {
    try {
        const result = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});
app.delete('/api/:id', async (req, res) => {
    try {
        const result = await Project.findByIdAndDelete(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// Listening to port
app.listen(PORT, () => {
    try {
        console.log(`Connect to port ${PORT}`);
    } catch (err) {
        console.log(err);
    }
});
