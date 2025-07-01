const CollegeCity= require('../Models/CollegeCityModel')
const CollageStateMod = require('../Models/CollegeStateModel')
const CollageDistrictMod = require('../Models/CollegeDistrictModel')

//get 
const CityReg=async(req,res)=>{
  try{
    const city=await CollegeCity.find({})
    .populate('State', 'State_Name')  
    .populate('District', 'District_Name');
    res.status(200).send({city})
  }
  catch(err){
    res.status(500).send(err)
}
}

//find
const Cityfind=async(req,res)=>{
    try{
        const city= await CollegeCity.find({City_Name:req.body.City_Name})
        res.status(200).send({city})
    }
    catch(err){
        res.status(500).send(err)
    }
}

const Citypost= async(req,res)=>{
    try{
        const {City_Name,State,District,Status} = req.body;
        
        if (!City_Name || !State || !District) {
            return res.status(400).send({error: "Missing required fields"});
        }

        const reg = new CollegeCity({
            City_Name, 
            Status: Status || 'active', // Default status if not provided
            State, 
            District
        });
        const city = await reg.save();
        res.status(200).send({ city }); 
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

//Delete
const CityDel =async(req,res)=>{
    try{
        const cancel=await CollegeCity.deleteOne({City_Name:req.params.City_Name})
        res.status(200).send(cancel)
    }
    catch(err){
        res.status(500).send(err)
    }
}

const Cityupdate = async (req, res) => {
    try {
        const { City_Name, State, District, Status } = req.body;
        
        if (!City_Name || !State || !District) {
            return res.status(400).send({error: "Missing required fields"});
        }

        const updatedCity = await CollegeCity.findByIdAndUpdate(
            req.params.id,
            { 
                City_Name, 
                State, 
                District, 
                Status: Status || 'active' // Default status if not provided
            },
            { new: true } 
        );
        res.status(200).send(updatedCity);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports={CityReg,Cityfind,Citypost,CityDel,Cityupdate}