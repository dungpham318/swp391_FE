import { ENDPOINT } from '../config/index'

export async function getUserListApi(input) {
  let url = `api/user/get_list?`
  if (input?.page) {
    url = url + 'page=' + input?.page + '&'
  }
  if (input?.pageSize) {
    url = url + 'pageSize=' + input?.pageSize + '&'
  }
  if (input?.roleID) {
    url = url + 'roleID=' + input?.roleID + '&'
  }

  return fetch(ENDPOINT + url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('user-token')
    },
  })
    .then((response) => {
      return response.json();
    })
    .then(data => {
      if (data?.resultCode === -1) {
        alert(data.message)
        return false
      } else {
        return data
      }
    })
    .catch((error) => {
      console.log(error)
      return false
    });
}

export async function getSubjectListApi(input) {
  let url = `api/subject/get_list?`
  if (input?.page) {
    url = url + 'page=' + input?.page + '&'
  }
  if (input?.pageSize) {
    url = url + 'pageSize=' + input?.pageSize + '&'
  }
  if (input?.mentorID) {
    url = url + 'mentorID=' + input?.mentorID + '&'
  }

  return fetch(ENDPOINT + url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('user-token')
    },
  })
    .then((response) => {
      return response.json();
    })
    .then(data => {
      if (data?.resultCode === -1) {
        alert(data.message)
        return false
      } else {
        return data
      }
    })
    .catch((error) => {
      console.log(error)
      return false
    });
}

export async function searchAvailableAppointmentApi(input) {
  let url = `api/appointment/search_available_appointment?`

  if (input?.fromDate) {
    url = url + 'fromDate=' + input?.fromDate + '&'
  }

  if (input?.toDate) {
    url = url + 'toDate=' + input?.toDate + '&'
  }

  if (input?.page) {
    url = url + 'page=' + input?.page + '&'
  }

  if (input?.pageSize) {
    url = url + 'pageSize=' + input?.pageSize + '&'
  }

  if (input?.appointmentID) {
    url = url + 'appointmentID=' + input?.appointmentID + '&'
  }

  if (input?.mentorID) {
    url = url + 'mentorID=' + input?.mentorID + '&'
  }

  if (input?.statusID) {
    url = url + 'statusID=' + input?.statusID + '&'
  }

  if (input?.subjectID) {
    url = url + 'subjectID=' + input?.subjectID + '&'
  }

  return fetch(ENDPOINT + url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('user-token')
    },
  })
    .then((response) => {
      return response.json();
    })
    .then(data => {
      if (data?.resultCode === -1) {
        alert(data.message)
        return false
      } else {
        return data
      }
    })
    .catch((error) => {
      console.log(error)
      return false
    });
}

export async function bookingApi(input) {
  let url = `api/appointment/booking?appointmentID=${input?.appointmentID}`

  return fetch(ENDPOINT + url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('user-token')
    },
    body: JSON.stringify(input)
  })
    .then((response) => {
      return response.json();
    })
    .then(data => {
      if (data?.resultCode === -1) {
        alert(data.message)
        return false
      } else {
        return data
      }
    })
    .catch((error) => {
      console.log(error)
      return false
    });
}