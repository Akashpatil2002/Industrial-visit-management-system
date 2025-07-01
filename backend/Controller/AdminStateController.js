const AdminState= require('../Models/AdminStateModel')

// Get all active states
const AdminActiveStateReg = async (req, res) => {
    try {
        const states = await AdminState.find({ Status: 'Active' }); 
        res.status(200).send({ state: states });
    } catch (err) {
        res.status(500).send(err);
    }
};

//get 
const AdminStateReg=async(req,res)=>{
  try{
    const state=await AdminState.find({})
    res.status(200).send({state})
  }
  catch(err){
    res.status(500).send(err)
}
}

//find
const Adminstatefind=async(req,res)=>{
    try{
        const state= await AdminState.find({State_Name:req.body.State_Name})
        res.status(200).send({state})
    }
    catch(err){
        res.status(500).send(err)
    }
}

//post
const Adminstatepost= async(req,res)=>{
    try{
        
       const {State_Name, Status}=req.body
    
       const reg=new AdminState({
        State_Name, Status
       })
       const state=await reg.save()
       res.status(200).send({ state })
    }
    catch (err) {
        console.log(err);
        res.status(500).send((err))
    }
}

//Delete
const AdminstateDel =async(req,res)=>{
    try{
        const cancel=await AdminState.deleteOne({ State_Name:req.params.State_Name})
        res.status(200).send(cancel)

    }
    catch(err){
        res.status(500).send(err)
    }
}

const AdminStateupdate = async (req, res) => {
    const oldStateName = req.params.State_Name; 
    const { State_Name, Status } = req.body; 

    try {
        
        const updatedAdmin = await AdminState.findOneAndUpdate(
            { State_Name: oldStateName }, 
            { State_Name, Status }, 
            { new: true } 
        );

        if (!updatedAdmin) {
            return res.status(404).send({ error: 'State not found' });
        }

        res.send(updatedAdmin);
    } catch (error) {
        res.status(500).send(error);
    }
};



module.exports={AdminActiveStateReg,AdminStateReg,Adminstatefind,Adminstatepost,AdminstateDel,AdminStateupdate}