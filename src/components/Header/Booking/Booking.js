import React, { useEffect, useState } from 'react';
import Table from '../../custom/Table'
import Card from '../../custom/Card'
import Header from '../../Header'
import {
  getMentorAppointmentApi,
  getStatusList
} from '../../../api/mentorApi';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import { convertDateTime } from '../../custom/function';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete'
import OutlinedInput from '@mui/material/OutlinedInput';
import Modal from '../../custom/Modal'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useLocation } from 'react-router-dom'

import {
  getUserListApi,
  getSubjectListApi,
  searchAvailableAppointmentApi,
  bookingApi
} from '../../../api/bookingApi';

const Booking = () => {
  let location = useLocation()
  const [loading, setLoading] = useState(false)

  const [fromDate, setFromDate] = useState(new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString())
  const [toDate, setToDate] = useState(new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString())
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalItem, setTotalItem] = useState(0)

  const [mentorList, setMentorList] = useState([])
  const [subjectList, setSubjectList] = useState([])
  const [appointmentList, setAppointmentList] = useState([])

  const [selectedMentor, setSelectedMentor] = useState(location?.state?.name ? location?.state?.name : undefined)
  const [selectedSubject, setSelectedSubject] = useState(location?.state?.subject ? location?.state?.subject : undefined)
  const [selectedAppointment, setSelectedAppointment] = useState(undefined)

  const [studentList, setStudentList] = useState([])
  const [selectedStudent, setSelectedStudent] = useState([])

  const [isOpenModal, setIsOpenModal] = useState(false)

  useEffect(() => {
    let tmp = async () => {
      await getMentorList()
      await getSubjectList()
      if (location?.state?.subject) {
        location.state.subject.label = location?.state?.subject?.name
        setSelectedSubject(location?.state?.subject)
      }
      if (location?.state?.name) {
        console.log(775555, location.state.name)
        location.state.name.label = location?.state?.name?.fullName
        setSelectedMentor(location?.state?.name)
      }
    }
    tmp()
  }, [])

  useEffect(() => {
    getAvailableAppointment()
  }, [page, pageSize])

  useEffect(() => {
    getSubjectList()
  }, [selectedMentor])

  useEffect(() => {
    getMentorList()
  }, [selectedSubject])


  const getMentorList = async () => {
    setLoading(true)
    let res = await getUserListApi({
      page: 1,
      pageSize: 1000,
      roleID: 2
    })
    setLoading(false)
    if (res && res?.data?.rows) {
      res.data.rows.map((item, index) =>
        item.label = item.fullName
      )
      setMentorList(res?.data?.rows)
    }
  }

  const getStudentList = async () => {
    setLoading(true)
    let res = await getUserListApi({
      page: 1,
      pageSize: 1000,
      roleID: 1
    })
    setLoading(false)
    if (res && res?.data?.rows) {
      res.data.rows.map((item, index) =>
        item.label = item.fullName
      )
      setStudentList(res?.data?.rows)
    }
  }

  const getSubjectList = async () => {
    await setSubjectList([])
    setLoading(true)
    let input = {
      page: 1,
      pageSize: 1000,
    }
    if (selectedMentor) {
      Object.assign(input, { mentorID: selectedMentor.id })
    }

    console.log(9999, input)
    let res = await getSubjectListApi(input)
    setLoading(false)
    console.log(123, res)
    if (res && res?.data?.rows) {
      res.data.rows.map((item, index) =>
        item.label = item.name
      )
      setSubjectList(res?.data?.rows)
    }
  }

  const getAvailableAppointment = async () => {
    setLoading(true)
    let res = await searchAvailableAppointmentApi({
      fromDate: fromDate,
      toDate: toDate,
      page: page,
      pageSize: pageSize,
      mentorID: selectedMentor?.id
    })
    setLoading(false)
    if (res && res?.data?.rows) {
      res.data.rows.map((item, index) => {
        item.fromTime = convertDateTime(item.startTime)
        item.toTime = convertDateTime(item.endTime)
      })
      setAppointmentList(res?.data?.rows)
      setTotalItem(res?.data?.count)
    }
  }

  const booking = async () => {
    console.log(selectedStudent)
    if (selectedSubject === undefined) {
      alert('Please select subject')
    } else if (selectedStudent.length === 0) {
      alert('Please select student')
    } else {
      setLoading(true)
      let studentIDList = []
      for (const item of selectedStudent) {
        studentIDList.push(item?.id)
      }
      let res = await bookingApi({
        "appointmentID": selectedAppointment?.id,
        "subjectID": selectedSubject?.id,
        "studentID": studentIDList
      })
      setLoading(false)
      if (res) {
        alert(res.message)
        setIsOpenModal(false)
        getAvailableAppointment()
      }
    }

  }


  return (
    <div className=''>
      <Header />
      <Card className='mt-28 mx-96 flex-col items-center justify-center'>
        <div className={'flex flex-col items-center'}>
          <p className='pb-6 text-3xl'>Booking</p>
          <div className='pb-6 w-80' style={{
            width: '30em'
          }}>
            <Autocomplete
              value={selectedMentor}
              onChange={(event, newValue) => {
                console.log(8435734857438, newValue)

                setSelectedMentor(newValue);
              }}
              // inputValue={inputValue}
              // onInputChange={(event, newInputValue) => {
              //   setInputValue(newInputValue);
              // }}
              disablePortal
              id="combo-box-demo"
              options={mentorList}
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} label="Mentor" />}
            />
          </div>

          <div className='pb-6' style={{
            width: '30em'
          }}>
            <Autocomplete
              value={selectedSubject}
              onChange={(event, newValue) => {
                setSelectedSubject(newValue);
              }}
              // inputValue={inputValue}
              // onInputChange={(event, newInputValue) => {
              //   setInputValue(newInputValue);
              // }}
              disablePortal
              id="combo-box-demo"
              options={subjectList}
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} label="Subject" />}
            />
          </div>

          <div className='flex flex-row'>
            <div className='pr-4 pb-6 justify-self-center'>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label=" From Date"
                  value={fromDate}
                  onChange={(date) => {
                    setFromDate(date);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className='pb-6'>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="To Date"
                  value={toDate}
                  onChange={(date) => {
                    date = new Date(new Date(date).setHours(23, 59, 59))
                    console.log(date)
                    if (new Date(date).getTime() - new Date(fromDate).getTime() < 0) {
                      alert('To Date must be larger than From Date')
                    } else {
                      setToDate(date);
                    }
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </div>
          <LoadingButton
            color="primary"
            onClick={() => {
              getAvailableAppointment()
            }}
            loading={loading}
            loadingPosition="start"
            startIcon={<SearchIcon />}
            variant="contained"
            style={{
              width: '35em',
              marginBottom: '1em'
            }}
          >
            Search
          </LoadingButton>
        </div>
      </Card>
      <Card className='my-8 mx-96 '>
        <Table
          headers={[
            { id: 1, label: '#', value: 'index' },
            { id: 2, label: 'Mentor Name', value: 'mentorName' },
            { id: 3, label: 'Mentor Email', value: 'mentorEmail' },
            { id: 4, label: 'From Time', value: 'fromTime' },
            { id: 5, label: 'To Time', value: 'toTime' },
          ]}
          rows={appointmentList}
          pagination
          onChangePage={(page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          }}
          totalItem={totalItem}
          onClickBooking={(item) => {
            setIsOpenModal(true)
            getStudentList()
            let mentor = mentorList.find(ele => ele?.id === item?.mentorID)
            setSelectedMentor(mentor)
            setSelectedAppointment(item)
          }}
          actionList={[
            'booking'
            // 'view',
            // 'edit',
            // 'delete',
          ]}
        />
      </Card>

      <Modal isOpen={isOpenModal}>
        <div className='flex flex-col flex-1 h-full'>
          <div className='flex flex-col flex-1'>
            <div className=''>
              <TextField
                required
                disabled
                id="outlined-basic"
                label="Mentor Name"
                variant="outlined"
                style={{
                  width: '100%'
                }}
                value={selectedAppointment?.mentorName}
              />
            </div>
            <div className='mt-6'>
              <TextField
                required
                disabled
                id="outlined-basic"
                label="Mentor Email"
                variant="outlined"
                style={{
                  width: '100%'
                }}
                value={selectedAppointment?.mentorEmail}
              />
            </div>
            <div className='mt-6'>
              <TextField
                required
                disabled
                id="outlined-basic"
                label="From Time"
                variant="outlined"
                style={{
                  width: '100%'
                }}
                value={selectedAppointment?.fromTime}
              />
            </div>
            <div className='mt-6'>
              <TextField
                required
                disabled
                id="outlined-basic"
                label="To Time"
                variant="outlined"
                style={{
                  width: '100%'
                }}
                value={selectedAppointment?.toTime}
              />
            </div>
            <div className='mt-6'>
              <Autocomplete
                value={selectedSubject}
                onChange={(event, newValue) => {
                  setSelectedSubject(newValue);
                }}
                // inputValue={inputValue}
                // onInputChange={(event, newInputValue) => {
                //   setInputValue(newInputValue);
                // }}
                disablePortal
                id="combo-box-demo"
                options={subjectList}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Subject" />}
              />
            </div>
            <div className='mt-6'>
              <Autocomplete
                value={selectedStudent}
                onChange={(event, newValue) => {
                  setSelectedStudent(newValue);
                }}
                multiple
                // inputValue={inputValue}
                // onInputChange={(event, newInputValue) => {
                //   setInputValue(newInputValue);
                // }}
                disablePortal
                id="combo-box-demo"
                options={studentList}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Student" />}
              />
            </div>
          </div>
          <div className='flex flex-row justify-end'>
            <LoadingButton
              color="error"
              onClick={() => {
                setIsOpenModal(false)
              }}
              loading={loading}
              loadingPosition="start"
              variant="contained"
              style={{
                marginBottom: '1em',
                width: '10em',
                marginRight: '2em'
              }}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              color="info"
              onClick={() => {
                booking()
              }}
              loading={loading}
              loadingPosition="start"
              variant="contained"
              style={{
                marginBottom: '1em',
                width: '10em'
              }}
            >
              Submit
            </LoadingButton>
          </div>
        </div>
      </Modal>

    </div>


  )

}

export default Booking