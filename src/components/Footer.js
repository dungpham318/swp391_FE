import React, { Component } from "react";
import logo from './image/logo.png';
import { Link } from 'react-router-dom';

export default class Footer extends Component {

    render() {
        return (

            <footer className="text-center w-full grid grid-cols-footer  justify-center border-t-2 border-xanhla pt-16  mb-8 mt-20  ">
              <div className="  w-full ml-32  justify-center items-center">
              <Link to="/">  <img className="h-20   w-250 float-left" src={logo} alt="logo" /></Link>
              
              </div>
                <div className="   text-left grid grid-cols-3    w-full     pt-8 text-lg font-semibold  " >
                    <div className="mb-16 "><h1>HÀ NỘI<br />
                        Khu Giáo dục và Đào tạo –<br />
                        Khu Công nghệ cao Hòa Lạc<br />
                        -Km29 Đại lộ Thăng Long,<br />
                        H. Thạch Thất, TP. Hà Nội<br />

                        <p className="my-4"> Điện thoại: 024 7300 1866 </p>

                        Email: daihocfpt@fpt.edu.vn</h1></div>
                    <div><h1>TP. HỒ CHÍ MINH<br />
                        Lô E2a-7, Đường D1 Khu<br/>
                         Công nghệ cao, P. Long<br/>
                         Thạnh Mỹ, TP. Thủ Đức, <br/>TP. Hồ Chí Minh<br />

                        <p className="my-4">  Điện thoại: 028 7300 1866 </p>

                        Email: daihocfpt@fpt.edu.vn</h1></div>
                    <div><h1>ĐÀ NẴNG<br />
                        Khu đô thị công nghệ FPT <br />
                        Đà Nẵng, P. Hoà Hải, Q. Ngũ<br />
                        Hành Sơn, TP. Đà Nẵng

                        <p className="my-4">  Điện thoại: 0236 730 1866 </p>

                        Email: daihocfpt@fpt.edu.vn</h1></div>
                    <div><h1>CẦN THƠ<br />
                        Số 600 Đường Nguyễn Văn<br />
                        Cừ (nối dài), P. An Bình,<br />
                        Q. Ninh Kiều, TP. Cần Thơ

                        <p className="my-4">  Điện thoại: 0292 730 1866 </p>

                        Email: daihocfpt@fpt.edu.vn</h1></div>
                    <div><h1>QUY NHƠN<br />
                        Khu đô thị mới An Phú <br />
                        Thịnh, Phường Nhơn Bình <br />
                        & Phường Đống Đa, TP. Quy <br />
                        Nhơn, Bình Định

                        <p className="my-4">   Điện thoại: 0256 730 1866 <br/> /0256 7300 999 </p>

                        Email: daihocfpt@fpt.edu.vn</h1></div>
                </div>

            </footer>
        );

    }
}
