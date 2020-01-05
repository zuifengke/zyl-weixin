import {Index} from 'index-model.js';
var index=new Index();//实例化 首页对象
Page({
  data:{

  },
  onLoad:function(options){
    this.id=options.id;
    this._loadData();
  },
  //新闻页面
  newlist:function(event){
    var id=event.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '../setnews/setnews?id='+id
    })
  },
  _loadData:function(callback){
    wx.showLoading({
      title: '加载中',
    });
    var that=this;//为了避免多个this冲突
    //set页面
    index.getUserSetData((data)=>{
      wx.hideLoading();//结束加载
      that.setData({
        UserSetArr:data,
      });
    });
  }
})