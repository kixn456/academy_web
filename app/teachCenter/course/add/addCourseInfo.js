/**
 * Created by Administrator on 2017/10/16.
 *@description
 *@author
 *@out
 */

/**
 * Created by Administrator on 2017/10/13.
 * 发布课时
 * @param 章节object 信息，含顺序ID、index
 */

import React, {Component} from 'react';
import { Form, Input,Tooltip,Progress, Icon,  Select, Row, Col, Checkbox,Button,Radio,Upload,message} from 'antd';
const FormItem = Form.Item;
import {CustomInput} from '../../../public/newInput';
import {isEmptyObject} from "../../../public/commom/commom";
import * as VideoServer from '../../../server/videoPlayerServer';



function log(value) {
   console.log(value);
}





export default class addCourse extends Component
{
    constructor(props)
    {
        super(props);
        let defaultState=this.initState();
        defaultState=JSON.stringify(defaultState);

        this.state={
            isModify:false,
            courseIndex:"",
            lessonInfo:JSON.parse(defaultState),
            errorClass:JSON.parse(defaultState),
            errorInfo:JSON.parse(defaultState),
            percent:0
        };
        this.uploader=null;
        this.uploadAuthList=[]
        this.uploadFileIndex=0;
    }


    initState(){
        let defaultState={

                classId:'',
                category:'', //课时类型
                classTitle:'',//课时标题
                classDetail:'',//课时详细
                originalPrice:'0.0',
                realPrice:'0.0',
                videoUrl:'',
                vodeoId:''
        }
        return defaultState;
    }

    componentDidMount(){
       this.initUploader();
        let courseInfo=this.props.courseInfo;
        let lessonInfo=courseInfo.courseInfo;
        let isEmpty=isEmptyObject(lessonInfo);
        if(!isEmpty)
        {
            this.setState({
                isModify:true,
                courseIndex:courseInfo.index,
                lessonInfo:lessonInfo
            })
        }

    }
    initUploader(){
        let _self=this;
       this.uploader= new VODUpload({
            // 文件上传失败
            'onUploadFailed': function (uploadInfo, code, message) {
                log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message);
            },
            // 文件上传完成
            'onUploadSucceed': function (uploadInfo) {
                log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
            },
            // 文件上传进度
            'onUploadProgress': function (uploadInfo, totalSize, uploadedSize) {
                let progress=Math.ceil(uploadedSize * 100 / totalSize);
                _self.setState({
                    percent:progress
                })
               // log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(uploadedSize * 100 / totalSize) + "%");

            },
            // STS临时账号会过期，过期时触发函数
            'onUploadTokenExpired': function () {

                if (isVodMode()) {
                    // 实现时，从新获取UploadAuth
                    // uploader.resumeUploadWithAuth(uploadAuth);
                } else if (isSTSMode()) {
                    // 实现时，从新获取STS临时账号用于恢复上传
                    // uploader.resumeUploadWithToken(accessKeyId, accessKeySecret, secretToken, expireTime);
                }
            },
            // 开始上传
            'onUploadstarted': function (uploadInfo) {
                var uploadAuth =_self.uploadAuthList[ _self.uploadFileIndex].uploadAuth;
                var uploadAddress =_self.uploadAuthList[ _self.uploadFileIndex].uploadAddress;

                _self.uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress);
               _self.uploadFileIndex++;
                // log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
            }
        });
    }
    componentWillUnmount(){
        let defaultState=this.initState();
         this.setState({
             defaultState
         })
    }

    //提交章节课时
    courseInfoSubmit(){

        let lessonInfo=this.state.lessonInfo;
        let isModify=this.state.isModify;
        let courseIndex=this.state.courseIndex;
        let errorInfo=this.submitBeforCheckCourseInfo(lessonInfo);
        let isSuccess=isEmptyObject(errorInfo);

        if(!isSuccess){
            this.showSuccessInfo(errorInfo);
           return ;
        }

        let submitInfo={
            isModify:isModify,
            courseInfo:lessonInfo,
            index:courseIndex
        };
        submitInfo=JSON.stringify(submitInfo);
        this.props.submitCallBack(JSON.parse(submitInfo));
    }

    showSuccessInfo(errorInfo){
        let errorClass=this.state.errorClass;
        let stateErrorInfo=this.state.errorInfo;
        let courseInfo=this.state.lessonInfo;
        let newErrorInfo=Object.assign(stateErrorInfo,errorInfo);

        for(var key in errorInfo){
            message.error(errorInfo[key]);
            errorClass[key]="has-feedback has-error";
        }

        this.setState({
            errorClass:errorClass,
            errorInfo:newErrorInfo
        })
    }

    submitBeforCheckCourseInfo(courseInfo){
        let errorInfo={};
        let priceReg=/^(([1-9]\d*)|\d)(\.\d{1,2})?$/;
        for(var key in courseInfo){
            switch(key){
                case 'classTitle':

                    if(courseInfo[key]==""){
                        errorInfo[key]='标题不能为空';
                    }

                break;
                case 'originalPrice':
                    console.log(courseInfo.originalPrice);
                    if(!priceReg.test(courseInfo.originalPrice)){
                        errorInfo.realPrice='金额格式不正确';
                    }
                    break;
            }
        }

        return errorInfo;

    }

    changeHandle(e){
        let target=e.target;
        let name=target.name;
        let value=target.value;

        let lessonInfo=this.state.lessonInfo;
        lessonInfo[name]=value;
        this.setState({
            lessonInfo:lessonInfo
        })

    }

    changeFile(e){
        //获取上传文件列表
        let _self=this;
        let fileName=e.target.files[0].name;
        let userData;
        let newUploader=this.state.uploader;
        if(fileName){

            userData = '{"Vod":{"UserData":"{"IsShowWaterMark":"false","Priority":"7"}"}}';
            this.uploader.addFile(e.target.files[0], null, null, null, userData);
            _self.startUpload();
        }
        let message=require( "./addChapterInfo");
        alert(message);


    }

    startUpload(){

        let _self=this;
        _self.uploadFileIndex=0;
         this.getAuthCodeList(function(retList){
             _self.uploadAuthList=retList;
             _self.uploader.startUpload();
        });
    }



    getAuthCodeList(callBack){
        let newUploader=this.uploader;
        let fileList = this.uploader.listFiles();
        let aliyunVodList=new Array();
        let aliyunVodInfo = {
            "localFilename":"",
            "category":"194732283",
            "fileTitle":"js upload video",
            "tag":"js upload tag",
            "desc":"js 测试上传"
        };

        aliyunVodInfo.localFilename=fileList[0].file.name;
        aliyunVodList.push(aliyunVodInfo);

        //这里应该同步返回
        VideoServer.getAuthCodeListByAjax(aliyunVodList,function(code,authList){
            if(code==0){
                //将
                callBack(authList);
            }else
                {
                    alert("get upload auth error;");
                    return;
                }
        },function(e){
            console.log("上传失败");
        },false)
    }



    render()
    {
        let courseInfo=this.state.lessonInfo;
        let errorClass=this.state.errorClass;


        return (

            <div  span={24}>
                <Col className='timeline-content-form' span={24}>
                    <Col span={24} className='formItem_bottom'>
                        <Col className="text-right ant-form-item-required" span={4} >
                            课时类型：
                        </Col>
                        <Col span={18}>
                            <Input name='category' value={courseInfo.category} onChange={this.changeHandle.bind(this)} />
                        </Col>
                    </Col>

                    <Col span={24} className='formItem_bottom'>
                        <Col className="text-right ant-form-item-required" span={4}>
                            课时标题：
                        </Col>
                        <Col span={18} className={errorClass.classTitle}>
                            <Input name='classTitle' value={courseInfo.classTitle} onChange={this.changeHandle.bind(this)} />
                        </Col>
                    </Col>


                    <Col span={24} className='formItem_bottom'>
                        <Col className="text-right ant-form-item-required" span={4}>
                            课时描述：
                        </Col>
                        <Col span={18}>
                            <Input.TextArea  rows="10"  name='classDetail' value={courseInfo.classDetail} onChange={this.changeHandle.bind(this)} />
                        </Col>
                    </Col>

                    <Col span={24} className='formItem_bottom'>
                        <Col className="text-right ant-form-item-required" span={4}>
                            课时费用：
                        </Col>
                        <Col span={18}>
                            <Input name='originalPrice' value={courseInfo.originalPrice} onChange={this.changeHandle.bind(this)} />
                        </Col>
                    </Col>

                    <Col span={24} className='formItem_bottom'>
                        <Col className="text-right" span={4}>
                            上传视频：
                        </Col>
                        <Col span={18} >
                             <Input  type="file" onChange={(e)=>this.changeFile(e)} />
                            <div>
                                <Progress type="dashboard" percent={this.state.percent}  width={30} showInfo={false} />
                            </div>
                        </Col>
                    </Col>
                    <Col span={24} className='formItem_bottom'>
                        <FormItem>
                            <Button type="primary" onClick={this.courseInfoSubmit.bind(this)}>发布</Button>
                        </FormItem>
                    </Col>
                </Col>

            </div>






        )
    }

}