/**
 * Created by JeaStone on 2017/10/19.
 *@description
 *@author
 *@out
 */
import {getRootPath,ajaxPost,ajaxGet} from '../common/ajax';
import {ErrorMSG} from '../error/errorMsg';
import Storage from '../common/storeage';
import * as Commom from '../public/commom/commom';
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

export function createNewDraft(userId="default",orderId,courseId,oldOrderInfo,successCallback,errorCallBack,async=true){

    let serverUrl=getRootPath()+"courseTeacherManager/tcoursepub/createDraft";
    let orderInfo=Commom.clone(oldOrderInfo);

    orderInfo.category=JSON.stringify(orderInfo.category);
    if(courseId!="000000" && orderId!="000000")
    {
        if(orderInfo.courseId=="")
        {
            orderInfo.courseId=courseId;
        }
    }
    orderInfo.courseChapter="";
    let ajaxData={userId:userId,courseId:courseId,orderId:orderId,courses:orderInfo};
    ajaxPost(serverUrl,ajaxData,function(data){
        successCallback(data.retCode,data.responseInfo);
    },function(e){
        if(errorCallBack)
            console.log("errorInfo:"+e);
        //errorCallback(e);;
    },async)
}


export function createOrderInfoByAjax(orderId,orderData,isModify,successCallback,errorCallBack,async=true){

    let userInfo=Storage.get("userInfo");
    let userId=userInfo.userId;
    let orderInfo=Commom.clone(orderData);

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
    if(orderInfo.courseInfo.courseId=="")
    {
        orderInfo.courseInfo.courseId=orderId;
    }
    orderInfo.courseInfo.owner=userId;

    if(orderInfo.courseClass && orderInfo.courseClass!="")
    {
        let newChapterInfo=exchangeCourseClass(orderInfo.courseClass);
        orderInfo.courseInfo.courseChapter=JSON.stringify(newChapterInfo.chapterInfo);
        orderInfo.courseClass=newChapterInfo.chapterList;

    }
    //章节排序并设置课时ＩＤ

    let category=JSON.stringify(orderInfo.courseInfo.category);
    orderInfo.courseInfo.category=category;

    let mapObject={course:JSON.stringify(orderInfo.courseInfo),courseClass:JSON.stringify(orderInfo.courseClass)};
    if(orderInfo.courseClass.length<=0){
        mapObject={course:JSON.stringify(orderInfo.courseInfo)};
    }

    let ajaxData={"orderId":orderId,"catetory":"tcoursepub","contextDatas":mapObject};
    console.log(ajaxData);
    ajaxPost(serverUrl,ajaxData,function(data){
        successCallback(data.retCode,data.responseInfo);
    },function(e){
        if(errorCallBack)
            console.log("errorInfo:"+e);
    },async)
}

export function farmatChapterInfo(chapterList){
    let chapterInfo=[];
    if(chapterList.length>0)
    {
        chapterList.map(function(item,index){
            item.chapterId=index++;
            let chapteItem={"chapterId":item.chapterId,"chapterTitle":item.chapterTitle,"description":''};
            chapterInfo.push(chapteItem);
        })
    }
    return chapterInfo;
}

export function exchangeCourseClass(chapterList){
    let chapterInfo=[];
    if(chapterList.length>0)
    {
        chapterList.map(function(item,index){
            item.chapterId=index++;
            let chapteItem={"chapterId":item.chapterId,"chapterTitle":item.chapterTitle,"description":''};
            chapterInfo.push(chapteItem);
            if(item.courseList.length>0)
            {
                let courseList=item.courseList;
                courseList.map(function(listItem,listIndex)
                {
                    listIndex++;
                    listItem.classId="00"+index+"_00"+listIndex;
                })
            }
        })
    }
    return {chapterList,chapterInfo};
}

/***
 * 请求发布的过程数据
 * 参数：orderKeyList＝["course",'courseClass','......']
 *  SUCCESS out :{course:orderInfo.courseInfo,courseClass:orderInfo.courseClass};
 * **/
export function getContextData(orderId,orderKeyList,successCallBack,errorCallBack,async=true){
    let dbid=orderId.substring(orderId.length-4,orderId.length);
    let serverUrl=getRootPath()+"orderGateway/tcoursepub/"+dbid+"/"+orderId+"/"+"getContextData";
    let newOrderKeyList=JSON.stringify(["course","courseClass"]);

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
   // let serverUrl=getRootPath()+"orderGateway/tcoursepub/"+dbid+"/"+orderId+"/"+"startOrder";
    let serverUrl=getRootPath()+"courseTeacherManager/"+orderId+"/"+"published";
    let ajaxData=null;
    ajaxGet(serverUrl,ajaxData,function(data){
        successCallBack(data.retCode,data.responseInfo);
    },function(e){
        if(errorCallBack)
            console.log("errorInfo:"+e);
        //errorCallback(e);
    })
}








/****请求教师已发布的课程列表*****/

export function getCourseListWithTeacher(ajaxData,successCallBack,errorCallBack){

   /* let pageInfo={
        startCreateTime:'2017-11-30 00:00:00',
        endCreateTime:'2017-11-30 00:00:01',
    userId:userId,
        category:'tcoursepub',
        pageSize:10,
        pageNum:1
    }*/
    let userId=ajaxData.userId;
    let serverUrl=getRootPath()+"userOrderDb/tcoursepub/"+userId+"/queryUserOrder";
    ajaxPost(serverUrl,ajaxData,function(data){
        successCallBack(data.retCode,data.responseInfo);
    },function(e){
        if(errorCallBack)
            console.log("errorInfo:"+e);
        //errorCallback(e);
    })


}

