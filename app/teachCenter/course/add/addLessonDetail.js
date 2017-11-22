/**
 * Created by Administrator on 2017/9/30.
 */

import React, {Component} from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox,Button,Radio,Upload, message } from 'antd';


import * as I18N from '../../../i18n/i18n_teachCenter';

import {CoustomInput} from '../../../public/newInput';

const FormItem = Form.Item;
const { TextArea } = Input;
const Dragger = Upload.Dragger;

const props = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    action: '//files.chunzeacademy.com:9200/images/uploadThumbImage'
   /* onChange(info) {
        console.log("---------------");
        console.log(info);
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);

        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }*/
};

class AddLessonDetail extends Component {
    constructor(props) {
        super(props);
        let defaultState=this.initState();
        defaultState=JSON.stringify(defaultState);
        this.state={
            courseInfo:JSON.parse(defaultState),
            errorInfo:JSON.parse(defaultState),
            errorClass:JSON.parse(defaultState)
        }
    }

    initState(){
        let defaultState={
            courseInfo:'',//简介
            detail:'',
            searchKeys:'',//标签
            fitPeople:'',//适用人群
            courseAvatar:'',//课程封面
            difficultyLevel:''//难度级别
        };
        return defaultState;
    }

    componentDidMount(){

        let courseInfo=this.props.dataSource;
        if(courseInfo){
          this.setState({
              courseInfo:courseInfo
          })
        }

    }
    uploadOnChange(info){

        const status = info.file.status;
        if (status !== 'uploading') {

        }
        if (status === 'done') {

            let result=info.file.response;

            if(result.retCode==0){
                let courseInfo=this.state.courseInfo;
                    courseInfo.courseAvatar=result.responseInfo;
                this.setState({
                    courseInfo:courseInfo
                })
                message.success(`${info.file.name} file uploaded successfully.`);
            }


           /* message.success(`${info.file.name} file uploaded successfully.`);*/

        } else if (status === 'error') {

            message.error(`${info.file.name} file upload failed.`);
        }
    }

    changeHandle(e){
        let courseInfo=this.state.courseInfo;
        let name=e.target.name;
        let value=e.target.value;
        let checkInfoObject=this.checkUserInputValue(name,value,courseInfo);
        this.setCourseInfo(checkInfoObject);
    }

    checkUserInputValue(name,value,courseInfo){
        let errorClass={};
        let errorInfo={};

        let _self=this;
        let checkFlag=false;
        let className="error";
        courseInfo[name]=value;

        switch(name){
            case 'courseInfo':
            case 'detail':
                 checkFlag=_self.checkCourseInto(value);
                 if(checkFlag){
                     errorInfo[name]="课程描述只能输入15－100个字符";
                     errorClass[name]="error";
                 }else{
                     errorClass[name]="success";
                 }
                break;

            case 'searchKeys':
                break;
            case 'fitPeople':
                break;
            case 'courseAvatar':
                
                break;
            case 'difficultyLevel':
                break;
        }

        return {
            errorClass,
            errorInfo,
            courseInfo
        };
    }
    submitBeforCheck(courseInfo){

        let _self=this;
        let checkAllFlag=[];
        for(var key in courseInfo){
            let checkResult=_self.checkUserInputValue(key,courseInfo[key],courseInfo);

            if(checkResult.errorClass[key]=="error"){
                checkAllFlag.push(key);
            }
        }
        return checkAllFlag;
    }
    checkCourseInto(str){
        //15-100个字符
        let checkRegMath=/^[A-Za-z0-9_\-\u4e00-\u9fa5]{5,10000}$/;
        if(!checkRegMath.test(str)){
            return true
        }else{
            return false;
        }
    }

    addCourseStepSubmit(){
        let courseInfo=this.state.courseInfo;
        let errorClass=this.state.errorClass;
        let checkErrorArray=this.submitBeforCheck(courseInfo);
        if(checkErrorArray.length>0){
            //如果长度大于0表示有错误
            for(var i=0;i<checkErrorArray.length; i++)
            {
                let errorKey=checkErrorArray[i];
                errorClass[errorKey]="error";
            }
           this.setState({
                errorClass:errorClass
            })
            return;
        }else{
            this.props.submitCallBack(courseInfo);
        }
    }

    previousStep(){
        let courseInfo=this.state.courseInfo;
        this.props.returnCallBack(courseInfo);
    }

    setCourseInfo(stateObj){
        this.setState({
            courseInfo:stateObj.courseInfo,
            errorClass:stateObj.errorClass,
            errorInfo:stateObj.errorInfo
        })
    }
    render() {

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        let defaultTime=new Date();
        let errorClass=this.state.errorClass;
        let courseInfo=this.state.courseInfo;

        return (
            <Form  style={{marginTop:20}}>

                <FormItem
                    {...formItemLayout}
                    label={I18N.I18N_TEATCH_CENTER.CLASS_courseAvatar}
                >


                    <Upload
                        className="avatar-uploader"
                        name="avatar"

                        {...props}
                        onChange={(info)=>this.uploadOnChange(info)}
                    >
                        {
                            (courseInfo.courseAvatar!="")
                                ?
                                <img src={courseInfo.courseAvatar} style={{width:"200px",height:'auto'}} />
                                :
                                <Icon type="plus" className="avatar-uploader-trigger" />
                        }

                    </Upload>

                   {/* <Dragger {...props}  onChange={(info)=>this.uploadOnChange(info)}>



                            <p className="ant-upload-drag-icon">
                                {

                                 (courseInfo.courseAvatar!="")
                                ?
                                        <img src={courseInfo.courseAvatar} style={{width:"200px",height:'auto'}} />
                                :
                                <Icon type="inbox" />
                                }
                            </p>



                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                    </Dragger>*/}
                </FormItem>


                <CoustomInput
                    formItemLayout={formItemLayout}
                    name='courseInfo'
                    label={I18N.I18N_TEATCH_CENTER.CLASS_courseInfo}
                    validateStatus={errorClass.courseInfo}
                    onChange={(e)=>this.changeHandle(e)}
                    require={true}
                    rows={4}
                    placeholder={I18N.I18N_TEATCH_CENTER.CLASS_courseInfo_tip}
                    errorMsg={I18N.I18N_TEATCH_CENTER.CLASS_courseInfo_tip}
                    defaultValue={courseInfo.courseInfo}
                />

                <CoustomInput
                    formItemLayout={formItemLayout}
                    name='searchKeys'
                    label={I18N.I18N_TEATCH_CENTER.CLASS_searchKeys}
                    validateStatus={errorClass.searchKeys}
                    onChange={(e)=>this.changeHandle(e)}
                    require={true}
                    placeholder={I18N.I18N_TEATCH_CENTER.CLASS_searchKeys}
                    errorMsg={I18N.I18N_TEATCH_CENTER.CLASS_TITLE_TIP}
                    defaultValue={courseInfo.searchKeys}
                />

                <CoustomInput
                    formItemLayout={formItemLayout}
                    name='fitPeople'
                    label={I18N.I18N_TEATCH_CENTER.CLASS_fitPeople}
                    rows={4}
                    validateStatus={errorClass.fitPeople}
                    onChange={(e)=>this.changeHandle(e)}
                    require={true}
                    placeholder={I18N.I18N_TEATCH_CENTER.CLASS_fitPeople_tip}
                    errorMsg={I18N.I18N_TEATCH_CENTER.CLASS_TITLE_TIP}
                    defaultValue={courseInfo.fitPeople}
                />

                <CoustomInput
                    formItemLayout={formItemLayout}
                    name='detail'
                    label={I18N.I18N_TEATCH_CENTER.CLASS_detail}
                    validateStatus={errorClass.detail}
                    defaultValue={courseInfo.detail}
                    onChange={(e)=>this.changeHandle(e)}
                    rows={8}
                    require={true}
                    placeholder={I18N.I18N_TEATCH_CENTER.CLASS_detail_tip}
                    errorMsg={I18N.I18N_TEATCH_CENTER.CLASS_detail_tip}
                />



                <Col span={24} className='formItem_bottom' offset={6}>
                    <Button type="primary"  onClick={()=>this.previousStep()} style={{marginRight:'10px'}}>上一步</Button>
                    <Button type="primary"  onClick={()=>this.addCourseStepSubmit()}>下一步</Button>
                </Col>
            </Form>
        );
    }

}
export const AddLessonDetailInfo = Form.create()(AddLessonDetail);