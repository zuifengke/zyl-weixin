import {Base} from '../../../utils/base.js';
class Index extends Base{
  constructor(){
    super();
  }
  getNewListData(id,callback){
    var that=this;
    var param={
      url:'newlist/'+id,
      sCallback:function(data){
        callback&&callback(data);
      }
    };
    this.request(param);
  }
}