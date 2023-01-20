const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    des: { type: String, required: true },
    website: { type: String, required: true },
    img: { type: String, required: true },
});

module.exports = mongoose.model('Project', ProjectSchema);
