/**
 * Created by Administrator on 2017/10/21.
 *@description
 *@author jeaStone
 *@out
 */

import {getRootPath,ajaxPost,ajaxGet} from '../common/ajax';
import {ErrorMSG} from '../error/errorMsg';
import {StudyData,QuestionList,BounsList} from '../testData/studyData';

/**
 * 填加课时信息
 *  填加课时和修改课时暂时用同一节口
 *  填加课时classId为空
 *  chapterId
 * */
export function getAjaxCourseListWithUser(userId,successCallBack,errorCallBack){
    let serverUrl="";
    ajaxPost(serverUrl,userId,function(data){
        successCallback(data.retCode,data.responseInfo);
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
