import queryString from 'query-string';
import React, { useEffect, useState } from "react";
import Footer from "../../Footer";
import Header from '../../Header';
import Pagination from "../../Pagination";
import ListProduct from "./ListMentor";
import Search from '../Subject/Search';
import accountApi from '../../../api/accountApi';
import { ENDPOINT } from '../../../config/index'

function Mentor() {

  const [postList, setpostList] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 9,

  });
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 9,
  })

  useEffect(() => {


    featchAccountList();
  }, [filters]);

  const featchAccountList = async () => {
    try {
      console.log(filters)
      const paramsString = queryString.stringify(filters);
      const requestURL = ENDPOINT + `api/user/get_mentor_list?${paramsString}`;

      const response = await fetch(requestURL);
      const responseJSON = await response.json();
      console.log({ responseJSON });
      const { data, pagination } = responseJSON;
      setpostList(responseJSON?.data?.rows);
      setPagination({
        page: filters.page,
        pageSize: 9,
        count: data?.count,
      });
      console.log("pagination-----------------", { pagination });
    } catch (error) {
      console.log('Fail to fetch product list: ', error)
    }

  }


  function handlePageChange(newPage) {
    console.log('new page: ', newPage);
    setFilters({
      ...filters,
      _page: newPage,
    })
  }

  function handleSearchTermChange(newFilters) {
    console.log('new Filters: ', newFilters)
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    })
  }
  console.log()


  const filterd = postList.map(cc => {
    return cc
  })
  return (

    <div className="mt-20  " >
      <Header>
        <h2 className="text-center h-20 leading-80 my-auto le text-5xl bg-xanhla text-white  font-serif uppercase  clear-both  "> List Mentor</h2>
        <Search onSubmit={handleSearchTermChange} />
        <div className="mb-8 clear-right mt-28 " >
          <div className=" mx-auto  justify-center ">
            <ListProduct posts={filterd} />
          </div>
        </div>
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
        <Footer />
      </Header>
    </div>
  );
}

export default Mentor;