import React, { Component, useState, useEffect } from "react";
import Admin from "../AdminDashboard/AdminDashboard";
import Modal from "../../Modal";
import Pagination from "../../Pagination";
import GetSubject from "./GetSubject";
import ModalForSubject from "./ModalForSubject";
import queryString from 'query-string';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { ENDPOINT } from "../../../config";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});





function SubjectManagement(props) {

  console.log("propssss chua te ", props)
  const { posts } = props;
  const [open, setOpen] = useState(false);
  const [mentorList, setPostMentorList] = useState([]);
  const [postList, setpostList] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    count: 1,
  });
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 10,
    // title_like: '',
  })

  useEffect(() => {
    featchPostList()
    featchSpecList()
    featchMentorList()
  }, [filters]);

  async function featchPostList() {
    try {

      const paramsString = queryString.stringify(filters);
      const requestURL = ENDPOINT + `api/subject/get_list?${paramsString}`;

      const response = await fetch(requestURL, {
        method: `GET`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
        },
      });
      const responseJSON = await response.json();

      const { data, pagination } = responseJSON;

      setpostList(responseJSON?.data?.rows);
      setPagination({
        page: filters.page,
        pageSize: 10,
        count: data?.count,
      });

    } catch (error) {
      console.log('Fail to fetch product list: ', error)
    }
  }

  async function featchMentorList() {
    try {
      const requestURL = ENDPOINT + `api/user/get_list?roleID=2`;
      const response = await fetch(requestURL, {
        method: `GET`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
        },
      });
      const responseJSON = await response.json();

      const { data, pagination } = responseJSON;

      setPostMentorList(data?.rows);

      return data
    } catch (error) {
      console.log('Fail to fetch product list: ', error)
    }
  }

  async function featchSpecList() {
    try {
      const requestURL = ENDPOINT + `api/specialize/get_list?`;
      const response = await fetch(requestURL, {
        method: `GET`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
        },
      });
      const responseJSON = await response.json();

      const { data, pagination } = responseJSON;

      setPostSpecList(data);

      return data
    } catch (error) {
      console.log('Fail to fetch product list: ', error)
    }
  }



  function handlePageChange(newPage) {

    setFilters({
      ...filters,
      page: newPage,
    })
  }

  function handleSearchTermChange(newFilters) {

    setFilters({
      ...filters,
      page: 1,
      title_like: newFilters.searchTerm,
    })
  }

  function showModal() {
    setShow(true);
    setIsClicked(true);
  };
  function hideModal() {
    setShow(false);
    setIsClicked(true);
  };

  const [show, setShow] = useState(false);
  const [isClicked, setIsClicked] = useState(true);


  const [postSpecList, setPostSpecList] = useState([]);




  const [message, setMessage] = useState('')

  const callbackFunction = (childData) => {
    setMessage(childData)
    setOpen(true)
  };
  console.log("prop cha", message)
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };



  return (
    <Admin>

      <div className="mt-101">
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} className="float-left w-screen">
          <Alert onClose={handleClose} severity="success" >
            {message}
          </Alert>
        </Snackbar>
        <div className="bg-white h-20 mx-5 grid grid-cols-9 ">
          <h2 className="text-xl col-span-6 leading-80 pl-8 float-left text-700 h-20">Subject manage</h2>
          <div id="form-field" className="  mt-4  col-span-2  mb-0  mr-52 w-72 ">
            <input type="text" id="form-input" placeholder=" " className=" mb-0 h-10   border-gray-200   " />
            <label id="form-label" className="-ml-16 text-gray-200 mb-0  ">Search list...</label>
          </div>
          <div >
            <Modal show={show} handleClose={hideModal} className="mb-5">
              <ModalForSubject spec={postSpecList} parentCallback={callbackFunction} onDelteModal={() => setpostList(undefined)} onModal={() => setShow(false)} onDelete={() => featchPostList()} />
            </Modal>
            <div>
              <button type="button" onClick={showModal} className="h-50 w-28 bg-xanhlot rounded-lg mt-4 text-white">Add new</button>

            </div>
          </div>
        </div>
        <div className="mx-5 bg-white clear-none  ">
          <table className="table-auto w-full  text-left">
            <thead className=" h-10  pointer-events-none bg-gray-200  ">
              <tr className=" ">
                <th className=" pl-8 w-32 "> No. </th>

                <th className="w-80  "> Name</th>
                <th className="w-80   ">Id</th>
                <th className="w-64  ">Specialized</th>
                <th className="w-80 ">Mentor</th>
                <th className="w-20  ">Actions</th>
                <th className=" w-12  "></th>
                <th className="  "></th>
              </tr>
            </thead>
            {/* {elements} */}
            <GetSubject pagination={pagination} parentCallback={callbackFunction} posts={postList} postss={postSpecList} mentor={mentorList} onDelete={() => featchPostList()} />

          </table>
          <div className="h-16  border-gray-200  ">

            <Pagination pagination={pagination} onPageChange={handlePageChange} />



          </div>

        </div>

      </div>

    </Admin>
  )
}

export default SubjectManagement;