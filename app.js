//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    wx.login({
      success: res => {
        //发起网络请求
        wx.request({
          //这是我自己的java服务器的接口，将login（）获得的code发送的服务器换取session_key
          url: 'https://abc.anzhonghui.xyz/WxtestServlet/UserController?method=getUnionId',
          data: {
            js_code: res.code,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'GET',
          success: function (res) {
            console.log(res.data.session_key)
            //拿到session_key实例化WXBizDataCrypt（）这个函数在下面解密用
            var pc = new WXBizDataCrypt(appId, res.data.session_key)
            wx.getUserInfo({
              success: function (res) {
                //拿到getUserInfo（）取得的res.encryptedData, res.iv，调用decryptData（）解密
                var data = pc.decryptData(res.encryptedData, res.iv)
                // data.unionId就是咱们要的东西了
                app.globalData.unionid = data.unionId
                console.log('解密后 unionid: ', app.globalData.unionid)
              },
              fail: function (res) {
                console.log(res)
              }
            })
          },
          fail: function (res) { },
          complete: function (res) { }
        });
      }
    })
  },
  globalData: {
    userInfo: null
  }
})