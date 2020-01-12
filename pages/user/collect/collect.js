import {
  Index
} from 'index-model.js';
var index = new Index();
var app = getApp()
page({

  data: {
    navbar: ['商品'],
    currentTab: 0
  },
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  onLoad: function(options) {
    this.id = options.id;
    this._loadData();
  },
  detail: function(event) {
    var id = event.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '../../detail/index?id=' + id,
    })
  },
  //商家
  seller: function(event) {
    var id = event.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '../../seller/index?id=' + id
    })
  },
  _loadData: function(callback) {
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    var uid = 1;
    index.getCollectData(uid, (data) => {
      wx.hideLoading(); //结束加载
      if (data != 1) {
        that.setData({
          CollectArr: data
        });
      }
      callback && callback();
    });
  },
  onPullDownRefresh: function() {
    this._loadData(() => {
      wx.stopPullDownRefresh()
    });
  },
  //分享效果
  onShareAppMessage: function() {
    return {
      title: "状元乐订房",
      path: 'pages/home/home'
    }
  }
})