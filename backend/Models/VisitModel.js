const Visit= require('mongoose')

const Colvisit = new Visit.Schema({

    VisitId:{
        type:String,
        required:true
    },

    Visit_Date:{
        type:String, 
        required:true
    },
    Feedback_Message:{
        type:String,
        required:true
    },
    Image1:{
        type:String,
        required:true
    },
})
module.exports=Visit.model('VisitMod',Colvisit)