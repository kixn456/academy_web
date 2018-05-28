/**
 * Created by Administrator on 2018/3/12.
 * 完善讲师信息资料
 */

import React, {Component} from 'react';
/*import {Grid,ROW,Col,Tabs,Tab,Modal,Button,ButtonGroup,FormGroup,Form,FormControl,Radio,ButtonToolbar,DropdownButton,MenuItem,SplitButton} from "react-bootstrap";*/

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox,Button,Radio, Modal} from 'antd';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import {isEmptyObject} from "../../public/commom/commom";
import {UploadImg} from '../../public/uploaImg'
import moment from 'moment';
import '../../../css/timeline.css';
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import * as I18N from '../../i18n/i18n_teachCenter';
import  * as ClassData from '../../testData/classData';
import * as UserCenterServer from '../../server/userCenterServer';
import Storage from  '../../common/storeage';
import {CoustomInput} from '../../public/newInput';
const FormItem = Form.Item;
const Option = Select.Option;
const ClassList=ClassData.ClassList;
const RadioGroup = Radio.Group;

const IdList=[
    "身份证",
    "护照",
    "驾驶证"
]



export default class ModifyTeacherInfo extends Component {
    constructor(props) {
        super(props);
        this.state={
            isRefershing:false
        }
        this.teacherInfo={
                photo:'',
                resume:'',
                specialties:'',
                level:'',
                title:'',
                certificate:'',
                company:'',
                accomplishment:''
        };
    }

    componentDidMount(){
       this.initData();
    }

    initData(){
        let cacehUserInfo=Storage.get("userInfo");
        let _self=this;
        UserCenterServer.getTeacherInfo(cacehUserInfo.userId,cacehUserInfo.token,function(code,data){
            if(code==0)
            {
                _self.teacherInfo=data;
                _self.refereshRender();
            }

        },function(e){
            console.log(e);
        })
    }



    changeHandle(e){
        //console.log(e.target.name+"==="+e.target.value);
        let targetName=e.target.name;
        let targetValue=e.target.value;
        this.teacherInfo[targetName]=targetValue;
        this.refereshRender();

    }

    refereshRender(){
        let isRefershing=this.state.isRefershing;
        this.setState({
            isRefershing:!isRefershing
        })
    }

    modifyTeacherInfoSubmit(){
        let phoneNo="";
        let userInfo=Storage.get("userInfo");
        let _self=this;
        let newTeacherInfo=Object.assign({},_self.teacherInfo);
        console.log(newTeacherInfo);
        UserCenterServer.modifyTeacherInfo(userInfo.userId,newTeacherInfo,function(code,data){

            if(code==0){
                alert("教师信息修改成功")
            }

        },function (e) {
        },function (e) {
            console.log(e);
        })
    }

    chooseSelectIdType(target){
        let name=target.name;
        let value=target.value;
        this.teacherInfo[name]=value;
        this.refereshRender();
    }

    //
    uploadCallBack(photoPath){

        this.teacherInfo.photo=photoPath;
        this.refereshRender()
    }

    render() {
        let defaultTime=new Date();
        let teacherInfo=this.teacherInfo;
        return (
                <Col span={24} >
                    <Col span={24} className="lineBox">
                        <Col span={4} offset={3}  className="lineBox_lable">上传照片</Col>
                        <Col span={10}>
                            <div style={{width:'100px',height:'100px',border:'1px solid #ccc',textAlign:'center'}}>
                                <UploadImg photoPath={teacherInfo.photo} uploadCallBack={(imgPath)=>this.uploadCallBack(imgPath)} />
                            </div>
                        </Col>
                    </Col>

                    <Col  span={24} className="lineBox">
                        <Col  span={4} offset={3}  className="lineBox_lable">讲师简介</Col>
                        <Col  span={14} >
                            <Input size={'large'} value={teacherInfo.resume}　 name='resume' type="textarea" rows={4}    placeholder={"请填写讲师简介"}  onChange={(e)=>this.changeHandle(e)} />
                        </Col>
                    </Col>

                    <Col span={24} className="lineBox">
                        <Col  span={4}  offset={3} className="lineBox_lable">擅长领域</Col>
                        <Col  span={14}>
                            <Input size={'large'} value={teacherInfo.specialties} type="textarea" rows={4}  name='specialties' placeholder={"请输入您的擅长领域"}  onChange={(e)=>this.changeHandle(e)} />
                        </Col>
                    </Col>
                    {/***职称，**/}
                    <Col span={24} className="lineBox">
                        <Col  span={4}  offset={3} className="lineBox_lable">讲师级别</Col>
                        <Col  span={14}>
                            <Input size={'large'} name='level' value={teacherInfo.level}  placeholder={"请输入您的级别"}  onChange={(e)=>this.changeHandle(e)} />
                        </Col>
                    </Col>
                    {/***职称，**/}
                    <Col span={24} className="lineBox">
                        <Col  span={4}  offset={3} className="lineBox_lable">讲师职称</Col>
                        <Col  span={14}>
                            <Input size={'large'} name='title' value={teacherInfo.title}  placeholder={"请输入您的职称"}  onChange={(e)=>this.changeHandle(e)} />
                        </Col>
                    </Col>
                    {/***职称，**/}
                    <Col span={24} className="lineBox">
                        <Col  span={4}  offset={3} className="lineBox_lable">就业机构</Col>
                        <Col  span={14}>
                            <Input size={'large'} name='company' value={teacherInfo.company}  placeholder={"请输入您的就业机构"}  onChange={(e)=>this.changeHandle(e)} />
                        </Col>
                    </Col>
                    {/***职称，**/}
                    <Col span={24} className="lineBox">
                        <Col  span={4}  offset={3} className="lineBox_lable">个人成就</Col>
                        <Col  span={14}>
                            <Input size={'large'} type="textarea" rows={4} value={teacherInfo.accomplishment}   name='accomplishment' placeholder={"请输入您的成就"}  onChange={(e)=>this.changeHandle(e)} />
                        </Col>
                    </Col>
                    {/***职称，**/}
                    <Col span={24} className="lineBox">
                        <Col  span={4}  offset={3} className="lineBox_lable">证书</Col>
                        <Col  span={14}>
                            <Input size={'large'} name='certificate' value={teacherInfo.certificate}  placeholder={"您获得过哪些证书"}  onChange={(e)=>this.changeHandle(e)} />
                        </Col>
                    </Col>
                    <Col span={24} className="lineBox">

                        <Col  span={14}　offset={10}>
                            <Button type="primary"  onClick={()=>this.modifyTeacherInfoSubmit()}>确认提交</Button>
                        </Col>
                    </Col>

                </Col>
        )
    }

}

