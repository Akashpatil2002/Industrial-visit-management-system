const StaffAdd = require('../Models/AddStaffModel');
const CollegeModel = require('../Models/CollegeModel'); 

// Fetch staff with optional filtering by department and college
const Staffget = async (req, res) => {
    try {
        const { Department_Name, College_Name } = req.query;
        
        const query = {};
        if (Department_Name) query.Department_Name = Department_Name;

        // Fetch staff and populate college data with filtering
        const AddStaff = await StaffAdd.find(query)
            .populate({
                path: 'College',
                match: College_Name ? { College_Name } : {},  // Filter by College Name
                select: 'College_Name'   // Select only College_Name field
            });

        console.log("Fetched Staff Data:", AddStaff); // Debugging log
        res.status(200).json({ success: true, data: AddStaff });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Find staff by department
const Staffind = async (req, res) => {
    try {
        const { Department_Name } = req.body;

        if (!Department_Name) {
            return res.status(400).json({ message: "Department name is required" });
        }

        const AddStaff = await StaffAdd.find({ Department_Name }).populate('College', 'College_Name');

        res.status(200).json({ success: true, data: AddStaff });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Add new staff
const Staffpost = async (req, res) => {
    try {
        const { Department_Name, Post_Name, Faculty_Name, Contact_Number, College_Name } = req.body;

        // Validate contact number format
        if (!/^\d{10}$/.test(Contact_Number)) {
            return res.status(400).json({ message: "Contact number must be a 10-digit number." });
        }

        // // Find the college by name
        // const college = await CollegeModel.findOne({ College_Name });

        // if (!college) {
        //     return res.status(404).json({ message: "College not found with the provided name." });
        // }

        // Create new staff linked to the college
        const newStaff = new StaffAdd({
            Department_Name,
            Post_Name,
            Faculty_Name,
            Contact_Number,
            College_Name ,
        });

        const savedStaff = await newStaff.save();
        res.status(201).json({ success: true, data: savedStaff });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
};


// Delete staff by department
const StaffDel = async (req, res) => {
    try {
        const { Department_Name } = req.params;

        const deletedStaff = await StaffAdd.deleteOne({ Department_Name });

        if (deletedStaff.deletedCount === 0) {
            return res.status(404).json({ message: "No staff found with this department name." });
        }

        res.status(200).json({ message: "Staff deleted successfully" });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Update staff details
const Staffupdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { Department_Name, Post_Name, Faculty_Name, Contact_Number, CollegeId } = req.body;

        if (!/^\d{10}$/.test(Contact_Number)) {
            return res.status(400).json({ message: "Contact number must be a 10-digit number." });
        }

        const updatedStaff = await StaffAdd.findByIdAndUpdate(
            id,
            { Department_Name, Post_Name, Faculty_Name, Contact_Number, College: CollegeId },
            { new: true, runValidators: true }
        );

        if (!updatedStaff) {
            return res.status(404).json({ message: "Staff not found with the provided ID." });
        }

        res.status(200).json({ success: true, data: updatedStaff });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Delete staff by college ID
const StaffDelByCollege = async (req, res) => {
    try {
        const { collegeId } = req.params;

        if (!collegeId) {
            return res.status(400).json({ message: "Invalid college ID." });
        }

        const result = await StaffAdd.deleteMany({ College: collegeId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No staff found for this college." });
        }

        res.status(200).json({ message: `Deleted ${result.deletedCount} staff members.` });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Search staff by college or faculty name
const StaffSearch = async (req, res) => {
    try {
        const { College_Name, Faculty_Name } = req.query;

        const query = {};
        if (Faculty_Name) {
            query.Faculty_Name = { $regex: Faculty_Name, $options: 'i' };
        }

        const staff = await StaffAdd.find(query).populate('College', 'College_Name');

        res.status(200).json({ success: true, data: staff });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
};


const getAllStaff = async (req, res) => {
        try {
            const staffList = await StaffAdd.find()
                /* .populate('College') */  // Populate college details
                .exec();
    
            res.status(200).json({ success: true, data: staffList });
        } catch (err) {
            console.error("Error:", err);
            res.status(500).json({ success: false, error: err.message });
        }
    };
    

// Exporting the new function along with existing ones
module.exports = {
    Staffget,
    Staffind,
    Staffpost,
    StaffDel,
    Staffupdate,
    StaffDelByCollege,
    StaffSearch,
    getAllStaff
};
