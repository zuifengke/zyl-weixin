import {
  Index
} from 'index-model.js';
var index = new Index(); //实例化 首页 对象 
Page({
  data: {
    is_hidden: true
  },
  onLoad:function(options){
    this.id=options.id;
    if(options.show>0){
      this.setData({
        is_hidden:true
      });
    }
    this._loadData();
  },
  home:function(event){
    wx.switchTab({
      url:'../home/home'
    })
  },
  category:function(event){
    var id=event.currentTarget.dataset['id'];
    wx.navigateTo({
      url: './index?show=1&id='+id
    });
  },
  detail:function (event){
    var id=event.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '../detail/index?id='+id,
    })
  },
  _loadData:function(callback){
    //加载中
    wx.showLoading({
      title: '加载中',
    });
    var that=this;//为了避免多个this冲突
    //顶级分类
    var is_category=wx.getStorageSync("category");
    if(is_category){
      that.setData({
        CategoryArr:is_category,
      });
    }else{
      index.getCategoryData((data)=>{
        wx.setStorageSync("cate", data);
        that.setData({
          CategoryArr:data
        })
      });
    }
    //商品信息
    index.getProductData(that.id,(data)=>{
      that.setData({
        HomePArr:data,
      });
    });
    index.getCategoryMData(this.id,(data)=>{
      wx.hideLoading();//结束加载
      that.setData({
        CategoryMArr:data,
      });
      callback && callback();
    });
  },
  /**下拉刷新页面 */
  onPullDownRefresh:function(){
    this._loadData(()=>{
      wx.stopPullDownRefresh();
    });
  },
  //状元乐分享
  onShareAppMessage: function () {
    return {
      title: '状元乐拼房',
      path: 'pages/home/home'
    }
  }
})