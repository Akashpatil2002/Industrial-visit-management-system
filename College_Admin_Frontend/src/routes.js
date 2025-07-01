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
const dashboardRoutes = [
  {
    path: "/login",
    name: "Log In",
    icon: "nc-icon nc-circle-09",
    component: Login,
    layout: "/admin"
  },
  {
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
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },

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
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin"
  },
 
  

];

export default dashboardRoutes;
