/**
 * Created by Administrator on 2018/2/5.
 */

import {getRootPath,ajaxPost,ajaxGet} from '../common/ajax';
import {ErrorMSG} from '../error/errorMsg';
import Storage from '../common/storeage';
import * as Commom from '../public/commom/commom';


function getUserinfoWithPhone(phoneNo,success,error,async=true) {

    let singlePhone=phoneNo.substring(phoneNo.length-11,phoneNo.length);
    let countryCode=phoneNo.replace(singlePhone,"");

    let serverUrl=getRootPath()+"user/"+countryCode+"/getUserInfo";
    let ajaxData={phone:phoneNo};

    ajaxPost(serverUrl,ajaxData,function(data){
        success(data.responseInfo);
    },function(e){
        if(error)
            console.log("errorInfo:"+e);
        //errorCallback(e);;
    },async)
}


function modifyUserInfo(phoneNo,userInfo,success,error,async=true) {


    //SecurityUserss
    let singlePhone=phoneNo.substring(phoneNo.length-11,phoneNo.length);
    let countryCode=phoneNo.replace(singlePhone,"");
    let serverUrl=getRootPath()+"user/"+countryCode+"/modifyUserInfo";
    let ajaxData=Object.assign({},userInfo);

    ajaxPost(serverUrl,ajaxData,function(data){
        success(data.retCode,data.responseInfo);
    },function(e){
        if(error)
            console.log("errorInfo:"+e);
        //errorCallback(e);;
    },async)
}


function modifyTeacherInfo(userId,teacherInfo,success,error,async=true) {


    let serverUrl=getRootPath()+"courseTeacherManager/"+userId+"/confTeacherInfo";
    let ajaxData=Object.assign({},teacherInfo);
    ajaxPost(serverUrl,ajaxData,function(data){
        success(data.retCode,data.responseInfo);
    },function(e){
        if(error)
            console.log("errorInfo:"+e);
        //errorCallback(e);;
    },async)
}

function getTeacherInfo(userId,token,success,error,async=true){
    token=token||"";
    let serverUrl=getRootPath()+"courseTeacherManager/"+userId+"/getTeacherInfo";
    //let ajaxData={token:token};
    ajaxGet(serverUrl,null,function(data){
        success(data.retCode,data.responseInfo);
    },function(e){
        if(error)
            console.log("errorInfo:"+e);
        //errorCallback(e);;
    },async)
}


export {
    getUserinfoWithPhone,
    modifyUserInfo,
    getTeacherInfo,
    modifyTeacherInfo

}