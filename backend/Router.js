const CollegeUniversityController = require('./Controller/CollegeUniversityController')
const CollegeStateController = require('./Controller/CollegeStateController')
const CollegeDistrictController = require('./Controller/CollegeDistrictController')
const CollegeCityController = require('./Controller/CollegeCityController')
const AdminUniversityController = require('./Controller/AdminUniversityController')
const AdminStateController = require('./Controller/AdminStateController')
const AdminDistrictController = require('./Controller/AdminDistrictController')
const AdminCityController = require('./Controller/AdminCityController')
const AdminAddCollegeAdmin = require('./Controller/AdminAddCollegeAdminController')
const FeeControlletr = require('./Controller/FeesController')
const StudentVisitListController = require('./Controller/StudentVisitListController')
const AddStaffListController = require('./Controller/AddStaffController')
const VisitController = require('./Controller/VisitController')
const AdminLocation = require('./Controller/AdminLocationController')
const AdminScheduleController = require('./Controller/AdminScheduleController')
const CollegeVisitCountController = require('./Controller/CollegeVisitCountController')
const UserProfile = require('./Controller/UserProfileController')
const AdminLoginController = require('./Controller/AdminLoginController')
const CollegeLogController = require('./Controller/CollegeLogController')
const AdminNotifiController = require('./Controller/AdminNotificationController')
const photoUpload = require('./Multer1');
const express = require("express")
const router = express.Router();


//UserProfile Controller
router.get('/profile', UserProfile.getAdminProfile);
router.post('/register', photoUpload.single('profileImage'), UserProfile.createUser);
router.put('/admin/update', photoUpload.single('profileImage'), UserProfile.updateAdmin);


//Collage University
router.get('/uniReg', CollegeUniversityController.uniReg);
router.get('/unifind', CollegeUniversityController.unifind);
router.post('/unipost', CollegeUniversityController.unipost);
router.delete('/UniDel/:University_Name', CollegeUniversityController.UniDel);
router.put('/uniupdate/:University_Name', CollegeUniversityController.uniupdate);


//College State
router.get('/StateActiveReg', CollegeStateController.StateActiveReg)
router.get('/StateReg', CollegeStateController.StateReg)
router.get('/statefind', CollegeStateController.statefind);
router.post('/statepost', CollegeStateController.statepost);
router.delete('/stateDel/:State_Name', CollegeStateController.stateDel)
router.put('/Statepdate/:currentStateName', CollegeStateController.Statepdate);

// Collage District
router.get('/disReg', CollegeDistrictController.disReg);
router.get('/disfind', CollegeDistrictController.disfind);
router.post('/dispost', CollegeDistrictController.dispost);
router.delete('/disDel/:District_Name', CollegeDistrictController.disDel)
router.put('/disupdate/:District_Name', CollegeDistrictController.disupdate);

//College City
router.get('/CityReg', CollegeCityController.CityReg);
router.get('/Cityfind', CollegeCityController.Cityfind);
router.post('/Citypost', CollegeCityController.Citypost);
router.delete('/CityDel/:City_Name', CollegeCityController.CityDel)
router.put('/Cityupdate/:id', CollegeCityController.Cityupdate);

//Col Login
router.get('/ColReg', CollegeLogController.getUser);
router.get('/Colfind', CollegeLogController.findUser);
router.post('/Colpost', CollegeLogController.addUser);
router.delete('/ColDel/:email', CollegeLogController.deleteUser)
router.put('/Colupdate', CollegeLogController.updateUser);
router.post('/login1', CollegeLogController.login1)
router.post('/ResetPasswordRequest1', CollegeLogController.resetPasswordRequest1);
router.post('/UpdatePassword1', CollegeLogController.updatePassword1);

//Admin Login

router.get('/AdminReg', AdminLoginController.getAdmin);
router.get('/Adminfind', AdminLoginController.findAdmin);
router.post('/Adminpost', AdminLoginController.addAdmin);
router.delete('/AdminDel/:email', AdminLoginController.deleteAdmin)
router.put('/Adminupdate', AdminLoginController.updateAdmin);
router.post('/Adminlogin', AdminLoginController.login)
router.post('/ResetPasswordRequest', AdminLoginController.resetPasswordRequest);
router.post('/UpdatePassword', AdminLoginController.updatePassword);


//Admin Location

router.get('/AdminLocReg', AdminLocation.AdminLocReg);
router.get('/AdminLocfind', AdminLocation.AdminLocfind);
router.post('/AdminLocpost', AdminLocation.AdminLocpost);
router.delete('/AdminLocDel/:Location_Name', AdminLocation.AdminLocDel)
router.put('/AdminLocupdate/:Location_Name', AdminLocation.AdminLocupdate);

//Admin University

router.get('/AdminuniReg', AdminUniversityController.AdminuniReg);
router.get('/Adminunifind', AdminUniversityController.Adminunifind);
router.post('/Adminunipost', AdminUniversityController.Adminunipost);
router.delete('/AdminUniDel/:University_Name', AdminUniversityController.AdminUniDel)
router.put('/Adminuniupdate/:id', AdminUniversityController.Adminuniupdate);

//Admin State
router.get('/AdminActiveStateReg', AdminStateController.AdminActiveStateReg)
router.get('/AdminStateReg', AdminStateController.AdminStateReg);
router.get('/Adminstatefind', AdminStateController.Adminstatefind);
router.post('/Adminstatepost', AdminStateController.Adminstatepost);
router.delete('/AdminstateDel/:State_Name', AdminStateController.AdminstateDel)
router.put('/AdminStateupdate/:State_Name', AdminStateController.AdminStateupdate);


//Admin District
router.get('/AdminDisReg', AdminDistrictController.AdminDisReg);
router.get('/AdminDisfind', AdminDistrictController.AdminDisfind);
router.post('/AdminDispost', AdminDistrictController.AdminDispost);
router.delete('/AdminDisDel/:District_Name', AdminDistrictController.AdminDisDel)
router.put('/AdminDisupdate/:id', AdminDistrictController.AdminDisupdate);


//Admin City
router.get('/AdminCityReg', AdminCityController.AdminCityReg);
router.get('/AdminCityfind', AdminCityController.AdminCityfind);
router.post('/AdminCitypost', AdminCityController.AdminCitypost);
router.delete('/AdminCityDel/:City_Name', AdminCityController.AdminCityDel)
router.put('/AdminCityupdate/:id', AdminCityController.AdminCityupdate);

// Admin Add College Admin
router.get('/AdminColget', AdminAddCollegeAdmin.AdminColget);
router.get('/AdminColfind', AdminAddCollegeAdmin.AdminColfind);
router.post('/AdminColpost', AdminAddCollegeAdmin.AdminColpost);
router.delete('/AdminColDel/:College_Name', AdminAddCollegeAdmin.AdminColDel)
router.put('/AdminColupdate/:College_Name', AdminAddCollegeAdmin.AdminColupdate)
router.get('/unsigned-mou-colleges', AdminAddCollegeAdmin.getUnsignedMouColleges)
router.get('/signed-mou-colleges', AdminAddCollegeAdmin.getSignedMouColleges)
router.get('/colleges-with-no-mou', AdminAddCollegeAdmin.getCollegesWithNoMou)

//Admin Schedule

router.get('/AdminScheduleReg', AdminScheduleController.AdminScheduleReg);
router.get('/AdminSchedulefind', AdminScheduleController.AdminSchedulefind);
router.post('/AdminSchedulepost', AdminScheduleController.AdminSchedulepost);
router.delete('/AdminScheduleDel/:Schedule_Title', AdminScheduleController.AdminScheduleDel);
router.put('/AdminScheduleupdate/:Schedule_Title', AdminScheduleController.AdminScheduleupdate);

//Admin Notification
router.post('/status', AdminNotifiController.createStatus);
router.get('/status/:id', AdminNotifiController.getStatus);
router.put('/status/:id', AdminNotifiController.updateStatus);
router.delete('/status/:id', AdminNotifiController.deleteStatus);
router.get('/statuses', AdminNotifiController.getAllStatuses);
router.get('/accepted-visits-current-week', AdminNotifiController.getAcceptedVisitsForCurrentWeek);
router.get('/accepted-visits-current-month', AdminNotifiController.getAcceptedVisitsForCurrentMonth);
router.get('/last-five-accepted-colleges', AdminNotifiController.getLastFiveAcceptedColleges);
router.get('/passed-accepted-visits', AdminNotifiController.getPassedAcceptedVisits);
router.get('/all-accepted-visits', AdminNotifiController.getAllAcceptedVisits);

//Fee Controller
router.get('/feeReg', FeeControlletr.getAllFees);         
router.get('/fee/:id', FeeControlletr.getFeeById);        
router.post('/feepost', FeeControlletr.addFee);           
router.put('/feeupdate/:id', FeeControlletr.updateFee);   
router.delete('/feedelete/:id', FeeControlletr.deleteFee);

//college visit counter Controller
router.get('/ColvisitReg', CollegeVisitCountController.ColvisitReg);
router.get('/Colvisitfind', CollegeVisitCountController.Colvisitfind);
router.post('/Colvisitpost', photoUpload.single('Image'), CollegeVisitCountController.Colvisitpost);
router.delete('/ColvisitDel/:Visit_Date', CollegeVisitCountController.ColvisitDel)
router.put('/Colvisitupdate/:id', photoUpload.single('Image'), CollegeVisitCountController.Colvisitupdate);

//Student Visit List Controller
router.get('/StudReg', StudentVisitListController.StudReg);
router.get('/Studfind/:id', StudentVisitListController.Studfind); 
router.post('/Studpost', StudentVisitListController.Studpost);
router.delete('/StudDel/:id', StudentVisitListController.StudDel); 
router.put('/Studupdate/:id', StudentVisitListController.Studupdate); 
router.delete('/StudDelAll/:collegeVisitId', StudentVisitListController.StudDelByCollege);
router.get('/search-students', StudentVisitListController.searchStudents);


//Add Staff
router.get('/staff', AddStaffListController.getAllStaff);
router.get('/staff/find', AddStaffListController.Staffind);
router.post('/staff', AddStaffListController.Staffpost);
router.delete('/staff/:Department_Name', AddStaffListController.StaffDel);
router.put('/staff/:id', AddStaffListController.Staffupdate); // Change Department_Name to id
router.delete('/staff/college/:collegeId', AddStaffListController.StaffDelByCollege);
router.get('/staff/search', AddStaffListController.StaffSearch);

//Visit
router.get('/VisitReg', VisitController.VisitReg);
router.get('/Visitfind', VisitController.Visitfind);
router.post('/Visitpost', photoUpload.single('Image1'), VisitController.Visitpost);
router.delete('/VisitDel/:VisitId', VisitController.VisitDel)
router.put('/Visitupdate/:VisitId', photoUpload.single('Image1'), VisitController.Visitupdate);
router.get('/accepted-visits/details', VisitController.fetchAcceptedVisitsWithDetails);


module.exports = router