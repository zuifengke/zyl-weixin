
import { Base } from '../../../utils/base.js';

class Index extends Base {
  constructor() {
    super();
  }
  //设置默认地址
  setAddressDefault(id, callback) {
    var param = {
      url: 'address/set_default',
      type: 'post',
      data: { id: id },
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  //获取所有地址信息
  getAddressAllData(callback) {
    var param = {
      url: 'address/all',
      type: 'post',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  //删除地址
  getDeleteData(id, callback) {
    var that = this;
    var param = {
      url: 'address/del',
      type: 'post',
      data: { id: id },
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

};

export { Index };