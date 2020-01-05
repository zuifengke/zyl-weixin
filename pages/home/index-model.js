import {Base} from '../../utils/base.js'
class Index extends Base{
  constructor(){
    super();
  }
  getBannerData(callBack){
    var that=this;
    var param={
      url:'banner/1',
      sCallback:function(data){
        callback&&callback(data);
      }
    };
    this.request(param);
  }
  /*首页商品信息*/
  getHomeData(callback) {

    var that = this;
    var param = {
      url: 'recent',
      data: { type: 'hot' },
      sCallback: function (data) {
        callback && callback(data);
      },
      eCallback: function (data) {
        callback && callback(0);
      }
    };
    this.request(param);
  } 
  /*分类信息*/
  getCategoryData(callback) {

    var that = this;
    var param = {
      url: 'category/1',

      sCallback: function (data) {

        callback && callback(data);
      }
    };
    this.request(param);
  }

}
export{Index};