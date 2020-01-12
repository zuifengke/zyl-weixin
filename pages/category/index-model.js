
import { Base } from '../../utils/base.js';

class Index extends Base {
  constructor() {
    super();
  }
  //分类导航
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
  //分类信息
  getCategoryMData(cid, callback) {
    var param = {
      url: 'category/cid/' + cid,

      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  //商品信息
  getProductData(id, callback) {

    var that = this;
    var param = {
      url: 'category/' + id + '/products',

      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
};

export { Index };