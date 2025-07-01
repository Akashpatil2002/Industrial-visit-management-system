const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    establishedYear: { type: Number, required: true }
});

const College = mongoose.model('College', collegeSchema);

module.exports = College;
