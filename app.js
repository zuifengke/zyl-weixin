//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var code;
    wx.login({
      success: res => {
        code = res.code;
        wx.request({
          url: 'https://www.zyldingfang.com/weixin/account/OnLogin',
          data:{code,code},
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/json'
          },// 设置请求的 header
          success: function (res) {
            console.log(res)
            if (res.data.msg == 'OK') {
              console.log(res.data.sessionId)
              //缓存sessionId
              wx.setStorageSync('sessionId', res.data.sessionId);//保存Cookie到Storage
            } else {
              console.log(res.data.msg);
            }
          },
          fail: function () {
            console.log("index.js wx.request CheckCallUser fail");
          },
          complete: function () {
            // complete
          }
        })
        let sessionId = wx.getStorageSync('sessionId');
        if(sessionId)
        {
          
        console.log('sessionId:'+sessionId)
            wx.getUserInfo({
              success: function (res) {
                console.log(res)
                wx.request({
                  url: 'https://www.zyldingfang.com/weixin/account/DecodeEncryptedData',
                  data: {type:'USERINFO', sessionId: sessionId, encryptedData: res.encryptedData,iv:res.iv },
                  method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                  header: {
                    'content-type': 'application/json'
                  },// 设置请求的 header
                  success: function (res) {
                    console.log(res)
                    console.log(res.data.openid)
                    
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
      }
    })
          },
  globalData: {
    userInfo: null
  }
})