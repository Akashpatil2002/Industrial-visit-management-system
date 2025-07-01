const { default: mongoose } = require('mongoose')
const Admincitylog=require('mongoose')

const CLog = new Admincitylog.Schema({

   City_Name:{
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

    Status:{
        type:String,
        required: true,  
        
    },
})

module.exports=Admincitylog.model('AdminCitytMod',CLog)