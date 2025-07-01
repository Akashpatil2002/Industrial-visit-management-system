const Admindislog=require('mongoose')
const { default: mongoose } = require('mongoose');

const DLog = new Admindislog.Schema({

    District_Name:{
        type:String,
        required: true,  
        
    },

    State:{
        type:String,
        required: true,  
    },
    
    Status:{
        type:String,
        required: true,     
    },
})

module.exports=Admindislog.model('AdminDistrictMod',DLog)

