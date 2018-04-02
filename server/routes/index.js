const router = require('koa-router')()
const http = require('http')
const cityList = require('../public/data/city')
module.exports = (app) => {
  // 获取城市列表
  router.get('/cityList', async (ctx, next) => {
    ctx.status = 200
    ctx.body = cityList
  })
  // 获取当前定位的城市
  router.get('/nowcity', async (ctx, next) => {
    ctx.status = 200
    ctx.body = await getIpInfo()
  })
  app.use(router.routes(), router.allowedMethods())
}
let getIpInfo = function () {
  var url = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json'
  return new Promise((resolve, reject) => {
    http.get(url, function (res) {
      var code = res.statusCode
      if (code === 200) {
        res.on('data', function (data) {
          try {
            resolve(JSON.parse(data))
          } catch (err) {
            console.log(err)
          }
        })
      }
    }).on('error', function (e) {
      console.log(e)
      resolve({
        city: '北京',
        country: '中国',
        province: '北京'
      })
    })
  })
}
