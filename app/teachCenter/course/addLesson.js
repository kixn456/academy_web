/**
 * Created by Administrator on 2017/10/12.
 *@description
 *@author
 *@out
 */


import React, {Component} from 'react';
import {Steps,Col,Upload,notification,Icon,Button,Message} from 'antd';

import '../../../css/timeline.css';

import  * as ClassData from '../../testData/classData';
import {AddLessonBasicInfo} from './add/addLessonBasicInfo';
import {AddLessonDetailInfo} from './add/addLessonDetail';
import {ChapterList} from './add/chapterList';
import * as Common from '../../public/commom/commom';
import * as CourseServer from '../../server/courseCenterServer';
import  * as TeachCenterServer from '../../server/teachCenterServer';
import Storage from '../../common/storeage';
const ClassList=ClassData.ClassList;

const AddLessonSteps=[
    {
        setp:1,
        title:'课程基本信息'
    },
    {
        setp:2,
        title:'课程描述信息'
    },
    {
        setp:3,
        title:'课程章节设置'
    }
];

const openNotification = (id) => {
    notification.open({
        message: '课程保存成功',
        description: '课程id:'+id+"已发布，请前往课程中心查看",
        icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
    });
};

export default class AddLessonInfo extends Component {
    constructor(props) {
        super(props);
        let stepData=this.initDefaultData();
        let newStepData=JSON.stringify(stepData);
       this.state={
           currentStep:0,
           stepSource:JSON.parse(newStepData),
           orderId:'',
       }

    }

    componentDidMount(){
        let params=this.props.params.id;
        if(params){
            this.initData(params);
        }
    }


    /**初始化默认数据模型*/
    initDefaultData(){
        let _self=this;

        let courseChapterList=[];
        let basicInfo={
            courseId:"",
            owner:"",
            title:"",
            category:"",
            courseAvatar:'',
            expireDate:"",
            courseChapter:[],
            originalPrice:"0.0",
            realPrice:"0.0"
        };

        let courseDetail={
            courseInfo:"",
            detail:"", //课程详情
            searchKeys:"",
            fitPeople:"",
            difficultyLevel:""
        };


        let stepSource=[
            basicInfo,
            courseDetail,
            courseChapterList
        ];

        return stepSource;


    }
    initData(params){

        let id=params.split("=")[1];
        let _self=this;

        //这里需要请求新数据；
        CourseServer.getCourseDetailByAjax(id,function(code,data){
            if(code!=0){
                alert("系统异常:"+code);
            }
            let myData=data;

            let courseChapterList=myData.courseChapterList||[];
            let courseChapte=JSON.parse(myData.courseChapter);
            let category=JSON.parse(myData.category);
            let newChildList=[];

                if(typeof(JSON.parse(myData.category))!="object")
                {

                   category=_self.findSelectedIndex(JSON.parse(myData.category),ClassList);
                    category.child={id:category.child[0].id,name:category.child[0].name};
                }

            let basicInfo={
                courseId:myData.courseId,
                title:myData.title,
                category:category,
                courseAvatar: myData.courseAvatar,
                expireDate: myData.expireDate,
                originalPrice: myData.originalPrice,
                realPrice:myData.realPrice,
                courseChapter:courseChapte,

            };
            let courseDetail={
                courseInfo:myData.courseInfo,
                detail:myData.detail,
                searchKeys: myData.searchKeys,
                fitPeople:myData.fitPeople,
                difficultyLevel:myData.difficultyLevel
            };


            let stepSource=[
                basicInfo,
                courseDetail,
                courseChapterList

            ];

            _self.setState({
                stepSource:stepSource
            })

        },function(e){
            console.log("错误了");
        })

    }

    findSelectedIndex(id,data){

        let newData={};

        for(var i=0;i<data.length; i++){
            if(data[i].id==id){
                newData=data[i]
                break;
            }
        }
        if(Common.isEmptyObject(newData))
        {
            newData={
                id:data[0].id,
                name:data[0].name,
                child:data[0].child
            }
        }
        return newData;
    }


//点击步聚切换
    stepClick(currentStep){
        this.setState({
            currentStep:currentStep
        })
    }

    previousStep(stepData){
        let step=this.state.currentStep;
        this.stepClick(step-1);
        //this.setStepData(step,stepData);
    }

    setStepData(step,data,isPublish=false){


        let dataSource=this.state.stepSource;
        let selfStep=parseInt(step);
        let newStep=((selfStep+1)>2)?selfStep:selfStep+1;
        dataSource[selfStep]=data;
        let orderId=this.state.orderId;
        if(isPublish){
            //这里需要提交"
            //获取userId;
            TeachCenterServer.submitOrderInfo(orderId,function(code,data){
                openNotification(data.orderId);
                setTimeout(function(){
                    location.href="#/CourseMananger"
                },50);

            })

        }else{

                //如果步为1表示要提交课程信息；
                if(selfStep>=1){
                    let orderId=this.state.orderId;

                    if(orderId=="" || !orderId)
                    {
                        this.createOrderId(newStep,dataSource);
                    }else{
                        this.submitOrderInfo(orderId,newStep,dataSource);
                    }

                }else{
                    this.setState({
                        currentStep:newStep,
                        stepSource:dataSource
                    })
                }
        }

    }



    createOrderId(step,stepData){
        let userInfo=Storage.get("userInfo");
        let userId=userInfo.userId;
        let _self=this;
        let orderInfo=stepData[0]; //深度clone
        orderInfo=Object.assign(orderInfo,stepData[1]);
        console.log(orderInfo);
       // return;
        TeachCenterServer.createNewDraft(userId,orderInfo,function(code,data){
            if(code==0){
               let orderId=data;
               _self.submitOrderInfo(orderId,step,stepData);
            }
        })
    }

    submitOrderInfo(orderId,step,stepData){
        let _self=this;
        let orderInfo=_self.state.stepSource[0]; //深度clone
        orderInfo=Object.assign(orderInfo,_self.state.stepSource[1]);
        let courseClass=_self.state.stepSource[2];
        let newOrderInfo={courseInfo:orderInfo,courseClass:courseClass};

        TeachCenterServer.createOrderInfoByAjax(orderId,newOrderInfo,false,function(code,data){
            if(code==0){
                _self.setState({
                    orderId:orderId,
                    currentStep:step,
                    stepSource:stepData
                })
            }
        })
    }

    //子步提交数据　参数:当前步子，步子数据；
    childStepSubmit(step,stepData){

        let oldStep=parseInt(step);
        let newStep=oldStep+1;
        this.setStepData(oldStep,stepData);
    }

    //订单发布保存，
    orderPublish( step,stepData){
        let oldStep=parseInt(step);
        let newStep=oldStep+1;
        this.setStepData(oldStep,stepData,true);
    }

    render() {
        let currentStep=this.state.currentStep;
        let stepData=this.state.stepSource;

        return (
            <Col style={{background:'white',overflow:'hidden',marginLeft:'14px', padding:'30px',minHeight:'400px'}}>

                <div style={{width:'70%',margin:'0px auto',marginLeft:'10px'}}>
                    <Steps current={this.state.currentStep}>
                        {
                            AddLessonSteps.map(function(item,index){
                                return  <Steps.Step key={index} title={item.title} />
                            })
                        }

                        {/*<Step title="In Progress" description="This is a description." />*/}
                        {/*<Step title="Waiting" description="This is a description." />*/}
                    </Steps>
                    {/*<Step dataSource={FIND_PASSWORD_STEP} currentStep={this.state.currentStep}  clickCallBack={(currentStep)=>this.stepClick(currentStep)} />*/}
                </div>

                <div>
                    {
                        (currentStep==0)
                            ?
                            <AddLessonBasicInfo dataSource={stepData[currentStep]}  submitCallBack={(stepData)=>this.childStepSubmit(currentStep,stepData)}/>
                            :
                            (currentStep==1)
                                ?
                            <AddLessonDetailInfo dataSource={stepData[currentStep]}  returnCallBack={(data)=>this.previousStep(data)} submitCallBack={(stepData)=>this.childStepSubmit(currentStep,stepData)}/>
                            :
                        (currentStep==2)
                            ?
                            <ChapterList chapterList={stepData[0].courseChapter} courseId={stepData[0].courseId} dataSource={stepData[currentStep]}  orderPublish={(stepData)=>this.orderPublish(currentStep,stepData)}  submitCallBack={(stepData)=>this.childStepSubmit(currentStep,stepData)}/>
                        :
                        null
                    }

                </div>

            </Col>
        )
    }

}