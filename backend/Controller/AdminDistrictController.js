const AdminDistrict = require('../Models/AdminDistrictModel');
const AdminState = require('../Models/AdminStateModel');

// Get all districts
const AdminDisReg = async (req, res) => {
    try {
        const district = await AdminDistrict.find({})
            .populate("State", "State_Name");
        res.status(200).send({district});
    }  
    catch(err){
        res.status(500).send(err)
    }
};

// Find district by name
const AdminDisfind = async (req, res) => {
    try {
        const district = await AdminDistrict.find({ District_Name: req.body.District_Name });
        res.status(200).send({district });
    } catch(err){
        res.status(500).send(err)
    }
};

// Add a new district
const AdminDispost= async(req,res)=>{
    try{
        
       const {District_Name, State,Status}=req.body

       const stateExists = await AdminState.findOne({ State_Name: State });

       if (!stateExists) {
           return res.status(400).send({ error: "Invalid state name" });
       };
    
       const reg=new AdminDistrict({
        District_Name,State, Status
       })
       const district=await reg.save()
       res.status(200).send({ district })
    }
    catch (err) {
        console.log(err);
        res.status(500).send((err))
    }
}

// Delete a district
const AdminDisDel = async (req, res) => {
    try{
        const cancel=await AdminDistrict.deleteOne({District_Name:req.params.District_Name})
        res.status(200).send(cancel)
    }
    catch(err){
        res.status(500).send(err)
    }
};

// Update a district
const AdminDisupdate = async (req, res) => {
    const { id } = req.params; 
    const { District_Name, State, Status } = req.body;

    try {
        const updatedAdmin = await AdminDistrict.findByIdAndUpdate(
            id,
            { District_Name, State, Status }, 
            { new: true } 
        );

        if (!updatedAdmin) {
            return res.status(404).send({ error: 'Data not found' });
        }

        res.send(updatedAdmin);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { AdminDisReg, AdminDisfind, AdminDispost, AdminDisDel, AdminDisupdate };
