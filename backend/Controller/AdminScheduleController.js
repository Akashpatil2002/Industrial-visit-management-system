const AdminSchedule = require('../Models/AdminScheduleModel');

// Get
    const AdminScheduleReg = async (req, res) => {
        try {
            const schedules = await AdminSchedule.find({});
            res.status(200).send({ schedules });
        } catch (err) {
            res.status(500).send(err);
        }
    };

// Find
const AdminSchedulefind = async (req, res) => {
    try {
        const schedules = await AdminSchedule.find({ Schedule_Title: req.body.Schedule_Title });
        res.status(200).send({ schedules });
    } catch (err) {
        res.status(500).send(err);
    }
};

// Post
const AdminSchedulepost = async (req, res) => {
    try {
        const { Schedule_Title, Schedule_Description, Schedule_Date, Schedule_StartTime, Schedule_EndTime } = req.body;
        const reg = new AdminSchedule({
            Schedule_Title,
            Schedule_Description,
            Schedule_Date,
            Schedule_StartTime,
            Schedule_EndTime
        });
        const schedules = await reg.save();
        res.status(200).send({ schedules });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

// Delete
const AdminScheduleDel = async (req, res) => {
    try {
        const cancel = await AdminSchedule.deleteOne({ Schedule_Title: req.params.Schedule_Title });
        res.status(200).send(cancel);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Update
const AdminScheduleupdate = async (req, res) => {
    const { Schedule_Title } = req.params;
    const { Schedule_Title: newTitle, Schedule_Description, Schedule_Date, Schedule_StartTime, Schedule_EndTime } = req.body;

    try {
        const updatedAdmin = await AdminSchedule.findOneAndUpdate(
            { Schedule_Title },
            {
                Schedule_Title: newTitle,
                Schedule_Description,
                Schedule_Date,
                Schedule_StartTime,
                Schedule_EndTime
            },
            { new: true }
        );

        if (!updatedAdmin) {
            return res.status(404).send({ error: 'Schedule not found' });
        }

        res.send(updatedAdmin);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { AdminScheduleReg, AdminSchedulefind, AdminSchedulepost, AdminScheduleDel, AdminScheduleupdate };
