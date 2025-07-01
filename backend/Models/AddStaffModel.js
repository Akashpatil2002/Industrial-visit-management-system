const mongoose = require('mongoose');

const staff = new mongoose.Schema({
    Department_Name: {
        type: String,
        required: true
    },
    Post_Name: {
        type: String,
        required: true
    },
    Faculty_Name: {
        type: String,
        required: true
    },
    Contact_Number: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v); // Example: Validates for a 10-digit phone number
            },
            message: props => `${props.value} is not a valid contact number!`
        }
    },
    College_Name: {
        type: String,
        required: true
    },

  
});

module.exports = mongoose.model('AddStaffMod', staff);
