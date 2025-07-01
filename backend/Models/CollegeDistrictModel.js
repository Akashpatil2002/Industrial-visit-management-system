const dislog=require('mongoose');
const { default: mongoose } = require('mongoose');

const DLog = new dislog.Schema({

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

module.exports=dislog.model('CollageDistrictMod',DLog)
