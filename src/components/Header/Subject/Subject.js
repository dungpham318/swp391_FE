import queryString from 'query-string';
import { default as React, useEffect, useState } from "react";
import { ENDPOINT } from '../../../config';
import Footer from "../../Footer";
import Header from '../../Header';
import Pagination from "../../Pagination";
import ScrollToTop from '../../ScrollToTop';
import ListSubject from "./listSubject";
import Search from './Search';

function Subject() {



  const [postList, setpostList] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    count: 1,
  });
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 12,
    // title_like: '',
  })

  useEffect(() => {


    featchPostList();
  }, [filters]);

  async function featchPostList() {
    try {
      console.log(filters)
      const paramsString = queryString.stringify(filters);
      const requestURL = ENDPOINT + `api/subject/get_list?${paramsString}`;

      const response = await fetch(requestURL);
      const responseJSON = await response.json();
      console.log({ responseJSON });
      const { data, pagination } = responseJSON;
      setpostList(responseJSON?.data?.rows);
      setPagination({
        page: filters.page,
        pageSize: 12,
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
      page: newPage,
    })
  }

  function handleSearchTermChange(newFilters) {
    console.log('new Filters: ', newFilters)
    setFilters({
      ...filters,
      page: 1,
      title_like: newFilters.searchTerm,
    })
  }
  console.log()


  return (
    <div className="mt-20  ">
      <Header>
        <ScrollToTop />
        <h2 className="text-center h-20 leading-80 my-auto le text-5xl bg-xanhla text-white font-serif uppercase   clear-both  "> Subject table</h2>
        <Search onSubmit={handleSearchTermChange} />

        <div className="mb-8 clear-right mt-10  ">
          <table className="table-auto mx-auto ">
            <thead className=" mx-32 h-20 text-white">
              <tr className="mx-32 border-b-2">
                <th className="    mx-32"> <button className="font-bold bg-xanhla w-32  h-12">No. </button></th>

                <th className="    px-5 mx-32"> <button className="font-bold bg-xanhla w-32 h-12">Id</button></th>
                <th className="  w-550 "><button className="font-bold bg-xanhla w-full h-12  pl-4">Name</button></th>
                <th className="    px-5 mx-32"><button className="font-bold bg-xanhla w-32 h-12">Detail</button></th>
                <th className="    mx-32"><button className="font-bold bg-xanhla w-32 h-12">Actions</button></th>
              </tr>
            </thead>
            <tbody className="text-center h-16 ">
              <ListSubject posts={postList} pagination={pagination} />

            </tbody>
          </table>
          <hr className="mt-10 w-1/3 mx-auto border-2 border-xanhla"></hr>
        </div>
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
        <Footer />
      </Header>

    </div>

  );
}

export default Subject