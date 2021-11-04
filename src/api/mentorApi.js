import { ENDPOINT } from '../config/index'

export async function getMentorAppointmentApi(input) {
  let url = `api/appointment/get_mentor_appointment?`
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
  if (input?.statusID) {
    url = url + 'statusID=' + input?.statusID + '&'
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

export async function getStatusList(input) {
  let url = `api/appointment/get_appointment_status_list?`

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

export async function updateAppointmentApi(input) {
  let url = `api/appointment/update?appointmentID=${input?.appointmentID}`

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

export async function createAppointmentApi(input) {
  let url = `api/appointment/create?`

  return fetch(ENDPOINT + url, {
    method: 'POST',
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