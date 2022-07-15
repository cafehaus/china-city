const path  = require('node:path')
const fs  = require('node:fs')
const { chromium } = require('@playwright/test')
const cheerio = require('cheerio')
const myUtil = require('../libs/util')

const main = async () => {
  // 初始化浏览器和 Tab 页面
  const browser = await chromium.launch({
    headless: true, // true-无头浏览器 false-可以真实看到浏览器界面
  })
  const page = await browser.newPage()

  // 打开网页
  await page.goto('http://xzqh.mca.gov.cn/defaultQuery')
  const HTML = await page.locator('.info_table tbody').innerHTML()

  // 解析 html
  let $ = cheerio.load(HTML, {
    ignoreWhitespace: true,
    xmlMode: true
  })

  let info = {}
  $('tr').each((index, element) => {
    // 表头单元格是 th 标签
    let td = index === 0 ? 'th' :'td'

    $(element).find(td).each((i, e) => {
      if (!info[index]) info[index] = []

      // 去掉 \n \t 空白字符
      let txt = $(e).text().replace(/[\\n\\t\s]/g, '')
      info[index].push(txt)
    })
  })

  // dist 目录不存在就新建一个
  let distDir = path.join(__dirname, '../dist')
  if (!myUtil.isDirExist(distDir)) {
    fs.mkdirSync(distDir)
  }

  // 写入原始数据
  fs.writeFileSync(path.join(__dirname, '../dist/origin.html'), HTML)
  fs.writeFileSync(path.join(__dirname, '../dist/origin.json'), JSON.stringify(info, null, 2))

  // 关闭浏览器
  browser.close()
}

main()