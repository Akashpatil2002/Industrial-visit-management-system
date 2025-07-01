const Visitlist= require('../Models/VisitModel')
const AdminNotification = require('../Models/AdminNotificationModel')
const moment = require('moment');

//get 
const VisitReg=async(req,res)=>{
  try{
    const feedbacks=await Visitlist.find({})
    res.status(200).send({feedbacks})
  }
  catch(err){
    res.status(500).send(err)
}
}

//find
const Visitfind=async(req,res)=>{
    try{
        const feedbacks= await Visitlist.find({VisitId:req.body.VisitId})
        res.status(200).send({feedbacks})
    }
    catch(err){
        res.status(500).send(err)
    }
}

//post
const Visitpost= async(req,res)=>{
    try{
        
       const {VisitId, Visit_Date,Feedback_Message}=req.body
    
       const reg=new Visitlist({
        VisitId, Visit_Date,Feedback_Message,Image1:req.file.filename
       })
       const feedbacks=await reg.save()
       res.status(200).send({ feedbacks })
    }
    catch (err) {
        console.log(err);
        res.status(500).send((err))
    }
}

//Delete
const VisitDel =async(req,res)=>{
    try{
        const cancel=await Visitlist.deleteOne({ VisitId:req.params.VisitId})
        res.status(200).send(cancel)
    }
    catch(err){
        res.status(500).send(err)
    }
}

//Update
const Visitupdate = async (req, res) => {
    const { VisitId } = req.params; 
    const { Visit_Date, Feedback_Message } = req.body;

    const image = req.file ? req.file.filename : req.body.existingImage; 

    try {
        const updatedAdmin = await Visitlist.findOneAndUpdate(
            { VisitId }, 
            { VisitId, Visit_Date, Feedback_Message, Image1: image }, 
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



// Fetch college names and visit dates for accepted visits that have passed
const fetchAcceptedVisitsWithDetails = async (req, res) => {
    try {
        const acceptedVisits = await AdminNotification.find({ status: 'Accepted' }).populate('visitId');

        const filteredVisits = acceptedVisits.filter(visit => {
            const visitDate = visit.visitId.Visit_Date; 
            // Parse the visit date from the format YYYY?MM?DD
            const visitMoment = moment(visitDate.replace(/\?/g, '-'), 'YYYY-MM-DD');

            // Ensure visit is before today (strictly less than today)
            return visitMoment.isBefore(moment().startOf('day'));
        });

        const collegeVisits = filteredVisits.map(visit => ({
            collegeName: visit.visitId.College_Name, 
            visitDate: visit.visitId.Visit_Date
        }));

        res.status(200).json(collegeVisits);
    } catch (error) {
        console.error('Error fetching accepted visits with details:', error.message);
        res.status(500).json({ error: error.message });
    }
};



module.exports={VisitReg,Visitfind,Visitpost,VisitDel,Visitupdate,fetchAcceptedVisitsWithDetails}