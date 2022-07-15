const { chromium } = require('@playwright/test')
const path  = require('node:path')

const main = async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 })

  const page = await browser.newPage();

  // 进入网页
  await page.goto('https://www.baidu.com')

  // path 文件保存路径
  await page.screenshot({ path: path.format({
    dir: path.join(__dirname),
    name: 'screenshot',
    ext: '.png'
  }), fullPage: true  })

  // 关闭浏览器
  browser.close()
  // await page.locator('.handle-button-wrap').click()
}

main()