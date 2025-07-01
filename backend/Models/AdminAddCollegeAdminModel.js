const { default: mongoose } = require('mongoose');
const AdminAdd = require('mongoose');

const ALog = new AdminAdd.Schema({
    College_Name: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    District: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    
    University: {
        type: String,
        required: true
    },
    
    College_PrincipleName: {
        type: String,
        required: true
    },
    College_ContactPerson: {
        type: String,
        required: true
    },
    College_EmailId: {
        type: String,
        required: true
    },
    College_AdminName: { 
        type: String,
        required: true
    },
    College_Password: {
        type: String,
        required: true
    },
    College_ConfirmPassword: {
        type: String,
        required: true
    },
    College_VisitingLocation: {
        type: String,
        required: true
    },
    College_Contact1: {
        type: String,
        required: true
    },
    College_Contact2: {
        type: String,
        required: true
    },
    Is_MOU_Sign: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = AdminAdd.model('AdminAddMod', ALog);
