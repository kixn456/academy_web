/**
 * Created by Administrator on 2017/10/25.
 *@description
 *@author
 *@out
 */

import {getRootPath,ajaxPost,ajaxGet} from '../common/ajax';

/**
 *
 */

export function ajaxReqUploadVideo(aliyunVodInfo,successCallBack,errorCallBack)
{
    let serverUrl = getRootPath() + "/vod/requestUploadVideo";
    let data = aliyunVodInfo;
    ajaxPost(serverUrl,data,function(data,textStatus){
            console.log(data);
            if(data.retCode==0)
            {
                let retAliyunVodInfo = data.responseInfo;
                successCallBack (data.retCode,retAliyunVodInfo);
            }

        },
        function (xhr,testStatus){
            errorCallback(-1,null);

        });
}

/**
 * 根据文件上传列表，请求上传验证码列表
 * @param aliyunVodInfoList
 * @param serverUrl
 * @returns  authCodeList
 */
export function getAuthCodeListByAjax(aliyunVodInfoList,successCallback,async=true)
{

    let serverUrl = getRootPath() + "/vod/requestUpVideoList";

    let data ={
        "transId":"000000",
        "reqParms":JSON.stringify(aliyunVodInfoList)
    };

    ajaxPost(serverUrl,data,function(data,textStatus){
                let retAliyunVodInfo = data.responseInfo;
                successCallback(data.retCode,retAliyunVodInfo)

        },function(xhr,testStatus){
            successCallback(-1,null);
        },async);
}


/**
 * 视频播放请求授权
 * @param vodPlayInfo
 * @param successCallback
 * @param serverUrl
 * @returns
 */
export function ajaxReqPlayVideo(vodPlayInfo,successCallback,serverUrl=null)
{
    if(serverUrl==null)
    {
        serverUrl = getRootPath() + "/vod/"  + "/requestPlayAuth";
    }

    let data =vodPlayInfo;

    ajaxPost(serverUrl,data,function successLogin(data,textStatus){

            if(data.retCode==0)
            {

                successCallback(data.retCode,data.responseInfo);
            }

        },
        function errorLogin(xhr,testStatus){
            successCallback(-1,null);
        });
}
