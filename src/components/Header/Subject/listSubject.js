import React, { Component, useState, useEffect, Fragment, useContext } from "react";
import { Link, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';
import ScrollToTop from "../../ScrollToTop";
ListSubject.propTypes = {
    posts: PropTypes.array,
};
ListSubject.defaultProps = {
    posts: [{}],
};
function ListSubject(props) {
    const { posts } = props;


    console.log("props ", props);
    return (


        <Fragment>

            {posts.map((post, index) => {
                return (<tr className={index % 2 == 0 ? "h-16  bg-xanhnhat text-white" : "text-xanhla h-16 "} key={index}>
                    <td>{(index + 1) + (props.pagination.pageSize * (props.pagination.page - 1))}</td>
                    <td className=" ">{post.code}</td>
                    <td className="  pl-4 ">{post.name}</td>
                    <td className=" ">   <NavLink exact activeStyle={{


                    }} exact to={{
                        pathname: "/subject/view",
                        state: {
                            name: post.id
                        }
                    }} className="my-link text-black border-b-2 border-black" >    View
                    </NavLink></td>
                    <td className="  leading-80">
                        <Link
                            exact to={{
                                pathname: "/booking",
                                state: {
                                    subject: post
                                }
                            }} className="my-link border-b-2 border-xanhla text-xanhla font-bold"> Select </Link>  </td> </tr>)
            })}



        </Fragment>
    );
}


export default ListSubject;