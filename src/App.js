import React, { Component } from "react";
import './index.css'
import './App.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Subject from "./components/Header/Subject/Subject";
import Login from "./components/Header/Login/Login"
import Mentor from "./components/Header/Mentor/Mentor";
import Errors from "./components/Errors";
import Scheduling from "./components/Header/Profile/Scheduling";
import Booking from "./components/Header/Booking/Booking";
import Home from "./components/Header/Home/Home";
import MentorView from "./components/Header/Mentor/MentorView";
import SubjectView from "./components/Header/Subject/SubjectView";
import Profile from "./components/Header/Profile/Profile";
import Admin from "./components/Admin/AdminDashboard/AdminDashboard";
import User from "./components/Admin/User/UserManagement";
import SubjectManagement from "./components/Admin/Subject/SubjectManagement";
import SchedulingManagement from "./components/Admin/Scheduling/SchedulingManagement";
import StudentScheduling from "./components/Admin/Scheduling/Student/StudentSchduling";
import MentorScheduling from "./components/Admin/Scheduling/Mentor/MentorScheduling";
import subjectScheduling from "./components/Admin/Scheduling/Subject/Subjectscheduling";
import MentorDashboard from "./components/Mentor/MentorDashboard/MentorDashboard";
import GetViewDashboard from "./components/Mentor/MentorDashboard/GetViewDashboard";
import ViewHistory from "./components/Mentor/ViewHistory/ViewHistory";
import Request from "./components/Mentor/Request/Request";
import SchedulingMenter from "./components/Mentor/Scheduling/SchedulingMentor";
import ScrollToTop from "./components/ScrollToTop";
import UpdatePasswordl from "./components/Header/Login/UpdatePassword";
import UpdatePassword from "./components/Header/Login/UpdatePassword";
import UpdateProfile from "./components/Header/Profile/UpdateProfile";
import ChangePassword from "./components/Header/Profile/ChangePassword";
import SubjectForMentor from "./components/Header/Profile/SubjectForMentor";
import AboutUs from "./components/Header/AboutUs/AboutUs";

function App() {

  

    return (

      <Router basename='/Appointment_fe/'>
        <ScrollToTop />  
        <Switch>
          
          <Route exact path="/" component={Home} />
          <Route exact path="/aboutus" component={AboutUs} />
          <Route exact path="/mentordashboard" component={GetViewDashboard} />
          <Route exact path="/mentordashboard/viewhistory" component={ViewHistory} />
          <Route exact path="/mentordashboard/scheduling" component={SchedulingMenter} />
          <Route exact path="/mentordashboard/request" component={Request} />
          <Route exact path="/admindashboard" component={Admin} />
          <Route path="/admindashboard/user" component={User} />
          <Route path="/admindashboard/subject" component={SubjectManagement} />
          <Route exact path="/admindashboard/scheduling" component={StudentScheduling} />
          {/* <Route path="/admindashboard/scheduling" component={StudentScheduling} /> */}
          <Route path="/admindashboard/scheduling/mentor" component={MentorScheduling} />
          <Route path="/admindashboard/scheduling/subject" component={subjectScheduling} />
          <Route exact path="/subject" component={Subject} />
          <Route path="/subject/view" component={SubjectView} />
          <Route exact path="/mentor" component={Mentor} />
          <Route path="/mentor/view" component={MentorView} />
          <Route path="/updatepassword" component={UpdatePassword} />
          <Route path="/scheduling" component={Scheduling} />
          <Route path="/booking" component={Booking} />
          <Route path="/login" component={Login} />
          {/* <Route  exact path="/profile"  component={Profile}   >
      
          </Route> */}
          <Route path="/profile/update" component={UpdateProfile}    />
          <Route path="/profile/subject" component={SubjectForMentor} />
          <Route path="/profile/password" component={ChangePassword} />
          
          <Route path="/:somestring" component={Errors} />


        </Switch>

      </Router>

    );
  }


export default App