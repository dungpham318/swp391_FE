import React from "react";
import Footer from "../../Footer";
import Header from '../../Header';
import "../../css/about_us.css";


export default function AboutUs() {
  
    return (
        <div className="mt-20">
            <Header >
               
            
          <header id="masthead">
            
              <p id="masthead-intro">Hi, welcom to </p> 
              <h1 id="masthead-heading">Appointment mentor scheduling applications</h1>
          </header>
        
    
      
      <section id="introduction">
        <div id="starcontainer">
          <h2>About us</h2>
          <i id="fa fa-star fa-2x"></i>
          <hr id="star"></hr>
        </div>
          <p>Our application development team is from FPT University. </p>
      
          <p>In the process of studying and experiencing at the school, we realize that many students have difficulties in studying and orienting their future jobs. Mentor is someone who can answer students' problems but it is difficult to meet a mentor outside of id time. So we created this website with the purpose of creating a connection between students and mentors quickly, easily and saving time. </p>
      </section>
      
      <section id="location">
          <h1>Where I’m From</h1>
          <p>....</p>
      </section>
      
      
      
      


                <Footer />
            </Header>
        </div>
    );
}
