import React from "react";
import { useHistory } from 'react-router-dom';
import Footer from "../../Footer";
import Header from '../../Header';
import ImageSlider from "./ImageSlider";
import { SliderData } from "./SliderData";


export default function Home() {

  let history = useHistory();
  return (

    <div>
      <Header>
        <div className="mt-14">
          <div className="mb-10 h-450 relative">
            <img className="absolute h-450 w-full  "
              src="https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.15752-9/s2048x2048/247323097_6682055368472946_9091482303354221221_n.png?_nc_cat=101&ccb=1-5&_nc_sid=ae9488&_nc_ohc=UYHSkQsc08MAX-SPobC&_nc_ht=scontent.fsgn5-2.fna&oh=6a3e417d0384a3b4f93df867faaa7df6&oe=61994F3E" />
            <h2 className="   relative   text-7xl pt-28  text-white text-center  font-bold "> MENTOR APPOINTMENT  </h2>
            <p className=" p-8  relative  text-[#ffa400] text-3xl w-[1702px] text-white text-center font-normal uppercase font-sans "> - Mentor appointment scheduling applicaton -  </p>
          </div>
          <div className="grid grid-cols-2 my-20 gap-x-35 h-650 ">
            <div className="text-center">
              <div className="">
                <h3 className="mt-20 text-5xl   text-xanhla  font-bold"  > Self peaced course.</h3>
                <div className="text-xanhla  border-b-8 rounded-2xl border-xanhla mx-auto mt-2 w-2/12 mb-20 "></div>
              </div>

              <p className="mb-8 text-xl w-9/12 text-xanhla  text-left ml-40">  We offer an online mentor booking service. You can choose for yourself a mentor according to the specialty you need.</p>
              <p className="mb-28 text-xanhla text-xl w-9/12  text-left ml-40">  The procedures are convenient and simple, please take a look at the booking schedule.</p>
              <button className=" w-72 rounded-5xl h-16 float-right bg-xanhla  text-center" onClick={
                () => {
                  history.push('/booking')
                }
              } ><p className="text-white text-2xl font-bold  "> Book Today</p></button>
            </div>
            <div className="ml-7 select-none">
              {/* <img src="https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80"
                className="h-600 w-9/12  "/> */}

              <ImageSlider slides={SliderData} />
            </div>
          </div>
          <div className="relative">
            <img className=" absolute -z-1 h-full w-full"
              src="https://scontent.fsgn5-11.fna.fbcdn.net/v/t1.15752-9/s2048x2048/246836949_219222733645493_6917887468160862380_n.png?_nc_cat=110&ccb=1-5&_nc_sid=ae9488&_nc_ohc=uaD23lct-iAAX_m9A82&_nc_ht=scontent.fsgn5-11.fna&oh=02a8d75ef2972c81b4f547b7766f62e4&oe=6199FDBE" />
            <div className="grid pt-16 text-white grid-cols-3  gap-x-5 justify-center  text-center px-56 clear-both h-64 mt-12 w-full ">
              <div className=" ">

                <img src="https://scontent-xsp1-1.xx.fbcdn.net/v/t1.15752-9/247910703_727826648133716_4310877239023804546_n.png?_nc_cat=108&ccb=1-5&_nc_sid=ae9488&_nc_ohc=ZUbtKMK5FXoAX936gOr&_nc_ht=scontent-xsp1-1.xx&oh=916ef6cc3108d1cce1580aa908e93a98&oe=6197F597"
                  className="h-20 select-none w-28 mb-6 block mx-auto" />
                <p className="text-2xl">Study anywhere</p>
              </div>
              <div>
                <img src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.15752-9/246395252_406443377553363_5974449852522365242_n.png?_nc_cat=105&ccb=1-5&_nc_sid=ae9488&_nc_ohc=QMPdBWRJ58IAX_TSttL&_nc_ht=scontent.fsgn5-9.fna&oh=fd257d66d9fa6af9ea13fb4afdfcbe00&oe=6199B36F"
                  className="h-20 select-none w-28 mb-6 mx-auto" />
                <p className="text-2xl">Expert Instruction</p>
              </div>
              <div>
                <img src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.15752-9/246197732_601212741016689_4776929740934046554_n.png?_nc_cat=105&ccb=1-5&_nc_sid=ae9488&_nc_ohc=FSprP3w7xrMAX-DHru1&_nc_ht=scontent.fsgn5-9.fna&oh=be1318627f7c09cee0871c1175729780&oe=619A76BF"
                  className="h-20 select-none w-28 mb-6 mx-auto" />
                <p className="text-2xl">One to One</p>
              </div>
            </div>
            <div className="gap-x35 h-72 mt-10 bg-center w-9/12 mx-auto mb-16">

              <div className="col-span-3 my-auto w-full font-medium text-5xl font-serif  text-white uppercase text-center">“ It's been great to lean at my own <br /> pace and from the comfort of home ”</div>
            </div>

          </div>

        </div>


      </Header>
      <Footer />
    </div>
  );

}

