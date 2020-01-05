page({
  data:{
    historyp:[
      { "id": 1, "name":"超值多种肉肉植物套餐肉肉植物套肉肉","price":"10.00","img_url":"1.jpg"},
      {"id":2,"name":"精选6棵多肉植物","price":"1.00","img_url":"2.jpg"},
      {"id":3,"name":"高端多肉植物","price":"101.00","img_url":"3.jpg"}
    ]
  },
  detail:function(event){
    wx.navigateTo({
      url: '../detail/index',
    })
  }
})