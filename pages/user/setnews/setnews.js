import { Index } from 'index-model.js';
var index = new Index(); //实例化 首页 对象 
Page({
  data:{

  },
  onLoad:function(options){
    this.id=options.id;
    this._loadData();
  },
  _loadData:function(callback){
    wx.showLoading({
      title: '加载中',
    });
    var that=this;//为了避免多个this冲突
    index.getNewlistData(that.id,(data)=>{
      wx.hideLoading();//结束加载
      that.setData({
        UserSetArr:data,
      })
    });
  }
})