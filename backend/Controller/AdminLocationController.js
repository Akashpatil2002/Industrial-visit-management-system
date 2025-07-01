const AdminLoc= require('../Models/AdminLocationModel')

//get 
const AdminLocReg=async(req,res)=>{
  try{
    const location=await AdminLoc.find({})
    res.status(200).send({location})
  }
  catch(err){
    res.status(500).send(err)
}
}

//find
const AdminLocfind=async(req,res)=>{
    try{
        const location= await AdminLoc.find({Location_Name:req.body.Location_Name})
        res.status(200).send({location})
    }
    catch(err){
        res.status(500).send(err)
    }
}

//post
const AdminLocpost= async(req,res)=>{
    try{
        
       const {Location_City,Location_Name, Status}=req.body
    
       const reg=new AdminLoc({
       Location_City,Location_Name, Status
       })
       const state=await reg.save()
       res.status(200).send({ state })
    }
    catch (err) {
        console.log(err);
        res.status(500).send((err))
    }
}

// Delete
const AdminLocDel =async(req,res)=>{
    try{
        const cancel=await AdminLoc.deleteOne({ Location_Name:req.params.Location_Name})
        res.status(200).send(cancel)

    }
    catch(err){
        res.status(500).send(err)
    }
}

const AdminLocupdate = async (req, res) => {
    const { Location_Name } = req.params; 
    const { newLocationName, Location_City, Status } = req.body; 

    try {
        const updatedLocation = await AdminLoc.findOneAndUpdate(
            { Location_Name }, 
            {
                Location_Name: newLocationName, 
                Location_City,
                Status
            },
            { new: true, runValidators: true } 
        );

        if (!updatedLocation) {
            return res.status(404).json({ message: 'Location not found' });
        }

        res.status(200).json(updatedLocation);
    } catch (error) {
        console.error('Error updating location:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports={AdminLocReg,AdminLocfind,AdminLocpost,AdminLocDel,AdminLocupdate}