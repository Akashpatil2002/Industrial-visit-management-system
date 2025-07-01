const unilog = require('mongoose');

const RegLog = new unilog.Schema({
    University_Name: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = unilog.model('CollageUniversityMod', RegLog);
