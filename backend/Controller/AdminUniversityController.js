const AdminUniversity= require('../Models/AdminUniversityModel')

//get findall 
const AdminuniReg=async(req,res)=>{
  try{
    const university=await AdminUniversity.find({})
    res.status(200).send({university})
  }
  catch(err){
    res.status(500).send(err)
}
}

//findOne
const Adminunifind=async(req,res)=>{
    try{
        const university= await AdminUniversity.find({University_Name:req.body.University_Name})
        res.status(200).send({university})
    }
    catch(err){
        res.status(500).send(err)
    }
}

//post
const Adminunipost = async (req, res) => {
    try {
        const { University_Name, Status } = req.body;
        
        const reg = new AdminUniversity({
            University_Name, 
            Status
        });
        const state = await reg.save();
        res.status(200).send({ state });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

//Delete
const AdminUniDel =async(req,res)=>{
    try{
        const cancel=await AdminUniversity.deleteOne({ University_Name:req.params.University_Name})
        res.status(200).send(cancel)
    }
    catch(err){
        res.status(500).send(err)
    }
}

const Adminuniupdate = async (req, res) => {
    const { id } = req.params; 
    const { University_Name, Status } = req.body;

    try {
        
        const updatedAdmin = await AdminUniversity.findByIdAndUpdate(
            id,
            { University_Name, Status }, 
            { new: true } 
        );

        if (!updatedAdmin) {
            return res.status(404).send({ error: 'University not found' });
        }

        res.send(updatedAdmin);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports={AdminuniReg,Adminunifind,Adminunipost,AdminUniDel,Adminuniupdate}