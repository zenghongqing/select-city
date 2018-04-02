/**

 */
const getDistance = (arr) => {
  let titleHeight = 30
  let itemHeight = 35
  let distanceArr = []
  arr.map(item => {
    distanceArr.push(titleHeight + itemHeight * item[1].length)
  })
  return distanceArr
}
const handleDomData = (el, name, val) => {
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}
const getIndex = (arr, item) => {
  for (let i = 0, len = arr.length; i < len; i++) {
    if (item === arr[i]) {
      return i
    }
  }
}
export default {
  getDistance,
  handleDomData,
  getIndex
}
