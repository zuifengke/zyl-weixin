import {Base} from '../../../utils/base.js';
class Index extends Base{
  constructor(){
    super();
  }
  getUserSetData(callback){
    var that=this;
    var param={
      url:'newlist',
      sCallback:function(data){
        callback&&callback(data);
      }
    }
    this.request(param);
  }
};
export{Index};