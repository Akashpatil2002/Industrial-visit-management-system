const CollegeVisitCount=require('mongoose')

const colvisit = new CollegeVisitCount.Schema({

    Num_of_Students:{
        type:String,
        required:true
    },

    Visit_Date:{
        type:String,
        required:true
    },

    Time_Slot:{
        type:String,
        required:true
    },

    No_of_Faculty:{
        type:String,
        required:true
    },
    Purpose:{
        type:String,
        required:true
    },
    Comment:{
        type:String,
        required:true
    },
    Image:{
        type:String,
        required:true
    },
    College_Name: { 
        type: String,
        required: true
    }
})

module.exports=CollegeVisitCount.model('colvisitMod',colvisit)