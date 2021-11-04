import React, { useEffect, useState } from 'react';
import BaseNav from './BaseNav';
import Table from '../../custom/Table'
import Card from '../../custom/Card'
import Header from '../../Header'
import {
  createAppointmentApi,
  getMentorAppointmentApi,
  getStatusList,
  updateAppointmentApi
} from '../../../api/mentorApi';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import Autocomplete from '@mui/material/Autocomplete'
import LoadingButton from '@mui/lab/LoadingButton'
import Modal from '../../custom/Modal'
import TimePicker from '@mui/lab/TimePicker'

import { convertDateTime } from '../../custom/function';
import { getSubjectListApi } from '../../../api/bookingApi';

const MentorDashboard = () => {

  const [fromDate, setFromDate] = useState(new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString())
  const [toDate, setToDate] = useState(new Date(new Date('2021-11-30').setUTCHours(0, 0, 0, 0)).toISOString())
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalItem, setTotalItem] = useState(0)
  const [appointmentData, setAppointmentData] = useState([])
  const [statusList, setStatusList] = useState([])
  const [selectedStatus, setSelectedStatus] = useState(0)

  const [subjectList, setSubjectList] = useState([])
  const [selectedSubject, setSelectedSubject] = useState(undefined)

  const [actionList, setActionList] = useState(['view', 'delete'])
  const [selectedAction, setSelectedAction] = useState(undefined)

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const [selectedAppointment, setSelectedAppointment] = useState(undefined)

  const [appointmentFromDate, setAppointmentFromDate] = useState(new Date())
  const [appointmentToDate, setAppointmentToDate] = useState(new Date())
  const [appointmentFromTime, setAppointmentFromTime] = useState(new Date())
  const [appointmentToTime, setAppointmentToTime] = useState(new Date())

  useEffect(() => {
    getMentorAppointment()
    onGetStatusList()
    getSubjectList()
  }, [])

  useEffect(() => {
    if (!isOpenModal) {
      setSelectedAction(undefined)
      setSelectedAppointment(undefined)
      getMentorAppointment()
    }
  }, [isOpenModal])

  useEffect(() => {
    getMentorAppointment()
  }, [page, pageSize, fromDate, toDate, selectedStatus, selectedSubject])

  const getMentorAppointment = async () => {
    await setAppointmentData([])
    let input = {
      statusID: selectedStatus,
      fromDate: fromDate,
      toDate: toDate,
      page: page,
      pageSize: pageSize
    }

    if (selectedSubject) {
      Object.assign(input, { subjectID: selectedSubject.id })
    }
    console.log(input)

    let res = await getMentorAppointmentApi(input)
    if (res?.data?.rows) {
      res.data.rows.map(item => {
        item.startTime = convertDateTime(item?.startTime)
        item.endTime = convertDateTime(item?.endTime)
        item.createdAt = convertDateTime(item?.createdAt)
        item.updatedAt = convertDateTime(item?.updatedAt)
      })
      setAppointmentData(res?.data?.rows)
      setTotalItem(res?.data?.count)
    }
  }

  const getSubjectList = async () => {
    await setSubjectList([])
    let input = {
      page: 1,
      pageSize: 1000,
      mentorID: parseInt(localStorage.getItem('id'))
    }

    let res = await getSubjectListApi(input)
    if (res && res?.data?.rows) {
      res.data.rows.map((item, index) =>
        item.label = item.name
      )
      setSubjectList(res?.data?.rows)
    }
  }

  const onGetStatusList = async () => {
    let res = await getStatusList()
    setStatusList(res?.data)
  }

  const updateAppointment = async (startTime, endTime, statusID, appointmentID) => {
    setLoading(true)
    console.log(selectedAppointment)
    let input = {}
    if (appointmentID && appointmentID !== '') {
      Object.assign(input, { appointmentID: appointmentID })
    } else {
      Object.assign(input, { appointmentID: selectedAppointment.id })
    }

    if (startTime && startTime !== '') {
      Object.assign(input, { startTime: startTime })
    }
    if (endTime && endTime !== '') {
      Object.assign(input, { endTime: endTime })
    }
    if (statusID && statusID !== '') {
      Object.assign(input, { statusID: statusID })
    }
    let res = await updateAppointmentApi(input)
    setLoading(false)

    if (res) {
      alert(res?.message)
      setIsOpenModal(false)
      setSelectedAppointment(undefined)
      getMentorAppointment()
    }
  }

  const createAppointment = async () => {
    let timeList = []
    if (new Date(appointmentFromDate).setHours(0, 0, 0, 0) > new Date(appointmentToDate).setHours(0, 0, 0, 0)) {
      alert('To Date must larger than From Date')
      return
    }
    let tmpFromDate = new Date(new Date(appointmentFromDate).setHours(0, 0, 0, 0))
    let tmpToDate = new Date(new Date(appointmentToDate).setHours(0, 0, 0, 0))
    let fromHour = new Date(appointmentFromTime).getHours()
    let fromMinute = new Date(appointmentFromTime).getMinutes()
    let toHour = new Date(appointmentToTime).getHours()
    let toMinute = new Date(appointmentToTime).getMinutes()

    let tmp = tmpToDate.getTime()

    while (true) {
      if (timeList.length === 0) {
        timeList.push({
          startTime: new Date(
            new Date(new Date(tmpToDate).getFullYear()),
            new Date(new Date(tmpToDate).getMonth()),
            new Date(new Date(tmpToDate).getDate()),
            fromHour + 7,
            fromMinute,
            0
          ).toISOString(),
          endTime: new Date(
            new Date(new Date(tmpToDate).getFullYear()),
            new Date(new Date(tmpToDate).getMonth()),
            new Date(new Date(tmpToDate).getDate()),
            toHour + 7,
            toMinute,
            0
          ).toISOString()
        })
      }
      tmp = tmp - 86400000
      if (tmp >= tmpFromDate.getTime()) {
        timeList.push({
          startTime: new Date(
            new Date(new Date(tmp).getFullYear()),
            new Date(new Date(tmp).getMonth()),
            new Date(new Date(tmp).getDate()),
            fromHour + 7,
            fromMinute,
            0
          ).toISOString(),
          endTime: new Date(
            new Date(new Date(tmp).getFullYear()),
            new Date(new Date(tmp).getMonth()),
            new Date(new Date(tmp).getDate()),
            toHour + 7,
            toMinute,
            0
          ).toISOString()
        })
      } else {
        break
      }
    }
    let resultList = []
    let isSuccess = true
    for (const item of timeList) {
      let tmp = await createAppointmentApi(item)
      resultList.push(tmp)
    }
    for (const item of resultList) {
      if (!item) {
        isSuccess = false
        setIsOpenModal(false)
      }
    }
    if (isSuccess) {
      alert('Create success')
      setIsOpenModal(false)
    }
  }

  return (
    <div className=''>
      {/* <BaseNav> */}
      <Header />

      <Card className='mt-28 mx-20'>
        <div className='flex flex-row mb-8'>
          <div className='flex flex-row flex-1'>
            <div className='pr-3'>
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
            <div className='pr-3'>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="To Date"
                  value={toDate}
                  onChange={(date) => {
                    setToDate(date);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className='w-64 pr-3'>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedStatus}
                  label="Status"
                  onChange={(e) => {
                    if (e.target.value === 2) {
                      setActionList(['view'])
                    } else {
                      setActionList(['view', 'edit', 'delete'])
                    }
                    setSelectedStatus(e.target.value)
                  }}
                >
                  {
                    statusList.map((item, index) => {
                      return <MenuItem value={item?.id}>{item?.name}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </div>
            <div className='w-64 pr-3'>
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
          </div>
          <div className='flex flex-row items-center justify-center'>
            <LoadingButton
              color="info"
              onClick={() => {
                setSelectedAction('create')
                setIsOpenModal(true)
              }}
              loadingPosition="start"
              variant="contained"
              style={{
                marginBottom: '1em',
                width: '10em',
                marginRight: '2em',
                alignSelf: 'flex-end'
              }}
            >
              Create
            </LoadingButton>
          </div>
        </div>
        <Table
          headers={[
            { id: 1, label: '#', value: 'index' },
            { id: 2, label: 'StartTime', value: 'startTime' },
            { id: 3, label: 'EndTime', value: 'endTime' },
            { id: 4, label: 'Status', value: 'statusName' },
            { id: 5, label: 'Created At', value: 'createdAt' },
            { id: 6, label: 'Updated At', value: 'updatedAt' },
          ]}
          rows={appointmentData}
          pagination
          onChangePage={(page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          }}
          totalItem={totalItem}
          actionList={actionList}
          onClickView={(item) => {
            item.students = ''
            console.log(item.students)
            if (item?.studentList && item?.studentList.length > 0) {
              item.studentList.map((ele => {
                item.students = item.students + ele?.email + ', '
              }))
            }
            console.log(item.students)

            setSelectedAction('view')
            setIsOpenModal(true)
            setSelectedAppointment(item)
          }}
          onClickEdit={(item) => {
            setSelectedAction('edit')
            setIsOpenModal(true)
            setSelectedAppointment(item)

          }}
          onClickDelete={async (item) => {
            await setSelectedAppointment(item)
            console.log(selectedAppointment)
            if (window.confirm('Do you want to delete appointment')) {
              updateAppointment('', '', 5, item?.id)
            }
            else {

            }
          }}
        />
      </Card>

      <Modal isOpen={isOpenModal}>
        {
          selectedAction === 'view' &&
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
                  value={selectedAppointment?.startTime}
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
                  value={selectedAppointment?.endTime}
                />
                <div className='mt-6'>
                  <TextField
                    required
                    disabled
                    id="outlined-basic"
                    label="Subject"
                    variant="outlined"
                    style={{
                      width: '100%'
                    }}
                    value={selectedAppointment?.subjectName}
                  />
                </div>
                <div className='mt-6'>
                  <TextField
                    required
                    disabled
                    id="outlined-basic"
                    label="Subject"
                    variant="outlined"
                    style={{
                      width: '100%'
                    }}
                    value={selectedAppointment?.students}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-row justify-end'>
              <LoadingButton
                color="inherit"
                onClick={() => {
                  setIsOpenModal(false)
                }}
                loading={loading}
                loadingPosition="start"
                variant="contained"
                style={{
                  marginBottom: '1em',
                  width: '10em',
                  marginRight: '1em'
                }}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                color="error"
                onClick={() => {
                  updateAppointment('', '', 4)
                }}
                loading={loading}
                loadingPosition="start"
                variant="contained"
                style={{
                  marginBottom: '1em',
                  width: '10em',
                  marginRight: '1em'
                }}
              >
                Reject
              </LoadingButton>
              <LoadingButton
                color="info"
                onClick={() => {
                  // booking()
                  updateAppointment('', '', 3)
                }}
                loading={loading}
                loadingPosition="start"
                variant="contained"
                style={{
                  marginBottom: '1em',
                  width: '10em'
                }}
              >
                Approve
              </LoadingButton>
            </div>
          </div>
        }

        {
          selectedAction === 'create' &&
          <div className='flex flex-col flex-1 h-full'>
            <div className='flex flex-col flex-1'>
              <div className='flex flex-row'>
                <div className='pl-4 flex flex-1'>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Start Date"
                      value={appointmentFromDate}
                      onChange={(date) => {
                        setAppointmentFromDate(date);
                      }}
                      style={{
                        width: '100%'
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
                <div className='pl-4 flex flex-1'>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="End Date"
                      value={appointmentToDate}
                      onChange={(date) => {
                        setAppointmentToDate(date);
                      }}
                      style={{
                        width: '100%'
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </div>

              <div className='flex flex-row mt-6 flex-1'>
                <div className='pl-4 flex flex-1'>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="Start Date"
                      value={appointmentFromTime}
                      onChange={(time) => {
                        console.log(time)
                        setAppointmentFromTime(time);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
                <div className='ml-4 flex flex-1'>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="End Time"
                      value={appointmentToTime}
                      onChange={(time) => {
                        setAppointmentToTime(time);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </div>

            </div>
            <div className='flex flex-row justify-end'>
              <LoadingButton
                color="inherit"
                onClick={() => {
                  setIsOpenModal(false)
                }}
                loading={loading}
                loadingPosition="start"
                variant="contained"
                style={{
                  marginBottom: '1em',
                  width: '10em',
                  marginRight: '1em'
                }}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                color="info"
                onClick={() => {
                  // booking()
                  createAppointment()
                }}
                loading={loading}
                loadingPosition="start"
                variant="contained"
                style={{
                  marginBottom: '1em',
                  width: '10em'
                }}
              >
                Create
              </LoadingButton>
            </div>
          </div>
        }



      </Modal>

      {/* </BaseNav> */}

    </div>


  )

}

export default MentorDashboard