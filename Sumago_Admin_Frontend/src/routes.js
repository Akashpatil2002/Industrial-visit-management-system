<<<<<<< HEAD
import { FaLocationArrow, FaUniversity } from 'react-icons/fa';
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import Location from "views/Location.js";
import University from "views/University.js";
import State from "views/State";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import District from "views/District.js";
import City from "views/City.js";
import Login from "Login Page/Login";
import Register from "Register Page/Register"
import ResetPassword from "ResetPassword Page/ResetPassword";
import CollegeAdmin from "views/CollegeAdmin";
import StudentList from 'views/StudentList';
import StaffManagement from 'views/StaffList';
import Schedule from "views/Schedule.js";
import Fees from "views/Fees.js";
=======
import Dashboard from "views/Dashboard.js";
import Collegeuniversity from "views/Collegeuniversity";
import Collegestate from "views/Collegestate";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import { FaLocationArrow,FaUniversity } from 'react-icons/fa';
import Collegedistrict from "views/Collegedistrict";
import Collegecity from "views/Collegecity";
import Login from "./Login Page/Login.js";
import Register from "./Register Page/Register.js";
import ResetPassword from "./ResetPassword Page/ResetPassword.js";
import Fees from "views/Fees.js";
import StudentForm from "views/Studentlist.js";
import StaffList from "views/Stafflist.js";
import Requestvisit from "views/Requestvisit.js";
import Feedback from "views/Feedback.js";
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
const dashboardRoutes = [
  {
    path: "/login",
    name: "Log In",
    icon: "nc-icon nc-circle-09",
    component: Login,
    layout: "/admin"
  },
  {
<<<<<<< HEAD
    path: "/register",
    name: "Register",
    component: Register,
    layout: "/admin"
  },

  {
    path: "/resetpassword",
    name: "Reset Password",
    component: ResetPassword,
    layout: "/admin"
  },

=======
    path:"/register",
    name: "Register",
    component: Register,
    layout:"/admin"
  },

  {
    path:"/resetpassword",
    name: "Reset Password",
    component: ResetPassword,
    layout:"/admin"
  },
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
<<<<<<< HEAD
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/location",
    name: "Location",
    icon: "nc-icon nc-pin-3",
    component: Location,
    layout: "/admin"
  },
  {
    path: "/university",
    name: "University",
    icon: "nc-icon nc-paper-2",
    component: University,
    layout: "/admin"
  },
  {
    path: "/state",
    name: "State",
    icon: "nc-icon nc-pin-3",
    component: State,
    layout: "/admin"
  },
  {
    path: "/district",
    name: "District",
    icon: "nc-icon nc-pin-3",
    component: District,
    layout: "/admin"
  },
  {
    path: "/city",
    name: "City",
    icon: "nc-icon nc-pin-3",
    component: City,
    layout: "/admin"
  },
  {
    path: "/collegeadmin",
    name: "Add College Admin",
    icon: "nc-icon nc-circle-09",
    component: CollegeAdmin,
    layout: "/admin"
  },

  {
    path: "/schedule",
    name: "Agenda",
    icon: "nc-icon nc-single-copy-04",
    component: Schedule,
=======

  {
    path: "/collegeuniversity",
    name: "University",
    icon: "nc-icon nc-paper-2",
    component: Collegeuniversity,
    layout: "/admin"
  },
  {
    path: "/collegestate",
    name: "State",
    icon: "nc-icon nc-pin-3",
    component: Collegestate,
    layout: "/admin"
  },
  {
    path: "/collegedistrict",
    name: "District",
    icon: "nc-icon nc-pin-3",
    component: Collegedistrict,
    layout: "/admin"
  },
  {
    path: "/collegecity",
    name: "City",
    icon: "nc-icon nc-pin-3",
    component: Collegecity,
    layout: "/admin"
  },
  {
    path: "/studentlist",
    name: "Student List",
    icon: "nc-icon nc-badge",
    component: StudentForm,
    layout: "/admin"
  },
  {
    path: "/stafflist",
    name: "Staff List",
    icon: "nc-icon nc-badge",
    component: StaffList,
    layout: "/admin"
  },
  {
    path: "/requestvisit",
    name: "Request Visit",
    icon: "nc-icon nc-square-pin",
    component: Requestvisit,
    layout: "/admin"
  },
  {
    path: "/feedback",
    name: "Feedback",
    icon: "nc-icon nc-notes",
    component: Feedback,
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
    layout: "/admin"
  },
  {
    path: "/fees",
    name: "Fees",
    icon: "nc-icon nc-money-coins",
    component: Fees,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin"
  },
  {
<<<<<<< HEAD
    path: "/students",
    name: "Student List",
    icon: "nc-icon nc-badge",
    component: StudentList,
    layout: "/admin"
  },

  {
    path: "/staff",
    name: "Staff List",
    icon: "nc-icon nc-badge",
    component: StaffManagement,
    layout: "/admin"
  },
  {
=======
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin"
  },
<<<<<<< HEAD
=======
 
  
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4

];

export default dashboardRoutes;
