import {
  Index
} from 'index-model.js'
var index = new Index(); //实例化首页对象
Page({
  /**
   * 页面初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoPlay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.id = options.id;
    this._loadData();
  },
  home: function(event) {
    wx.switchTab({
      url: '../home/home',
    })
  },
  //跳转到分类
  category: function(event) {
    var id = event.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '../category/index?id=' + id
    })
  }, //商品
  detail: function(event) {
    var id = event.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '../detail/index?id=' + id
    })
  },
  _loadData: function(callback) {
    //加载中
    wx.showLoading({
      title: '加载中',
    });
    var that = this; //为了避免多个this冲突
    index.getBannerData((data) => {
      that.setData({
        bannerArr: data
      });
    });
    /*商品分类 */
    var is_category = wx.getStorageSync("category");
    if (is_category) {
      that.setData({
        CategoryArr: is_category
      })
    } else {
      index.getCategoryData((data) => {
        wx.setStorageSync("category", data);
        that.setData({
          CategoryArr: data
        });
      });
    }
    /**获取热销商品 */
    index.getHomeData((data) => {
      wx.hideLoading(); //结束加载
      if (data != 0) {
        that.setData({
          HomePArr: data
        });
        callback && callback();
      }
    });
  },
  onPullDownRefresh: function() {
    this._loadData(() => {
      wx.stopPullDownRefresh();
    });
  },
  onShareAppMessage:function(){
    return{
      title:'状元乐拼团',
      path:'pages/home/home'
    }
  }
})