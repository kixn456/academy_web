/**
 * Created by Administrator on 2017/10/21.
 *@description
 *@author jeaStone
 *@out
 */

import {getRootPath,ajaxPost,ajaxGet} from '../common/ajax';
import {ErrorMSG} from '../error/errorMsg';
import {StudyData,QuestionList,BounsList} from '../testData/studyData';

/***
 *
 * s pageInfo={
        userId:userId,
        category:'ubuyer',
        startCreateTime:'2017-12-01 00:00:00', //查询用户的已购买的课程信息，开始时间与结束时间固定写死
        endCreateTime:'2017-12-30 00:00:01',
        pageSize:10,
        pageNum:1
    };
 *
 *
 * */
export function getAjaxBuyerCourseListWithUser(userId,ajaxData,successFn,errorFn){
    let serverUrl=getRootPath()+"userOrderDb/ubuyer/"+userId+"/queryUserOrder";
    console.log("-----------")
    ajaxPost(serverUrl,ajaxData,function(data){
        successFn(data.retCode,data.responseInfo);
    },function(e){
        console.log("errorInfo:"+e);
        //errorCallback(e);
    })
    //successCallBack(StudyData);

}


/*********************/
export function getAjaxBuyerOrderListWithUser(userId,successCallBack,errorCallBack){
    let serverUrl=getRootPath()+"userOrderDb/coursebuyer/"+userId+"/queryUserOrder";
    let ajaxData={
        userId:userId,
        category:'coursebuyer',//
        startCreateTime:'2017-12-01 00:00:00',//查询用户购买的订单信息，时间已下单时间与结束时间查询、关状
        endCreateTime:'2017-12-30 00:00:01',
        status:'',// int 类型　0所有订单，10240已结束的订单　512　待付款
        pageSize:10,
        pageNum:1
    };

    ajaxPost(serverUrl,ajaxData,function(data){
        successCallback(data.retCode,data.responseInfo);
    },function(e){
        console.log("errorInfo:"+e);
        //errorCallback(e);
    })
    successCallBack(StudyData);

}


/***请求单课时列表信息**/
export function getAjaxBuyerOneCourseWithUser(userId,courseId,successCallBack,errorCallBack){

    let serverUrl=getRootPath()+"userOrderDb/ubuyer/"+userId+"/queryOneOrder";
    let ajaxData={
        startCreateTime:'2017-12-01 00:00:00',
        userId:userId,
        courseId:courseId,
        category:'ubuyer'
    }
    ajaxPost(serverUrl,ajaxData,function(data){
        successCallBack(data.retCode,data.responseInfo);
    },function(e){
        console.log("errorInfo:"+e);
        //errorCallback(e);
    })
    successCallBack(StudyData);

}


/***请求问题列表参数USERID,**/
export function getQuestionListWithUser(userId,successCallBack,errorCallBack){
    let serverUrl="";
    ajaxPost(serverUrl,userId,function(data){
        successCallback(data.retCode,data.responseInfo);
    },function(e){
        console.log("errorInfo:"+e);
        //errorCallback(e);
    })
    successCallBack(QuestionList);

}
/***请求积分列表参数USERID,**/
export function getBounsListListWithUser(userId,successCallBack,errorCallBack){
    let serverUrl="";
    ajaxPost(serverUrl,userId,function(data){
        successCallback(data.retCode,data.responseInfo);
    },function(e){
        console.log("errorInfo:"+e);
        //errorCallback(e);
    })
    successCallBack(BounsList);

}
