const mongoose = require('mongoose');

const FeesSchema = new mongoose.Schema({
    Fee_Title: {
        type: String,
        required: true
    },
    Fee_Amount: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true,
    },
    College_Name: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Fees = mongoose.model('feesMod', FeesSchema);
module.exports = Fees;
