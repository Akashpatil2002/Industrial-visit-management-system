const university = require('../Models/CollegeUniversityModel');

// Get all universities
const uniReg = async (req, res) => {
    try {
        const collegeuniversity = await university.find({});
        res.status(200).send({ collegeuniversity });
    } catch (err) {
        res.status(500).send(err);
    }
};

// Find university by name
const unifind = async (req, res) => {
    try {
        const collegeuniversity = await university.find({ University_Name: req.body.University_Name });
        res.status(200).send({ collegeuniversity });
    } catch (err) {
        res.status(500).send(err);
    }
};

// Post a new university
const unipost = async (req, res) => {
    try {
        const { University_Name, Status } = req.body;
        const reg = new university({
            University_Name,
            Status,
        });
        const universe = await reg.save();
        res.status(200).send({ universe });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

// Delete a university
const UniDel = async (req, res) => {
    try {
        const cancel = await university.deleteOne({ University_Name: req.params.University_Name });
        res.status(200).send(cancel);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Update a university
const uniupdate = async (req, res) => {
    const { University_Name } = req.params; 
    const { newUniversityName, Status } = req.body; 

    try {
        const updatedUniversity = await university.findOneAndUpdate(
            { University_Name: University_Name }, 
            { University_Name: newUniversityName, Status },
            { new: true }
        );

        if (!updatedUniversity) {
            return res.status(404).send({ error: 'Data not found' });
        }

        res.send(updatedUniversity);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { uniReg, unifind, unipost, UniDel, uniupdate };
