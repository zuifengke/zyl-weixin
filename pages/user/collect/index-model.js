/**
 * 如花拼团开源系统 -- 永久免费
 * ===============================================
 * 官方网址：http://www.phps.shop
 * 作者：光爵【API + 后台】 、 小草【小程序 + WAP】
 * QQ 交流群：728615087
 * Version：1.0.0
 */
import {Base} from
'../../../utils/base.js';

class Index extends Base{
  constructor(){
    super();
  }
  getCollectData(uid,callback){
    var that=this;
    var param={
      url:'favorite/get_all',
      type:'post',
      data:{id:uid},
      sCallback:function(data){
        callback&&callback(data);
      },
      eCallback:function(data){
        callback&&callback(1);
      }
    };
    this.request(param);
  }
}
export{Index};