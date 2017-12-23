/**
 * Created by Administrator on 2017/9/30.
 */

import React, {Component} from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox,Button,Radio} from 'antd';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
 import {isEmptyObject} from "../../../public/commom/commom";
 import {UploadImg} from '../../../public/uploaImg'
import moment from 'moment';
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import * as I18N from '../../../i18n/i18n_teachCenter';
import  * as ClassData from '../../../testData/classData';
import {CoustomInput} from '../../../public/newInput';
const FormItem = Form.Item;
const Option = Select.Option;
const ClassList=ClassData.ClassList;
const RadioGroup = Radio.Group;


 class AddLessonBasic extends Component {
    constructor(props) {
        super(props);
        let defaultState=this.initState();
        let  newCourseInfo=Object.assign({},this.props.dataSource);
        if(typeof(newCourseInfo.category)=="object")
        {
            newCourseInfo.category=this.props.dataSource.category;
        }else{
            newCourseInfo.category={id:ClassList[0].id,name:ClassList[0].name,child:{id:ClassList[0].child[0].id,name:ClassList[0].child[0].name}}
        }

        this.state={
            isFreeCharge:true,
            isFreeTime:true,
            courseInfo:newCourseInfo,
            errorInfo:Object.assign({},defaultState),
            errorClass:Object.assign({},defaultState),
            activeCategory:ClassList[0].child,

        }
    }

    initState(){
       let defaultState={
                courseId:'',
                title:'',
                category:'',//课程分类或/分类ID，
                courseAvatar:'',
                expireDate:'2099-12-30 00:00:00',
                originalPrice:'',
                realPrice:''

        };
        return defaultState;
    }

    //初始化接收
     componentDidMount(){
       //let dataSource=this.props.dataSource;
       /* console.log(isEmptyObject(dataSource));
         console.log(dataSource);*/
       /*  console.log("88")
         if(dataSource){
             this.setState({
                 courseInfo:dataSource
             })
         }*/

     }

     componentWillReceiveProps(nextProps){

         if(nextProps.dataSource!=this.props.dataSource){

             let myData=this.findSelectedIndex(nextProps.dataSource.category.id,ClassList);
             let originalPrice=nextProps.dataSource.originalPrice;
             let expireDate=nextProps.dataSource.expireDate;
             let isFreeCharge=true;
             let isFreeTime=true;


             if(originalPrice>0){
                 isFreeCharge=false;
             }

             console.log(expireDate);
             if(expireDate!='2099-12-30 00:00:00'){
                 isFreeTime=false;
             }



               this.setState({
                   courseInfo:nextProps.dataSource,
                   activeCategory:myData.child,
                   isFreeTime:isFreeTime,
                   isFreeCharge:isFreeCharge
               });

         }
     }


     //输入框监听
     changeHandle(e){
            let courseInfo=this.getCourseInfo();
            let stateName=e.target.name;
            let stateValue=e.target.value;
           courseInfo[stateName]=stateValue;
           let checkResult=this.checkCourseInfo(courseInfo);
           let isEmpty=isEmptyObject(checkResult);
         let errorClass={};

             if(!isEmpty){

                 this.showErrorInfo(errorInfo);
             }else{
                   errorClass[stateName]="";
                 this.setState({
                     errorClass:errorClass,
                     courseInfo:courseInfo
                 })
             }

     }

     //校验输入的值
     checkCourseInfo(courseInfo){
         let errorClass=this.state.errorClass;
         let errorInfo=this.state.errorInfo;
         let newErrorInfo={};
         for(var key in courseInfo){
             switch(key){
                 case 'title':
                     if(courseInfo[key]=="")
                     {
                         newErrorInfo[key]=I18N.I18N_TEATCH_CENTER.CLASS_TITLE_TIP;
                     }
                     break;
             }
         }
         return newErrorInfo;
     }
     //设置courseInfo
     setCourseInfo(courseInfo){
         this.setState({
             courseInfo:courseInfo
         });
     }
     //请求courseInfo
     getCourseInfo(){
         let newState=this.state.courseInfo;
         return newState;
     }


     //单
     checkPriceAndTimeRadio(e){

         let radioName=e.target.name;
         let radioValue=e.target.value;
         let showPriceRange=this.state.isFreeCharge;
         let showTimeRange=this.state.isFreeTime;
         if(radioName=='isFreeCharge'){
             this.setState({
                 isFreeCharge:radioValue
             });
         }
         if(radioName=='isFreeTime'){
             this.setState({
                 isFreeTime:radioValue
             });
         }



     }
    //日期选择
     chooseDate(target){
         let courseInfo=this.getCourseInfo();
         let stateName=target.name;
         let stateValue=target.value._i;
         courseInfo[stateName]=stateValue;
         this.setCourseInfo(courseInfo);
     }
     inputChangeHandle(e){
         let courseInfo=this.getCourseInfo();
         let stateName=e.target.name;
         let stateValue=e.target.value;


         if(stateValue!=""){
             courseInfo[stateName]=stateValue;
             this.setCourseInfo(courseInfo);
         }
     }
     //select下拉框选中
     chooseSelect(target){
         let courseInfo=this.getCourseInfo();
         let stateName=target.name;
         let stateValue=target.value;

         courseInfo[stateName]=stateValue;
         this.setCourseInfo(courseInfo);
     }
     //显示错误提示信息
     showErrorInfo(courseInfo){
         let errorClass=this.state.errorClass;
         for(var key in courseInfo){
             switch(key){
                 case 'title':
                     errorClass[key]="has-feedback has-error";
                 break;
             }
         }
         this.setState({
             errorClass:errorClass
         })
     }

     //分步提交
     addCourseStepSubmit(){
         let state=this.state;
         let isFreeCharge=state.isFreeCharge;
         let isFreeTime=state.isFreeTime;
         let courseInfo=state.courseInfo;

         //是否免费价格
         if(isFreeCharge)
         {
             courseInfo.originalPrice=0;
         }else{
             if(courseInfo.originalPrice==0){
                 return;
             }
         }

         //是否免费时间
         if(isFreeTime){
             courseInfo.expireDate="2099-12-30 00:00:00";
         }

         let errorInfo=this.checkCourseInfo(courseInfo);
         let isEmpty=isEmptyObject(errorInfo);


         if(!isEmpty){

             this.showErrorInfo(errorInfo);
             return
         }


         //提交校验
         this.props.submitCallBack(courseInfo);


     }

     chooseSelectCateory(obj){

         let courseInfo=this.state.courseInfo;
         let category=courseInfo.category;
         let id=obj.value;
         let newCategory=null;

            if(obj.name=="category")
            {

                newCategory=this.findSelectedIndex(id,ClassList);
                category={id:newCategory.id,name:newCategory.name,child:{id:newCategory.child[0].id,name:newCategory.child[0].name}};
                courseInfo.category=category;

                this.setState({
                    activeCategory:newCategory.child,
                    courseInfo:courseInfo
                })

            }else{

                newCategory=this.findSelectedIndex(id,this.state.activeCategory);

                category.child={id:newCategory.id,name:newCategory.name};
                courseInfo.category=category;

                this.setState({
                   courseInfo:courseInfo
                })
            }
     }
     uploadCallBack(imgPath){

         let courseInfo=this.state.courseInfo;
         courseInfo.courseAvatar=imgPath;
         this.setState({
             courseInfo:courseInfo
         })
     }

     findSelectedIndex(id,data){

         let newData=[];

         for(var i=0;i<data.length; i++){
             if(data[i].id==id){
                 newData=data[i]
                 break;
             }
         }
         return newData;
     }

    render() {
        let defaultTime=new Date();
        let courseInfo=this.state.courseInfo;
        let errorClass=this.state.errorClass;
        let isFreeCharge=this.state.isFreeCharge;
        let isFreeTime=this.state.isFreeTime;
        let childLst=this.state.activeCategory;
        let category=courseInfo.category;

        console.log(isFreeTime)
        return (
            <div style={{marginTop:'20px'}}>
                <Col span={24} className='formItem_bottom' offset={2}>
                    <Col className="text-right ant-form-item-required" span={4}  >
                        {I18N.I18N_TEATCH_CENTER.CLASS_TITLE}
                    </Col>
                    <Col span={10} offset={1} className={errorClass.title}>
                        <Input size={'large'} name='title' value={courseInfo.title}  placeholder={I18N.I18N_TEATCH_CENTER.CLASS_TITLE_placeholder}  onChange={(e)=>this.changeHandle(e)} />
                    </Col>
                </Col>

                <Col span={24} className='formItem_bottom' offset={2}>
                    <Col className="text-right ant-form-item-required" span={4}  >
                        {I18N.I18N_TEATCH_CENTER.category}
                    </Col>
                    <Col span={10} offset={1}>
                        {/****级联下拉选择框**/}
                        <Select name="category" size={'large'} value={category.id.toString()}  style={{width:"49%",float:'left'}} onSelect={(value)=>this.chooseSelectCateory({"name":'category',"value":value})}>
                            {
                                ClassList.map(function(item,index){
                                    return  <Option value={(item.id).toString()} key={index}>{item.name}</Option>
                                })
                            }
                        </Select>
                        <Select name="child" size={'large'}  value={category.child.id} style={{width:"49%",float:'left',marginLeft:'4px'}} onSelect={(value)=>this.chooseSelectCateory({"name":'child',"value":value})}>
                            {
                                childLst.map(function(item,index){
                                    return  <Option value={(item.id)} key={index}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Col>
                </Col>



                <Col span={24} className='formItem_bottom' offset={2}>
                    <Col className="text-right ant-form-item-required" span={4} >
                        {I18N.I18N_TEATCH_CENTER.originalPrice}
                    </Col>
                    <Col span={18} offset={1}>
                        <Col>
                        <RadioGroup size={'large'} name="isFreeCharge" value={isFreeCharge} onChange={this.checkPriceAndTimeRadio.bind(this)}>
                            <Radio  value={true}> {I18N.I18N_TEATCH_CENTER.Free}</Radio>
                            <Radio value={false}>{I18N.I18N_TEATCH_CENTER.NOT_FREE}</Radio>
                        </RadioGroup>
                        </Col>
                        <Col span={18} style={{marginTop:'10px'}}>
                        {
                            !this.state.isFreeCharge
                                ?
                                <Col>
                                    <span style={{padding:'0px 10px'}}>原始价格：</span><Input size={'large'} value={courseInfo.originalPrice} name='originalPrice' style={{ width: '100px' }} onChange={(e)=>this.inputChangeHandle(e)}  />
                                    <span style={{padding:'0px 10px'}}>折扣价格：</span><Input size={'large'} value={courseInfo.realPrice} name='realPrice' style={{ width: '100px' }} onChange={(e)=>this.inputChangeHandle(e)}  />
                                </Col>
                                :
                                null
                        }
                        </Col>
                    </Col>
                </Col>

                <Col span={24} className='formItem_bottom' offset={2}>
                    <Col className="text-right ant-form-item-required" span={4} >
                        {I18N.I18N_TEATCH_CENTER.expireDate}
                    </Col>
                    <Col span={18} offset={1}>
                        <RadioGroup name="isFreeTime"  value={isFreeTime} onChange={this.checkPriceAndTimeRadio.bind(this)}>
                            <Radio value={true}>永久有效</Radio>
                            <Radio value={false}>指定日期</Radio>
                        </RadioGroup>
                        {
                            !this.state.isFreeTime
                                ?
                                <DatePicker defaultValue={moment(defaultTime, 'YYYY-MM-DD')} onChange={(value)=>this.chooseDate({name:'expireDate',value:value})}/>
                                :
                                null
                        }
                    </Col>
                </Col>

                <Col span={24} className='formItem_bottom' offset={2}>
                    <Col className="text-right ant-form-item-required" span={4} >
                        {I18N.I18N_TEATCH_CENTER.CLASS_courseAvatar}
                    </Col>
                    <Col span={18} offset={1}>
                        <UploadImg photoPath={courseInfo.courseAvatar} uploadCallBack={(imgPath)=>this.uploadCallBack(imgPath)} />
                    </Col>
                </Col>


                <Col span={24} className='formItem_bottom' offset={6}>
                    <Button type="primary"  onClick={this.addCourseStepSubmit.bind(this)}>下一步</Button>
                </Col>

            </div>
        );
    }

}
export const AddLessonBasicInfo = AddLessonBasic;