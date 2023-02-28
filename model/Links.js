const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageLink: { type: String, required: true },
    githubLink: { type: String, required: true },
    websiteLink: { type: String, required: true },
    category: { type: String, required: true },
});

module.exports = mongoose.model('Project', ProjectSchema);
