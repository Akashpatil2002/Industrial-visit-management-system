const State= require('../Models/CollegeStateModel')

const StateActiveReg=async(req,res)=>{
    try{
      const state=await State.find({Status:"Active"})
      res.status(200).send({state})
    }
    catch(err){
      res.status(500).send(err)
  }
  }

//get 
const StateReg=async(req,res)=>{
  try{
    const state=await State.find({})
    res.status(200).send({state})
  }
  catch(err){
    res.status(500).send(err)
}
}

//find
const statefind=async(req,res)=>{
    try{
        const state= await State.find({State_Name:req.body.State_Name})
        res.status(200).send({state})
    }
    catch(err){
        res.status(500).send(err)
    }
}

//post
const statepost= async(req,res)=>{
    try{
        
       const {State_Name, Status}=req.body
    
       const reg=new State({
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
const stateDel =async(req,res)=>{
    try{
        const cancel=await State.deleteOne({ State_Name:req.params.State_Name})
        res.status(200).send(cancel)

    }
    catch(err){
        res.status(500).send(err)
    }
}

const Statepdate = async (req, res) => {
    const { currentStateName } = req.params; 
    const { State_Name, Status } = req.body; 

    try {
        const updatedState = await State.findOneAndUpdate(
            { State_Name: currentStateName }, 
            { State_Name, Status }, 
            { new: true } 
        );
        if (!updatedState) {
            return res.status(404).send({ error: 'Data not found' });
        }
        res.send(updatedState);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports={StateActiveReg,StateReg,statefind,statepost,stateDel,Statepdate}