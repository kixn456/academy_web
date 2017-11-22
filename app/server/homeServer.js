/**
 * create By Jeastone 2017/09/19
 * @HomeData server
 * **/

import React from 'react';
import FetchUnit from '../common/fetch';
import Storage from '../common/storeage';
import * as HomeData from '../testData/homeData';
/**
 * 对应服务器的 RequestLogin 类
 * @param countryCode -- 国家码，以00开头
 * @param phone  -- 包括国家码的全号码
 * @param password
 * @param successCallback
 * @param errorCallback
 * @returns
 */



export function getHomeCourseList(successCallback,errorCallback)
{


   /*
   let serverUrl = getRootPath() + "/user/" + countryCode + "/loginByPass";
   FetchUnit.get(serverUrl,null,function(res){
        // successCallback(res);
    },function(e){
        console.log("errorInfo:"+e);
        //errorCallback(e);
    })*/

    successCallback(HomeData.homeCourseData);

}


export function getHomeTeacherList(successCallback,errorCallback)
{
   /* let serverUrl = getRootPath() + "/user/" + countryCode + "/loginByPass";
    FetchUnit.get(serverUrl,null,function(res){
        // successCallback(res);
    },function(e){
        console.log("errorInfo:"+e);
        //errorCallback(e);
    })*/
    successCallback(HomeData.homeTeacherData);

}