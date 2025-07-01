const statelog=require('mongoose')

const SLog = new statelog.Schema({

    State_Name:{
        type:String,
        required: true,  
        
    },

    Status:{
        type:String,
        required: true,  
        
    },
   

})

module.exports=statelog.model('CollageStateMod',SLog)
