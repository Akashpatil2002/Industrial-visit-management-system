const Studentlist = require('../Models/StudentVisitListModel');
const CollegeVisit =require('../Models/CollegeVisitCountModel');
const AdminNotification = require('../Models/AdminNotificationModel');
// Get all students
const StudReg = async (req, res) => {
    try {
        const stude = await Studentlist.find({}).populate('CollegeVisit'); // Populate College Visit data
        res.status(200).send({ stude });
    } catch (err) {
        res.status(500).send({ error: 'Error retrieving students' });
    }
};


// Find a student by ID
const Studfind = async (req, res) => {
    try {
        const stude = await Studentlist.findById(req.params.id);
        if (!stude) return res.status(404).send({ error: 'Student not found' });
        res.status(200).send({ stude });
    } catch (err) {
        res.status(500).send({ error: 'Error finding student' });
    }
};

// Post a new student
const Studpost = async (req, res) => {
    try {
        const { Student_Name, Student_Acadmic_Year, Level_of_Education, Student_of_Department, Contact_Number, EmailId, CollegeVisit } = req.body;
        const reg = new Studentlist({ Student_Name, Student_Acadmic_Year, Level_of_Education, Student_of_Department, Contact_Number, EmailId, CollegeVisit });
        const stude = await reg.save();
        res.status(201).send({ stude });
    } catch (err) {
        console.error("Error saving student:", err); // Log the error for debugging
        res.status(500).send({ error: 'Error saving student', details: err.message });
    }
};

// Delete a student by ID
const StudDel = async (req, res) => {
    try {
        const cancel = await Studentlist.findByIdAndDelete(req.params.id);
        if (!cancel) return res.status(404).send({ error: 'Student not found' });
        res.status(200).send({ message: 'Student deleted' });
    } catch (err) {
        res.status(500).send({ error: 'Error deleting student' });
    }
};

// Update a student by ID
const Studupdate = async (req, res) => {
    try {
        const upreg = await Studentlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!upreg) return res.status(404).send({ error: 'Student not found or no changes made' });
        res.status(200).send({ message: 'Student updated', upreg });
    } catch (err) {
        res.status(500).send({ error: 'Error updating student' });
    }
};

// Delete all students related to a specific college
const StudDelByCollege = async (req, res) => {
    try {
        const { collegeVisitId } = req.params; // Get CollegeVisit ID from request params

        // Ensure collegeVisitId is a valid ObjectId, especially if using MongoDB
        if (!collegeVisitId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({ error: 'Invalid College Visit ID format' });
        }

        // Delete all students associated with the college visit ID
        const deletedStudents = await Studentlist.deleteMany({ CollegeVisit: collegeVisitId });

        // If no students were deleted, return a 404 response
        if (deletedStudents.deletedCount === 0) {
            return res.status(404).send({ error: 'No students found for the specified college visit' });
        }

        // Successfully deleted students
        res.status(200).send({ message: `${deletedStudents.deletedCount} students deleted successfully` });
    } catch (err) {
        console.error("Error deleting students by college:", err); // Log error for debugging
        res.status(500).send({ error: 'Error deleting students by college' });
    }
};

const searchStudents = async (req, res) => {
    const { studentName, collegeName } = req.query;

    try {
        // Create a filter object
        let filter = {};

        // If studentName is provided, search by student name
        if (studentName) {
            filter.Student_Name = { $regex: studentName, $options: 'i' }; // Case-insensitive search
        }

        // If collegeName is provided, search by college name
        if (collegeName) {
            const matchingColleges = await CollegeVisit.find({
                College_Name: { $regex: collegeName, $options: 'i' }, // Case-insensitive search
            }).select('_id');

            const collegeVisitIds = matchingColleges.map(college => college._id);
            filter.CollegeVisit = { $in: collegeVisitIds };
        }

        const students = await Studentlist.find(filter).populate('CollegeVisit','Student_Name'); // Populate College Visit data
        res.status(200).send({ students });
    } catch (err) {
        res.status(500).send({ error: 'Error searching students' });
    }
};



module.exports = { StudReg, Studfind, Studpost, StudDel, Studupdate, StudDelByCollege, searchStudents };
