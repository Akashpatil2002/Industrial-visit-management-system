const AdminLocation=require('mongoose')

const Adloc = new AdminLocation.Schema({


    Location_City:{
        type:String,
        require:true
    },

    Location_Name:{
        type:String,
        require:true
    },

    Status:{
        type:String,
        require:true
    }

})

module.exports=AdminLocation.model('AdminLocationMod',Adloc)