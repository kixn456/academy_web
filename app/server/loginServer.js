/**
 * create By Jeastone 2017/09/18
 * @login server
 * **/

import React from 'react';
//import FetchUnit from '../common/fetch';
import Storage from '../common/storeage';
// import {JSEncrypt} from '../common/jsencrypt.min';
import {getRootPath,ajaxPost,ajaxGet} from '../common/ajax';
import {ErrorMSG} from '../error/errorMsg';
//import * as FetchUnit from '../common/ajax';

//Login 需要存入缓存的常用字段保留值
const LOGIN_INFO={
        TRANSID:'transid'
};

//登录ID类型
const LOGINID_TYPE={
        email:1,//email
        phone:2,//电话登录
    userId:3//uid登录
};

//客户端类型
const LOGIN_TYPE={
    web:1,//web
    mobile:2,//移动端手机
    pad:3,//pad
    pc:4//客户端
}

/**
 * 对应服务器的 RequestLogin 类
 * @param countryCode -- 国家码，以00开头
 * @param phone  -- 包括国家码的全号码
 * @param password
 * @param successCallback
 * @param errorCallback
 * @returns
 */
export function ajaxLoginWithPass(transid,countryCode,phone,password1,successCallback,errorCallback)
{
    let serverUrl = getRootPath() +"user/"+countryCode + "/loginByPass";
    let loginData = {
        "transid":transid,
        "loginIdType":LOGINID_TYPE.phone,
        "loginId":countryCode+phone,
        "countryCode":countryCode,
        "password":password1,
        "loginType":LOGIN_TYPE.web
    };


   ajaxPost(serverUrl,loginData,function(data){

       Storage.set("loginFlag",true);
	   successCallback(data.retCode,data.responseInfo);
    },function(e){
       Storage.set("loginFlag",false);
        console.log("errorInfo:"+e);
        //errorCallback(e);
    })
}
/**
 *
 * @param {countryCode,phone,password}
 * @param successCallback
 * @param errorCallback
 * @returns
 */
export function ajaxRegisterWithAuth(registerData,successCallback,errorCallback)
{
    let serverUrl =getRootPath() + "user/" + registerData.countryCode + "/registerByCode";
    registerData.loginIdType=LOGINID_TYPE.phone;
    registerData.loginType=LOGIN_TYPE.web;
    registerData.loginId = registerData.countryCode+ registerData.phone;
    ajaxPost(serverUrl,registerData,function(data){
	   successCallback(data.retCode,data.responseInfo);
    },function(e){
        //errorCallback(xhr,testStatus);
    })

}
/**
 * 请求短信认证码，
 * @param countryCode
 * @param phone
 * @param password
 * @param successCallback
 * @param errorCallback
 * @returns 返回transid，提交的时候需要输入transid和用户输入的authCode
 */
export function ajaxGetAuthCode(countryCode,phone,successCallback,errorCallback)
{
    let serverUrl =getRootPath() + "user"+ "/getSmsValid";
    let data = {
        "phone":phone
    };
    ajaxPost(serverUrl,data,function(data){
        //将transId存入storage
    	Storage.set("transid",data.responseInfo.transid);
 	   successCallback(data.retCode,data.responseInfo);
     },function(e){
         //errorCallback(xhr,testStatus);
     })
     
}
/**
 *
 * @param countryCode
 * @param phone
 * @param successCallback
 * @param errorCallback
 * @returns
 */
export function ajaxGetRsaPublicKey(phone,successCallback,errorCallback)
{
    let serverUrl =getRootPath() + "user"+ "/getRsaPubKey";
    let data = {
        "phone":phone
    };
    
    ajaxPost(serverUrl,data,function(data){
   	 Storage.set("transid",data.responseInfo.transid);
    	successCallback(data.retCode,data.responseInfo);
    },function(e){
        //errorCallback(xhr,testStatus);
    })
}

export function ajaxCheckAuthCode(checkData,successCallback,errorCallback)
{
    let serverUrl =getRootPath() + "user/"+ checkData.countryCode+"/checkAuthCode";
    let data = checkData;
    console.log("]]]]]]]]]]]]]]]]]]]]]]]]")
    console.log(JSON.stringify(checkData));
    ajaxPost(serverUrl,data,function(data){
        successCallback(data.retCode,data.responseInfo);
    },function(e){
        //errorCallback(xhr,testStatus);
    })
}

/**
 *
 * @param countryCode
 * @param phone
 * @param password
 * @param authTransid
 * @param authCode
 * @param successCallback
 * @param errorCallback
 * @returns
 */
export function ajaxResetPassword(resetData,successCallback,errorCallback)
{
    let serverUrl = getRootPath() + "/user/" + resetData.countryCode + "/resetPassByAuthCode";
    let data = {
        "transid":resetData.transid,
        "authCode":resetData.smsCode,
        "loginIdType":LOGINID_TYPE.phone,
        "loginId":resetData.countryCode+resetData.phone,
        "countryCode":resetData.countryCode,
        "password":resetData.password,
        "loginType":LOGIN_TYPE.web
    };

    ajaxPost(serverUrl,data,function successLogin(data,textStatus){
            successCallback(data.retCode,data.responseInfo);
        },
        function errorLogin(xhr,testStatus){
            //errorCallback(xhr,testStatus);
            console.log("异常")
        });
}

//注销接口
/**
 *
 * @param countryCode
 * @param phone
 * @param successCallback
 * @param errorCallback
 * @returns
 */
export function ajaxLogoutWithUser(errorCallback)
{
   Storage.remove("loginFlag",function(){
       console.log("清楚缓存中的信息")
   })
}

export function  testAjaxLoginServer(){
    let serverUrl="http://172.18.3.22:8080/coomarts_ucs/user/app/getRsaPublicKey.htm";
    let data={
        userInfo:'68800984'
    };
    let loginUrl='http://172.18.3.22:8080/coomarts_ucs/user/app/userLogin.htm';
    let password="123456";
    let loginData={
        countryCode:'00505',
        userInfo:'68800984',
        password:'123456',
        transId:''
    };

    ajaxPost(serverUrl,data,function(data){
        console.log("getPublicKEY success");
        data=data.responseInfo;
        let publicKey=data.sraPublicKey,
            random=data.random,
            transId=data.transId,
            privideKey=data.sraPrivateKey;
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);
        //var encrypted = encrypt.encrypt(password);
        loginData.password=encrypt.encrypt(random+password);
        loginData.transId=transId;

        console.log(JSON.stringify(loginData));


        var decrypt = new JSEncrypt();
        decrypt.setPrivateKey(PRIVATE_KEY);
        var testResult = decrypt.decrypt(loginData.password);
            console.log(testResult);

        ajaxPost(loginUrl,loginData,function(res) {
            console.log("successLogin");
        },function(e){
            console.log(e);
        })


    },function(e){
        //errorCallback(xhr,testStatus);
    })
}

