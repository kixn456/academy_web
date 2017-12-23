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


const Option = Select.Option;
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
            submitFlag:true,
            isModify:false,
            courseIndex:"",
            lessonInfo:JSON.parse(defaultState),
            errorClass:JSON.parse(defaultState),
            errorInfo:JSON.parse(defaultState),
            percent:0,
            originalFile:''
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
                vdeoUrl:'',
                videoId:''
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
                let videoUrl=uploadInfo.object;
                let videoId=_self.uploadAuthList[0].videoId;
                let lessonInfo=_self.state.lessonInfo;
                lessonInfo.videoId=videoId;
                lessonInfo.videoUrl=videoUrl;
                _self.setState({
                    lessonInfo:lessonInfo
                });
               // log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
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
               console.log("开始上传");
               _self.setState({
                   originalFile:uploadInfo.file.name
               })
               //console.log(uploadInfo.file.name);
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

       /* if(lessonInfo.vodeoId=="" && this.oldLessonVodeo.vodeoId!="")
        {
            lessonInfo.vodeoId=this.oldLessonVodeo.vodeoId;
        }*/
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
        this.exchangeLession({name:name,value:value});

    }
    selectChange(name,value){
        this.exchangeLession({name:name,value:value});
    }
    exchangeLession(obj){
        let lessonInfo=this.state.lessonInfo;
        lessonInfo[obj.name]=obj.value;
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

    removeItem(){
        let lessonInfo=this.state.lessonInfo;
        this.oldLessonVodeo={
            videoId:lessonInfo.videoId,
            videoUrl:lessonInfo.videoUrl
        };
        lessonInfo.videoId="";
        this.setState({
            lessonInfo:lessonInfo
        })
    }

    render()
    {
        let courseInfo=this.state.lessonInfo;
        let errorClass=this.state.errorClass;
        let percent=this.state.percent;
        console.log(percent);
        const props = {
            name: 'file',
            headers: {
                authorization: 'authorization-text',
            }
        };
        return (
            <Col  span={24}>
                <Col className='timeline-content-form' span={24}>
                    <Col span={24} className='formItem_bottom'>
                        <Col className="text-right ant-form-item-required" span={4} >
                            课时类型：
                        </Col>
                        <Col span={18}>
                            <Select name="category"  size={'large'}   value={courseInfo.category||'0'} style={{width:"100%"}} onSelect={(value)=>this.selectChange('category',value)}>
                                <Option value="0" >视频</Option>
                                <Option value="1">文档</Option>
                            </Select>
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
                            课时价格：
                        </Col>
                        <Col span={5}>
                            <Input name='originalPrice' value={courseInfo.originalPrice} onChange={this.changeHandle.bind(this)} />
                        </Col>
                    </Col>

                    <Col span={24} className='formItem_bottom'>
                        <Col className="text-right ant-form-item-required" span={4}>
                            折扣价格：
                        </Col>
                        <Col span={5}>
                            <Input name='realPrice' value={courseInfo.realPrice} onChange={this.changeHandle.bind(this)} />
                        </Col>
                    </Col>

                    <Col span={24} className='formItem_bottom'>
                        <Col className="text-right" span={4}>
                            上传视频：
                        </Col>
                        <Col span={18}>
                            <div className="ant-upload ant-upload-select ant-upload-select-text" style={{marginBottom:'2px'}}>
                                {
                                    (percent==100 || courseInfo.videoId!="")
                                        ?
                                        <span style={{paddingLeft:'10px'}}>{this.state.originalFile}
                                            <i className="glyphicon glyphicon-facetime-video" aria-hidden="true" ></i>
                                            <i　style={{paddingLeft:'10px'}}　onClick={()=>this.removeItem()}>删除</i>
                                        </span>
                                        :
                                <span  className="ant-upload" style={{position:'relative'}}>
                                   <Input  type="file"  onChange={(e)=>this.changeFile(e)} style={{opacity:'0', zIndex:999,position:'absolute',top:'0'}}  />
                                        <button type="button" className="ant-btn">
                                            <i className="anticon anticon-upload"></i>
                                            <span> Click to Upload</span>
                                        </button>
                                </span>
                                }
                            </div>
                            {
                             (percent==100 || percent==0)
                                ?
                                null
                                :
                                 <Progress percent={percent} status="active" />
                            }
                        </Col>
                    </Col>
                    <Col span={24} className='formItem_bottom'>
                        <div style={{textAlign:'center'}}>

                          <Button type="primary" size={'large'} disabled={(percent==100 || percent==0)?false:true} style={{padding:'5px 40px'}}  onClick={this.courseInfoSubmit.bind(this)}>保存</Button>

                        </div>
                    </Col>
                </Col>

            </Col>






        )
    }

}