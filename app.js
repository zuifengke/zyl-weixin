//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var code;
    wx.login({
      success: res => {
        code = res.code;
            wx.getUserInfo({
              success: function (res) {
                wx.request({
                  url: 'https://www.zyldingfang.com/weixin/account/WxLogin',
                  data: { code: code, encryptedData: res.encryptedData,iv:res.iv },
                  method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                  header: {
                    'content-type': 'application/json'
                  },// 设置请求的 header
                  success: function (res) {
                    console.log(res)
                    console.log(res.data.openid)
                    
                    if (res.statusCode == 200) {
                    } else {
                      console.log("index.js wx.request CheckCallUser statusCode" + res.statusCode);
                    }
                  },
                  fail: function () {
                    console.log("index.js wx.request CheckCallUser fail");
                  },
                  complete: function () {
                    // complete
                  }
                })
               
              },
              fail: function (res) {
                console.log(res)
              }
            })
      }
    })
          },
  globalData: {
    userInfo: null
  }
})