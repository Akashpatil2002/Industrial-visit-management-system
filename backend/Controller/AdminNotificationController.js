const AdminNotification = require('../Models/AdminNotificationModel');
const CollegeVisit = require('../Models/CollegeVisitCountModel');
const moment = require('moment');

const createStatus = async (req, res) => {
  try {
    const { visitId, status, reason } = req.body;
    const existingStatus = await AdminNotification.findOne({ visitId });
    if (existingStatus) {
      return res.status(400).json({ message: 'Status already exists for this visitId' });
    }

    const newStatus = new AdminNotification({ visitId, status, reason });
    await newStatus.save();
    res.status(201).json(newStatus);
  } catch (error) {
    console.error("Error creating status:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getStatus = async (req, res) => {
  try {
    const status = await AdminNotification.findById(req.params.id).populate('visitId');
    if (!status) return res.status(404).json({ message: 'Status not found' });
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status, reason } = req.body;
    const updatedStatus = await AdminNotification.findByIdAndUpdate(
      req.params.id,
      { status, reason },
      { new: true }
    );
    if (!updatedStatus) return res.status(404).json({ message: 'Status not found' });
    res.status(200).json(updatedStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStatus = async (req, res) => {
  try {
    const deletedStatus = await AdminNotification.findByIdAndDelete(req.params.id);
    if (!deletedStatus) return res.status(404).json({ message: 'Status not found' });
    res.status(200).json({ message: 'Status deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllStatuses = async (req, res) => {
  try {
    const statuses = await AdminNotification.find()
      .populate({
        path: 'visitId',
        select: 'Purpose Visit_Date'
      });
    res.status(200).json(statuses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAcceptedVisitsForCurrentWeek = async (req, res) => {
  try {
      const startOfWeek = moment().startOf('isoWeek').toDate();
      const endOfWeek = moment().endOf('isoWeek').toDate();
      const acceptedVisits = await AdminNotification.find({ status: 'Accepted' }).populate('visitId');

      if (!acceptedVisits || acceptedVisits.length === 0) {
          return res.status(200).json({ count: 0, collegeVisits: [] });
      }

      const filteredVisits = acceptedVisits.filter(visit => {
          if (!visit.visitId) return false;
          const visitDate = visit.visitId.Visit_Date;

          if (!visitDate || visitDate === 'N/A') return false;

          const visitMoment = moment(visitDate);
          return visitMoment.isBefore(moment(), 'day') && visitMoment.isBetween(startOfWeek, endOfWeek, null, '[]');
      });

      const collegeVisits = filteredVisits.map(visit => ({
        collegeName: visit.visitId.College_Name,
        visitDate: visit.visitId.Visit_Date
    }));
    
      const count = filteredVisits.length;
      res.status(200).json({ count, collegeVisits });
  } catch (error) {
      console.error('Error fetching accepted visits for the current week:', error.message);
      res.status(500).json({ error: error.message });
  }
};

const getAcceptedVisitsForCurrentMonth = async (req, res) => {
  try {
      const startOfMonth = moment().startOf('month').toDate();
      const endOfMonth = moment().endOf('month').toDate();
      const acceptedVisits = await AdminNotification.find({ status: 'Accepted' }).populate('visitId');

      if (!acceptedVisits || acceptedVisits.length === 0) {
          return res.status(200).json({ count: 0, collegeVisits: [] });
      }

      const filteredVisits = acceptedVisits.filter(visit => {
          if (!visit.visitId) return false;
          const visitDate = visit.visitId.Visit_Date;

          if (!visitDate || visitDate === 'N/A') return false;

          const visitMoment = moment(visitDate);
          return visitMoment.isBefore(moment(), 'day') && visitMoment.isBetween(startOfMonth, endOfMonth, null, '[]');
      });

      const collegeVisits = filteredVisits.map(visit => ({
        collegeName: visit.visitId.College_Name,
        visitDate: visit.visitId.Visit_Date
    }));
      
      const count = filteredVisits.length;
      res.status(200).json({ count, collegeVisits });
  } catch (error) {
      console.error('Error fetching accepted visits for the current month:', error.message);
      res.status(500).json({ error: error.message });
  }
};

const getLastFiveAcceptedColleges = async (req, res) => {
  try {
    const currentDate = moment();
    const acceptedNotifications = await AdminNotification.find({ status: 'Accepted' })
      .populate('visitId');

    const filteredColleges = acceptedNotifications.filter(notification => {
      if (!notification.visitId) return false;
      const visitDate = notification.visitId.Visit_Date;
      if (!visitDate || visitDate === 'N/A') return false;

      const visitMoment = moment(visitDate);
      return visitMoment.isBefore(currentDate, 'day');
    });

    filteredColleges.sort((a, b) => {
      const dateA = moment(a.visitId.Visit_Date);
      const dateB = moment(b.visitId.Visit_Date);
      return dateB - dateA;
    });

    const lastFiveColleges = filteredColleges.slice(0, 5);
    const formattedColleges = lastFiveColleges.map(notification => ({
      collegeName: notification.visitId.College_Name,
      visitDate: notification.visitId.Visit_Date,
      status: notification.status,
    }));

    res.status(200).json({ lastFiveColleges: formattedColleges });
  } catch (error) {
    console.error('Error fetching last five accepted colleges:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const getPassedAcceptedVisits = async (req, res) => {
  try {
    const currentDate = moment();
    const acceptedVisits = await AdminNotification.find({ status: 'Accepted' }).populate('visitId');

    if (!acceptedVisits || acceptedVisits.length === 0) {
      return res.status(200).json({ count: 0, collegeVisits: [] });
    }

    const filteredVisits = acceptedVisits.filter(visit => {
      if (!visit.visitId) return false;
      const visitDate = visit.visitId.Visit_Date;
      if (!visitDate || visitDate === 'N/A') return false;

      const visitMoment = moment(visitDate);
      return visitMoment.isBefore(currentDate, 'day');
    });

    const collegeVisits = filteredVisits.map(visit => ({
      collegeName: visit.visitId.College_Name,
      visitDate: visit.visitId.Visit_Date
    }));

    const count = filteredVisits.length;
    res.status(200).json({ count, collegeVisits });
  } catch (error) {
    console.error('Error fetching passed accepted visits:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const getAllAcceptedVisits = async (req, res) => {
  try {
    const acceptedVisits = await AdminNotification.find({ status: 'Accepted' }).populate('visitId');

    if (!acceptedVisits || acceptedVisits.length === 0) {
      return res.status(200).json({ count: 0, collegeVisits: [] });
    }

    const collegeVisits = acceptedVisits.map(visit => {
      if (!visit.visitId) return null;

      const visitDate = visit.visitId.Visit_Date;
      if (!visitDate || visitDate === 'N/A') return null;

      return {
        collegeName: visit.visitId.College_Name,
        visitDate: visitDate
      };
    }).filter(Boolean);

    const count = collegeVisits.length;
    res.status(200).json({ count, collegeVisits });
  } catch (error) {
    console.error('Error fetching all accepted visits:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createStatus,
  getStatus,
  updateStatus,
  deleteStatus,
  getAllStatuses,
  getAcceptedVisitsForCurrentWeek,
  getAcceptedVisitsForCurrentMonth,
  getLastFiveAcceptedColleges,
  getPassedAcceptedVisits,
  getAllAcceptedVisits
};
