const CollegeAdminlogin= require('mongoose');

const CollAdlogin = new CollegeAdminlogin.Schema({

  email:{
    type:String,
    required:true
  },

  password:{
    type:String,
    required:true
  }
    
})

module.exports=CollegeAdminlogin.model('CollegeAdminLoginMod',CollAdlogin)