/**
 * Created by Administrator on 2017/10/21.
 *@description
 *@author
 *@out
 */

import {getRootPath,ajaxPost,ajaxGet} from '../common/ajax';
import {ErrorMSG} from '../error/errorMsg';
import {CourseInfoData} from '../testData/courseDetailData';
import {CourseListData} from '../testData/courseListData';
/**
 * 请求课程详细信息
 *  填加课时和修改课时暂时用同一节口
 *  填加课时classId为空
 *  chapterId
 * */
export function getCourseDetailByAjax(courseId,successCallBack,errorCallBack){
    let serverUrl="";
    ajaxPost(serverUrl,courseId,function(data){
        successCallback(data.retCode,data.responseInfo);
    },function(e){
        console.log("errorInfo:"+e);
        //errorCallback(e);
    })
    successCallBack(CourseInfoData);
}

/**
 * 搜索课程
 *  参数：{
 *  keyword:"java",
 *  category:'分类'，
 *  pageNo:10,
 *  pageSize:10,
 *  fitPeople':"适用人群"
 *  difficultyLevel:''
 *  priceRange:''价格范围
 *  }

 * */


export function getCourseListBySearch(searchInfo,successCallBack,errorCallBack){

    searchInfo={
        keyword:'JAVA',
        category:'2',
        pageNo:'1',
        pageSize:'10',
        fitPeople:'本科',
        difficultyLevel:'2',
        priceRange:'20-50',
    };


    if(searchInfo.keyword)
    {
        //关键词搜索
    }
    if(searchInfo.category){
        //分类搜
    }

    let serverUrl="";
    ajaxPost(serverUrl,searchInfo,function(data){
        successCallback(data.retCode,data.responseInfo);
    },function(e){
        console.log("errorInfo:"+e);
        //errorCallback(e);
    })
    console.log(CourseListData);
    successCallBack(CourseListData);
}
