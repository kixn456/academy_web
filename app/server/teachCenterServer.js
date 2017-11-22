/**
 * Created by JeaStone on 2017/10/19.
 *@description
 *@author
 *@out
 */
import {getRootPath,ajaxPost,ajaxGet} from '../common/ajax';
import {ErrorMSG} from '../error/errorMsg';


export function getOrderId(userId="default",successCallback,errorCallBack,async=true){

    let serverUrl=getRootPath()+"orderId/tcoursepub/"+userId+"/createOrderId";
    let ajaxData={jsonString:''};
    ajaxPost(serverUrl,ajaxData,function(data){
        successCallback(data.retCode,data.responseInfo);
    },function(e){
        if(errorCallBack)
        console.log("errorInfo:"+e);
        //errorCallback(e);;
    },async)
}


export function createOrderInfoByAjax(orderId,orderInfo,isModify,successCallback,errorCallBack,async=true){

    /* courseInfo={
       chapterId:''//对应的章节ID
       classId://课时ID
       category:0, //课时类型
       classTitle:'',//课时标题
       classDetail:'',//课时详细
       originalPrice:'发布的原始价格',
       realPrice:'成交价格',
     owner:'用户ID'
       videoUrl:''//视频地址
       vodeoId:'视频ID'
   }*/

    /* chapterInfo={
        chapterId;//章节ID
        chapterTitle:'', //章节标题
        chapterInfo:'',  //章节描述
     }
      * 填加课时信息
 *  填加课时和修改课时暂时用同一节口
 *  填加课时classId为空
 *  chapterId
 *  */
    let isModifyType=(isModify)?"putContextData":"createOrder";

    let dbid=orderId.substring(orderId.length-4,orderId.length);
    let serverUrl=getRootPath()+"orderGateway/tcoursepub/"+dbid+"/"+orderId+"/"+isModifyType;
    orderInfo.realPrice=orderInfo.originalPrice;
    orderInfo.courseInfo.courseId=orderId;
    //orderInfo.owner= 用户ID；
    let mapObject={course:JSON.stringify(orderInfo.courseInfo),courseClass:JSON.stringify(orderInfo.courseClass)};
    let ajaxData={"orderId":orderId,"catetory":"tcoursepub","contextDatas":mapObject};

    ajaxPost(serverUrl,ajaxData,function(data){
        successCallback(data.retCode,data.responseInfo);
    },function(e){
        if(errorCallBack)
            console.log("errorInfo:"+e);
    },async)
}

/***
 * 请求发布的过程数据
 * 参数：orderKeyList＝["course",'courseClass','......']
 *  SUCCESS out :{course:orderInfo.courseInfo,courseClass:orderInfo.courseClass};
 * **/
export function getContextData(orderId,orderKeyList,successCallBack,errorCallBack,async=true){
    let dbid=orderId.substring(orderId.length-4,orderId.length);
    let serverUrl=getRootPath()+"orderGateway/tcoursepub/"+dbid+"/"+orderId+"/"+"getContextData";
    let newOrderKeyList=JSON.stringify(["courseClass","course"]);
    let ajaxData={jsonString:newOrderKeyList};
    ajaxPost(serverUrl,ajaxData,function(data){
        successCallBack(data.retCode,data.responseInfo);
    },function(e){
        if(errorCallBack)
            console.log("errorInfo:"+e);
        //errorCallback(e);
    },async)
}


/***
 * 发布课程信息
 * 参数：orderId
 *  SUCCESS out :CODE;
 * **/
export function submitOrderInfo(orderId,successCallBack,errorCallBack){
    let dbid=orderId.substring(orderId.length-4,orderId.length);
    let serverUrl=getRootPath()+"orderGateway/tcoursepub/"+dbid+"/"+orderId+"/"+"startOrder";
    let ajaxData=null;
    ajaxGet(serverUrl,ajaxData,function(data){
        successCallBack(data.retCode,data.responseInfo);
    },function(e){
        if(errorCallBack)
            console.log("errorInfo:"+e);
        //errorCallback(e);
    })
}

export function getOrderListByUser(ajaxData,successCallBack,errorCallBack){

   /* let pageInfo={
        startCreateTime:'2017-11-30 00:00:00',
        endCreateTime:'2017-11-30 00:00:01',
        userid:userId,
        category:'tcoursepub',
        pageSize:10,
        pageNum:1

    }*/
   let userId=ajaxData.userid;
    //{category}/{userid}/queryUserOrder
    let serverUrl=getRootPath()+"userOrderDb/tcoursepub/"+userId+"/queryUserOrder";

    ajaxPost(serverUrl,ajaxData,function(data){
        successCallBack(data.retCode,data.responseInfo);
    },function(e){
        if(errorCallBack)
            console.log("errorInfo:"+e);
        //errorCallback(e);
    })


}

