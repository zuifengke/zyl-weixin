import {
  Base
} from '../../utils/base.js';
class Index extends Base {
  constructor() {
    super();
  }
  getAddressData(data, callbak) {
    var that = this;
    var param = {
      url: 'address',
      type: 'post',
      data: data,
      sCallback: function(data) {
        callback && callback(data);
      },
      eCallback: function(data) {
        callbak && callbak(data);
      }
    };
    this.request(param);
  }
};
export {
  Index
};