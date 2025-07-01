const District= require('../Models/CollegeDistrictModel')
const CollageStateMod = require('../Models/CollegeStateModel')

//get 
const disReg=async(req,res)=>{
  try{
    const district=await District.find({})
    .populate('State', 'State_Name')  
    res.status(200).send({district})
  }
  catch(err){
    res.status(500).send(err)
}
}

//find
const disfind=async(req,res)=>{
    try{
        const district= await District.find({District_Name:req.body.District_Name})
        res.status(200).send({district})
    }
    catch(err){
        res.status(500).send(err)
    }
}

const dispost= async(req,res)=>{
    try{
       const {District_Name,State,Status}=req.body

       if (!State || typeof State !== 'string') {
           return res.status(400).send({ error: 'State must be a valid string' })
       }

       const reg = new District({
           District_Name,
           State,
           Status
       })
       const district = await reg.save()
       res.status(200).send({ district })
    }
    catch (err) {
        console.log(err);
        res.status(500).send((err))
    }
}

//Delete
const disDel =async(req,res)=>{
    try{
        const cancel=await District.deleteOne({District_Name:req.params.District_Name})
        res.status(200).send(cancel)
    }
    catch(err){
        res.status(500).send(err)
    }
}

const disupdate = async (req, res) => {
    const { District_Name } = req.params;  
    const { newDistrictName, State, Status } = req.body;  

    try {
        const updatedDistrict = await District.findOneAndUpdate(
            { District_Name },
            { District_Name: newDistrictName, State, Status },
            { new: true }  
        ).populate('State', 'State_Name'); 

        if (!updatedDistrict) {
            return res.status(404).send({ error: 'District not found' });
        }

        res.status(200).send(updatedDistrict);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server error during update' });
    }
};

module.exports={disReg,disfind,dispost,disDel,disupdate}