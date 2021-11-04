import React, { Component, useContext } from "react";
import { Link, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';
import "../../css/animation.css";
ListProduct.propTypes = {
    posts: PropTypes.array,
};
ListProduct.defaultProps = {
    posts: [{}],
};

function ListProduct(props) {


    const { posts } = props;


    return (

        <div className=" mx-auto h-full w-full grid grid-cols-3 mb-16 gap-x-16 gap-y-28">
            {posts.map((post, index) => {
                return (<div key={index} className="ml-40">
                    <div className="bg-fpt h-450  w-320  -mt-5 -ml-8 " >
                        <img src={post.avatar}
                            className=" w-72 h-80 mx-auto pt-4 block  relative  bg-center bg-cover" />

                        <h3 className=" mb-4 mt-2 h-56   pl-5 font-semibold  text-xl">Mr.
                            {post.fullName}
                        </h3>
                        <NavLink exact activeStyle={{
                            backgroundColor: 'white',
                            color: 'red'
                        }} to={{
                            pathname: "/mentor/view",
                            state: {
                                name: post
                            }
                        }} className="my-link float-left justify-end items-end mx-5">
                            <button className=" h-8 w-20 bg-xanhla float-left  px-5 rounded-2xl  " id="cool-link"> view </button><br /> </NavLink>

                        <Link
                            to={{
                                pathname: "/booking",
                                state: {
                                    name: post
                                }
                            }} className="my-link float-right mx-5  ">   <button className=" h-8 w-20 bg-xanhla  px-5 rounded-2xl float-left">Select</button>
                        </Link>

                    </div>
                </div>)
            })}

        </div>



    );
}

export default ListProduct;