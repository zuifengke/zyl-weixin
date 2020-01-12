import {
  Index
} from 'index-model.js';
var index = new Index(); //实例化 首页对象

var address = require('../../utils/city.js');
var animation;
Page({
  data: {
    menuType: 0,
    begin: null,
    status: 1,
    end: null,
    isVisible: false,
    animationData: {},
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    areas: [],
    province: '',
    city: '',
    area: ''
  },
  onLoad: function(options) {
    //初始化动画变量
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    this.animation = animation;
    var id = address.provinces[0].id;
    this.setData({
      provinces: address.provinces,
      citys: address.citys[id],
      areas: address.areas[address.citys[id][0].id],
    })
  },
  formSubmit: function(e) {
    var t = e.detail.value;
    var name = t['name'];
    var mobile = t['mobile'];
    var province = t['province'];
    var city = t['city'];
    var country = t['country'];
    var detail = t['detail'];
    var data = {
      name: name,
      mobile: mobile,
      province: province,
      city: city,
      country: country,
      detail: detail
    }
    //获取地址
    index.getAddressData(data, (data) => {
      if (data.code == 201) {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000, //多少毫秒后消失
        });
        setTimeout(function() {
          wx.navigateBack({
            delta: 2
          });
        }, 2000);
      } else {
        var e_title = "地址填写格式有误";
        if (data.msg.mobile != null) {
          e_title = data.msg.mobile;
        }
        if (data.msg.city != null) {
          e_title = data.msg.city;
        }
        //提示失败
        wx.showToast({
          title: e_title,
          icon: 'none',
          duration: 2000
        })
      }
    });
  },
  hideMenuTap: function(e) {
    this.startAnimation(false,-200);
  },
  startAnimation:function(isShow,offset){
    var that=this;
    var offsetTem;
    if(offset==0){
      offsetTem=offset;
    }else{
      offsetTem=offset+'rpx';
    }
    this.animation.translateY(offset).step();
    this.setData({
      animationData:this.animation.export(),
      isVisible:isShow
    })
    console.log(that.data);
  },
  sureDateTap:function(){
    this.data.pageNo=1;
    this.startAnimation(false,-200);
  },
  selectDistrict:function(e){
    var that=this;
    if(that.data.addressMenuIsShow){
      return;
    }
    that.startAddressAnimation(true);
  },
  startAddressAnimation:function(isShow){
    console.log(isShow);
    var that=this;
    if(isShow){
      that.animation.translateY(0+'vh').step();
      
    }else{
      that.animation.translateY(40+'vh').step();
    }
    that.setData({
      animationAddressMenu:that.animation.export(),
      addressMenuIsShow:isShow,
    })
  },
  cityCancel:function(e){
    this.startAddressAnimation(false);
  },
  citySure:function(e){
    var that=this;
    var city=that.data.city;
    var value=that.data.value;
    that.startAddressAnimation(false);
    //将选择的城市信息显示到输入框
    var areaInfo1=that.data.provinces[value[0]].name;
    var areaInfo2=that.data.citys[value[1]].name;
    var areaInfo3=that.data.areas[value[2]].name;
    that.setData({
      areaInfo1:areaInfo1,
      areaInfo2:areaInfo2,
      areaInfo3:areaInfo3,
    });

  },
  hideCitySelected:function(e){
    console.log(e);
    this.startAddressAnimation(false);
  },
  cityChange:function(e){
    console.log(e);
    var value=e.detail.value;
    var provinces=this.data.provinces;
    var citys=this.data.citys;
    var areas=this.data.areas;
    var provinceNum=value[0];
    var cityNum=value[1];
    var countyNum=value[2];
    if(this.data.value[0]!=provinceNum){
      var id=provinces[provinceNum].id;
      this.setData({
        value:[provinceNum,0,0],
        citys:address.citys[id],
        areas:address.areas[address.citys[id][0].id]
      })
    }else if(this.data.value[1]!=cityNum){
      var id=citys[cityNum].id;
      this.setData({
        value:[provinceNum,cityNum,0],
        areas:address.areas[citys[cityNum].id],
      })
    }else{
      this.setData({
        value:[provinceNum,cityNum,countyNum]
      })
    }
    console.log(this.data);
  }
})