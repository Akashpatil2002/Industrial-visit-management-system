const mongoose = require('mongoose');

const StudList = new mongoose.Schema({
    Student_Name: {
        type: String,
        required: true
    },
    Student_Acadmic_Year: {
        type: String,
        required: true
    },
    Level_of_Education: {
        type: String,
        required: true
    },
    Student_of_Department: {
        type: String,
        required: true
    },
    Contact_Number: {
        type: String, // Changed from Number to String
        required: true
    },
    EmailId: {
        type: String,
        required: true,
        match: /.+\@.+\..+/ 
    },
    CollegeVisit: {
        type: String, //mongoose.Schema.Types.ObjectId,
       // ref: 'colvisitMod', // Reference to the colvisitMod schema
        //required: true
    }
});

module.exports = mongoose.model('StudentVisitMod', StudList);