# nodejs 爬虫：用 playwright 爬取全国行政区域详细信息

## 构建说明

``` bash
# 安装依赖
yarn

# 爬取数据
yarn dev

# 格式化数据
yarn fmt
```

## 数据来源

1. 数据来源：http://xzqh.mca.gov.cn/
2. 获取数据：[playwright](https://playwright.dev/)
3. HTML解析：[cheerio](https://cheerio.js.org/)


无头浏览器即headless browser，是一种没有界面的浏览器，浏览器该有的东西它都应该有，只是看不到界面而已，playwright 可以通过配置 headless 来控制是否要真实显示界面。

## 额外信息

如果要获取一些其他的额外信息，传参需转码成 gbk，node 里可以利用 iconv-lite

```js
let query = `defaultQuery?shengji='${fmtGbk('北京市（京）')}'&diji=${fmtGbk('北京市')}&xianji=${fmtGbk('朝阳区')}`

const iconv = require('iconv-lite')
function fmtGbk(str) {
  if (!str) return ''
  return iconv.decode(str, 'GBK')
}
```

## 使用说明

数据来源网上公开信息，仅供学习交流使用