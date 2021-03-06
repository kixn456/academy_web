/**
 * create By Jeastone 2017/09/19
 * @HomeData server
 * **/

import React from 'react';
import FetchUnit from '../common/fetch';
import Storage from '../common/storeage';
import {getRootPath,ajaxPost,ajaxGet} from '../common/ajax';
import * as HomeData from '../testData/homeData';

//import Mock from 'mockjs';
/*var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
})
// 输出结果
console.log(JSON.stringify(data, null, 4));*/
/**
 * 对应服务器的 RequestLogin 类
 * @param countryCode -- 国家码，以00开头
 * @param phone  -- 包括国家码的全号码
 * @param password
 * @param successCallback
 * @param errorCallback
 * @returns
 */
export function getHomeCourseList(userId,successCallback,errorCallback)
{

    let serverUrl=getRootPath()+"hotCourseSearch/search";
    let ajaxData={userId:userId,keyword:'',pageSize:10,pageNum:1};
    ajaxPost(serverUrl,ajaxData,function(res){
        successCallback(res.responseInfo);
    },function(e){
        console.log("errorInfo:"+e);
        //errorCallback(e);
    })

    //successCallback(HomeData.homeCourseData);

}


export function getNewCourseList(userId,successCallback,errorCallback)
{

    let serverUrl=getRootPath()+"newCourseSearch/search";
    let ajaxData={userId:userId,keyword:'',pageSize:10,pageNum:1};
    ajaxPost(serverUrl,ajaxData,function(res){
        successCallback(res.responseInfo);

    },function(e){
        console.log("errorInfo:"+e);
        //errorCallback(e);
    })

    //successCallback(HomeData.homeCourseData);

}


export function getHomeTeacherList(successCallback,errorCallback)
{
    let serverUrl = getRootPath() + "courseTeacherManager/000000/getRecommandTeacher";
    ajaxGet(serverUrl,null,function(res){
        console.log(res);
        successCallback(res.retCode,res.responseInfo)
    },function(e){
        console.log("errorInfo:"+e);
        //errorCallback(e);
    })
    //successCallback(HomeData.homeTeacherData);

}