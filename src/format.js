const path  = require('node:path')
const fs  = require('node:fs')
const myUtil = require('../libs/util')

// 原始数据
let originJson = {}
;(function () { // 注意：自调用函数括号前一定要加一个分号
  let filePath = path.join(__dirname, '../dist/origin.json')
  let isExist = myUtil.isFileExist(filePath)
  if (!isExist) {
    return console.warn('origin.json原始数据文件不存在！')
  }

  let fileData = fs.readFileSync(filePath).toString()
  try {
    originJson = JSON.parse(fileData)
  } catch (error) {
    throw new Error(error)
  }
})()

// 格式化成 Array 数组数据
function fmtToArr() {
  let arr = []
  let tableHead = []
  let keys = Object.keys(originJson)
  console.log(keys.length)
  keys.map(i => {
    let val = originJson[i]

    if (i === '0') {
      tableHead = val
    } else {
      arr.push({
        '序号': i, // i 等于 0 为表头，不添加到数据里，所以这里不用 +1
        [tableHead[0]]: val[0], // 地名
        [tableHead[1]]: val[1], // 驻地
        [tableHead[2]]: val[2], // 人口
        [tableHead[3]]: val[3], // 面积
        [tableHead[4]]: val[4], // 行政区域代码
        [tableHead[5]]: val[5], // 区号
        [tableHead[6]]: val[6], // 邮编
      })
    }
  })

  // 写入处理好的数据
  fs.writeFileSync(path.join(__dirname, '../dist/arr.json'), JSON.stringify(arr, null, 2))
}

fmtToArr()