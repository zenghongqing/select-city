/**

 */
const getSearchList = (text, list) => {
  let reg1 = /^\w+$/g // 监测是否为字母
  let reg2 = new RegExp(`^${text}`, 'g') // 监测模板text
  let reg3 = new RegExp('^[\\u4E00-\\u9FFF]{1,}$', 'g') // 检测是否为汉字
  let resList = []
  // 当text为字母时
  if (text.match(reg1)) {
    for (let i = 0, len1 = list.length; i < len1; i++) {
      for (let j = 0, len2 = list[i][1].length; j < len2; j++) {
        if (list[i][1][j].pinyin.match(reg2)) {
          resList.push(list[i][1][j])
        }
      }
    }
  } else {
    for (let i = 0, len1 = list.length; i < len1; i++) {
      for (let j = 0, len2 = list[i][1].length; j < len2; j++) {
        if (list[i][1][j].name.match(reg3)) {
          resList.push(list[i][1][j])
        }
      }
    }
  }
  return resList
}
export default {
  getSearchList
}
