const collegeCount= require('../Models/CollegeVisitCountModel')

//get 
const ColvisitReg = async (req, res) => {
    try {
        const requestvisits = await collegeCount.find({});
        res.status(200).send({ requestvisits });
    } catch (err) {
        res.status(500).send(err);
    }
};

//find
const Colvisitfind = async (req, res) => {
    try {
        const requestvisit = await collegeCount.find({ Visit_Date: req.body.Visit_Date });
        res.status(200).send({ requestvisit });
    } catch (err) {
        res.status(500).send(err);
    }
};

//post
const Colvisitpost = async (req, res) => {
    try {
        const { Num_of_Students, Visit_Date, Time_Slot, No_of_Faculty, Purpose, Comment, College_Name } = req.body;

        const reg = new collegeCount({
            Num_of_Students,
            Visit_Date,
            Time_Slot,
            No_of_Faculty,
            Purpose,
            Comment,
            College_Name, // Include College_Name
            Image: req.file.filename
        });
        const requestvisit = await reg.save();
        res.status(200).send({ requestvisit });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

// Delete by Visit_Date
const ColvisitDel = async (req, res) => {
    try {
        const cancel = await collegeCount.deleteOne({ Visit_Date: req.params.Visit_Date });
        if (cancel.deletedCount === 0) {
            return res.status(404).send({ message: 'Visit not found for the given date' });
        }
        res.status(200).send({ message: 'Visit deleted successfully' });
    } catch (err) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

const Colvisitupdate = async (req, res) => {
    const { id } = req.params; 
    const { Num_of_Students, Visit_Date, Time_Slot, No_of_Faculty, Purpose, Comment, College_Name } = req.body;

    try {
        const updateData = {
            Num_of_Students,
            Visit_Date,
            Time_Slot,
            No_of_Faculty,
            Purpose,
            Comment,
            College_Name,
            ...(req.file && { Image: req.file.filename }), 
        };

        const updatedVisit = await collegeCount.findByIdAndUpdate(
            id, 
            updateData,  
            { new: true, runValidators: true }
        );

        if (!updatedVisit) {
            return res.status(404).send({ error: 'Data not found' });
        }

        res.send(updatedVisit);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

module.exports={ColvisitReg,Colvisitfind,Colvisitpost,ColvisitDel,Colvisitupdate,}