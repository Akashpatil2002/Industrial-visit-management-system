const Adminstatelog=require('mongoose')

const SLog = new Adminstatelog.Schema({

    State_Name:{
        type:String,
        required: true,  
        
    },

    Status:{
        type:String,
        required: true,  
        
    },
   
})

module.exports=Adminstatelog.model('AdminStateMod',SLog)
