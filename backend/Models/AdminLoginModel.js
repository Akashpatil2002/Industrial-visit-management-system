const Adminlogin= require('mongoose');

const Adlogin = new Adminlogin.Schema({

  name:{
    type:String,
    required:true
  },
  
  email:{
    type:String,
    required:true
  },

  password:{
    type:String,
    required:true
  }
})

module.exports=Adminlogin.model('AdminLoginMod',Adlogin)