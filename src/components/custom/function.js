export const convertDate = (day) => {
  let date = new Date(day)
  let time
  let dd = date.getUTCDate()
  if (dd < 10) {
    dd = '0' + dd
  }
  let mm = date.getUTCMonth() + 1
  if (mm < 10) {
    mm = '0' + mm
  }
  let yyyy = date.getUTCFullYear()
  return dd + '-' + mm + '-' + yyyy
}

export const convertDateTime = (day) => {
  if (!day || day === '') {
    return ''
  }
  let date = new Date(day)
  let dd = date.getUTCDate()
  if (dd < 10) {
    dd = '0' + dd
  }
  let mm = date.getUTCMonth() + 1
  if (mm < 10) {
    mm = '0' + mm
  }
  let yyyy = date.getUTCFullYear()
  let hh = date.getUTCHours()
  if (hh < 10) {
    hh = '0' + hh
  }
  let min = date.getUTCMinutes()
  if (min < 10) {
    min = '0' + min
  }
  let ss = date.getUTCSeconds()
  if (ss < 10) {
    ss = '0' + ss
  }
  return `${dd}-${mm}-${yyyy} ${hh}:${min}:${ss}`
}