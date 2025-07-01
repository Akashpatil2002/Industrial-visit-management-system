const { default: mongoose } = require('mongoose')
const Adminschedulelog=require('mongoose')

const ScheduleLog = new Adminschedulelog.Schema({

   Schedule_Title:{
        type:String,
        required: true,  
        
    },
    Schedule_Description:{
        type:String,
        required: true,  
        
    },
    Schedule_Date:{
        type:String,
        required: true,  
        
    },
    Schedule_StartTime:{
        type:String,
        required: true,  
        
    },
    Schedule_EndTime:{
        type:String,
        required: true,  
        
    }, 
})

module.exports=Adminschedulelog.model('AdminScheduleMod',ScheduleLog)