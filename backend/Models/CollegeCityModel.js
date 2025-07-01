const { default: mongoose } = require('mongoose')
const citylog=require('mongoose')

const CLog = new citylog.Schema({

    
    City_Name:{
        type:String,
        required: true,  
        
    },

    Status:{
        type:String,
        required: true,  
        
    },
    State:{
        type:String,
        required: true,
    },

    District:{
        type:String,
        required: true,
    },

})

module.exports=citylog.model('CollageCitytMod',CLog)