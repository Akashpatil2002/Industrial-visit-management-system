const AdminCity = require('../Models/AdminCityModel');
const AdminDistrict = require('../Models/AdminDistrictModel');
const AdminState = require('../Models/AdminStateModel');

// Get
const AdminCityReg = async (req, res) => {
    try {
        const city = await AdminCity.find({})
            .populate('State', 'State_Name')
            .populate('District', 'District_Name');
        res.status(200).send({ city });
    } catch (err) {
        res.status(500).send(err);
    }
};

// Find
const AdminCityfind = async (req, res) => {
    try {
        const city = await AdminCity.find({ City_Name: req.body.City_Name });
        res.status(200).send({ city });
    } catch (err) {
        res.status(500).send(err);
    }
};

// Post
const AdminCitypost = async (req, res) => {
    try {
        const { City_Name, State, District, Status } = req.body;
        console.log("Request Body:", req.body);

        const reg = new AdminCity({ City_Name, State, District, Status });
        const City = await reg.save();
        const populatedCity = await AdminCity.findById(City_Name)
            .populate('State', 'State_Name')
            .populate('District', 'District_Name');
        res.status(200).send({ City: populatedCity });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

// Delete
const AdminCityDel = async (req, res) => {
    try {
        const cancel = await AdminCity.deleteOne({ City_Name: req.params.City_Name });
        res.status(200).send(cancel);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Update
const AdminCityupdate = async (req, res) => {
    const { id } = req.params;
    const { City_Name, State, District, Status } = req.body;

    try {
        const updatedAdmin = await AdminCity.findByIdAndUpdate(
            id,
            { City_Name, State, District, Status },
            { new: true }
        ).populate('State', 'State_Name')
         .populate('District', 'District_Name'); // Populate here

        if (!updatedAdmin) {
            return res.status(404).send({ error: 'Data not found' });
        }

        res.send(updatedAdmin);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { AdminCityReg, AdminCityfind, AdminCitypost, AdminCityDel, AdminCityupdate };
