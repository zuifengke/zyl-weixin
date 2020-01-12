import {
  Base
} from '../../utils/base.js';
class Index extends Base {
  constructor() {
    super();
  }
  getProductData(id, callback) {
    var that = this;
    var param = {
      url: 'product/' + id,
      sCallback: function(data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  getFavgoodData(id, callback) {
    var that = this;
    var param = {
      url: "favorite/get_one",
      type: 'post',
      data: {
        id: id
      },
      sCallback: function(data) {
        callback && callback(data);
      },
      eCallback: function(data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  getSCData(data, callback) {
    var that = this;
    var param = {
      url: 'favorite/add',
      type: 'post',
      data: data,
      sCallback: function(data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  getDeleteData(id, callback) {
    var that = this;
    var param = {
      url: 'favorite/del',
      type: 'post',
      data: {
        id: id
      },
      sCallback:function(data){
        callback&&callback(data);
      },
      eCallback:function(data){
        callback&&callback(data);
      }
    };
    this.request(param);
  }
  getCanTData(id,callback){
    var that=this;
    var param={
      url:'product/'+id+'/item',
      sCallback:function(data){
        callback && callback(data);
      }
    };
    this.request(param);
  }
};
export {Index};