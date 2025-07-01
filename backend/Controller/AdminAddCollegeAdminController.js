const AdminAdd = require('../Models/AdminAddCollegeAdminModel');
const AdminDistrict = require('../Models/AdminDistrictModel');
const AdminState = require('../Models/AdminStateModel');
const AdminCity = require('../Models/AdminCityModel');
const AdminUniversity = require('../Models/AdminUniversityModel');

// GET all colleges with populated references
const AdminColget = async (req, res) => {
    try {
        const AdminAddCol = await AdminAdd.find({})
            .populate('State', 'State_Name')
            .populate('District', 'District_Name')
            .populate('City', 'City_Name')
            .populate('University', 'University_Name');
        res.status(200).send({ AdminAddCol });
    } catch (err) {
        res.status(500).send(err);
    }
};

// FIND college by College_Name
const AdminColfind = async (req, res) => {
    try {
        const AdminAddCol = await AdminAdd.find({ College_Name: req.body.College_Name });
        res.status(200).send({ AdminAddCol });
    } catch (err) {
        res.status(500).send(err);
    }
};

// POST new college data
const AdminColpost = async (req, res) => {
    try {
        const {
            College_Name, State, District, City, University,
            College_PrincipleName, College_ContactPerson, College_EmailId, College_AdminName,
            College_Password, College_ConfirmPassword, College_VisitingLocation, College_Contact1, College_Contact2,
            Is_MOU_Sign, Status
        } = req.body;

        if (College_Password !== College_ConfirmPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

        const reg = new AdminAdd({
            College_Name, State, District, City, University,
            College_PrincipleName, College_ContactPerson, College_EmailId, College_AdminName,
            College_Password, College_ConfirmPassword, College_VisitingLocation, College_Contact1, College_Contact2,
            Is_MOU_Sign, Status
        });

        const savedCollege = await reg.save();
        res.status(200).send({ savedCollege });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

// DELETE college by College_Name
const AdminColDel = async (req, res) => {
    try {
        const deleted = await AdminAdd.deleteOne({ College_Name: req.params.College_Name });
        res.status(200).send(deleted);
    } catch (err) {
        res.status(500).send(err);
    }
};

// UPDATE college by College_Name
const AdminColupdate = async (req, res) => {
    const { College_Name } = req.params;
    const {
        State, District, City, University,
        College_PrincipleName, College_ContactPerson, College_EmailId, College_AdminName,
        College_Password, College_ConfirmPassword, College_VisitingLocation, College_Contact1, College_Contact2,
        Is_MOU_Sign, Status
    } = req.body;

    if (College_Password !== College_ConfirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
    }

    try {
        const updatedAdmin = await AdminAdd.findOneAndUpdate(
            { College_Name },
            {
                State, District, City, University,
                College_PrincipleName, College_ContactPerson, College_EmailId, College_AdminName,
                College_Password, College_ConfirmPassword, College_VisitingLocation, College_Contact1, College_Contact2,
                Is_MOU_Sign, Status
            },
            { new: true }
        );

        if (!updatedAdmin) {
            return res.status(404).send({ error: 'College not found' });
        }

        res.send(updatedAdmin);
    } catch (error) {
        res.status(500).send(error);
    }
};

// GET colleges with MOU = 'Unsigned'
const getUnsignedMouColleges = async (req, res) => {
    try {
        const unsignedMouColleges = await AdminAdd.find({ Is_MOU_Sign: 'Unsigned' })
            .populate('City', 'City_Name')
            .select('College_Name City');

        const count = unsignedMouColleges.length;
        const colleges = unsignedMouColleges.map(college => ({
            College_Name: college.College_Name,
            City_Name: college.City ? college.City.City_Name : 'City not available'
        }));

        res.status(200).json({ count, colleges });
    } catch (error) {
        console.error("Error retrieving unsigned MOU colleges:", error);
        res.status(500).json({ message: 'Error retrieving unsigned MOU colleges', error: error.message });
    }
};

// GET colleges with MOU = 'Signed'
const getSignedMouColleges = async (req, res) => {
    try {
        const signedMouColleges = await AdminAdd.find({ Is_MOU_Sign: 'Signed' })
            .populate('City', 'City_Name')
            .select('College_Name City');

        const count = signedMouColleges.length;
        const colleges = signedMouColleges.map(college => ({
            College_Name: college.College_Name,
            City_Name: college.City?.City_Name || 'City not available'
        }));

        res.status(200).json({ count, colleges });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving signed MOU colleges', error });
    }
};

// GET colleges where MOU is not signed
const getCollegesWithNoMou = async (req, res) => {
    try {
        const colleges = await AdminAdd.find({ Is_MOU_Sign: "Unsigned" });
        res.status(200).json({ colleges });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    AdminColget,
    AdminColfind,
    AdminColpost,
    AdminColDel,
    AdminColupdate,
    getUnsignedMouColleges,
    getSignedMouColleges,
    getCollegesWithNoMou
};
