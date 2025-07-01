const Unilog = require('mongoose');

const UniversLog = new Unilog.Schema({
    University_Name: {
        type: String,
        required: true,  
    },
    Status: {
        type: String,
        required: true,  
    },
});

module.exports = Unilog.model('AdminUniversityMod', UniversLog);
