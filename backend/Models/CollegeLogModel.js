const Collogin= require('mongoose');

const Cllogin = new Collogin.Schema({

  name:{
    type:String,
    required:true
  },
  
  email:{
    type:String,
    required:true,
    unique:true
  },

  password:{
    type:String,
    required:true
  }
    
 
})

module.exports=Collogin.model('ColLoginMod',Cllogin)