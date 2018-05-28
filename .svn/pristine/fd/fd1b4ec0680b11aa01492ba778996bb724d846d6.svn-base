/**
 * Created by Administrator on 2017/10/21.
 *@description
 *@author
 *@out
 */

import {getRootPath,ajaxPost,ajaxGet} from '../common/ajax';

const  IS_REPLY=1,
IS_EVALUATION=0;

/**
 * 填加评论
 *  参数：object {courseId,createUserId,content,createIsReply}
 *  chapterId
 * */
 function addEvaluationByAjax(ajaxData,successCallBack,errorCallBack){
    //courseId + "/configureEvaluation",
        let serverUrl=getRootPath()+"/courseEvalController/"+ajaxData.courseId+"/configureEvaluation";
    let submitData={
        courseId:ajaxData.courseId,
        createrUserId:ajaxData.userId,
        content:ajaxData.content,
        starLevel:ajaxData.starLevel+1,
        createrIsReply:IS_EVALUATION
    };

    ajaxPost(serverUrl,submitData,function(data){
        successCallBack(data.retCode,data.responseInfo);
    },function(e){
        console.log("errorInfo:"+e);
        //errorCallback(e);
    })

}

function getEvaluationList(ajaxData,success,error){
    /*ajaxData.pageSize=10;
    ajaxData.PageNum=1;
    ajaxData.category="courseEval";
    ajaxData.startCreateTime="2018-01-01 12:00:00";
    ajaxData.userId=ajaxData.courseId;*/
    //http://www.chunzeacademy.com:8080/userOrderDb/courseEval/
    let serverUrl=getRootPath()+"/userOrderDb/courseEval/"+ajaxData.userId+"/queryOrderSortByOrderId";
    ajaxPost(serverUrl,ajaxData,function(data){
        success(data);
    },function(e){
        console.log("errorInfo:"+e);
        //errorCallback(e);
    })
}


function addLikeEvaluation(ajaxData,success,error){
    let serverUrl=getRootPath()+"/courseEvalController/"+ajaxData.courseId+"/addLove";
    ajaxPost(serverUrl,ajaxData,function(data){
        success(data);
    },function(e){
        console.log("errorInfo:"+e);
        //errorCallback(e);
    })
}

export {
    addEvaluationByAjax,
    getEvaluationList,
    addLikeEvaluation

}