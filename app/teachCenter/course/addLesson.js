/**
 * Created by Administrator on 2017/10/12.
 *@description
 *@author
 *@out
 */


import React, {Component} from 'react';

import {Steps,Col} from 'antd';
import 'antd/dist/antd.css';
import '../../../css/timeline.css';

import {AddLessonBasicInfo} from './add/addLessonBasicInfo';
import {AddLessonDetailInfo} from './add/addLessonDetail';
import {ChapterList} from './add/chapterList';
import * as Common from '../../public/commom/commom';
import * as CourseServer from '../../server/courseCenterServer';
import  * as TeachCenterServer from '../../server/teachCenterServer';
import Storage from '../../common/storeage';


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



export default class AddLessonInfo extends Component {
    constructor(props) {
        super(props);
        let stepData=this.initDefaultData();
        let newStepData=JSON.stringify(stepData);
       this.state={
           currentStep:0,
           stepSource:JSON.parse(newStepData),
           orderId:''
       }
    }



    componentWillReceiveProps(nextProps){
        let params=nextProps.params.id;

        if(params){
            this.initData(params);
        }
    }

/*
    componentDidUpdate(){
        let userId=789;
        TeachCenterServer.getOrderId(userId,function(data){

        },function(e){
            console.log("系统异常");
        })
    }*/



    initDefaultData(){
        let _self=this;

        let courseChapterList=[];
        let basicInfo={
            courseId:"",
            owner:"",
            title:"",
            category:"",
            expireDate:"",
            originalPrice:"0.0",
            realPrice:"0.0"
        };

        let courseDetail={
            courseInfo:"",
            detail:"",
            searchKeys:"",
            fitPeople:"",
            courseAvatar: "",
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
        CourseServer.getCourseDetailByAjax(id,function(data){
            let myData=data.responseInfo;
            let courseChapterList=myData.courseChapterList;
            let basicInfo={
                courseId:myData.courseId,
                title:myData.title,
                category:myData.category,
                expireDate: myData.expireDate,
                originalPrice: myData.originalPrice,
                realPrice:myData.realPrice
            };
            let courseDetail={
                courseInfo:myData.courseInfo,
                detail:myData.detail,
                searchKeys: myData.searchKeys,
                fitPeople:myData.fitPeople,
                courseAvatar: myData.courseAvatar,
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
//点击步聚切换
    stepClick(currentStep){
        this.setState({
            currentStep:currentStep
        })
    }
    previousStep(stepData){
        let step=this.state.currentStep;
        this.stepClick(step-1);
        this.setStepData(step,stepData);
    }

    setStepData(step,data,isPublish=false){

        let dataSource=this.state.stepSource;
        let selfStep=parseInt(step);
        let newStep=((selfStep+1)>2)?selfStep:selfStep+1;
        dataSource[selfStep]=data;
        let orderId=this.state.orderId;


        if(isPublish){
            //这里需要提交
            //获取userId;
            TeachCenterServer.submitOrderInfo(orderId,function(code,data){
                console.log("提交订单结果");
                alert("订单生成功"+data.orderId)
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

        TeachCenterServer.getOrderId(userId,function(code,data){
            if(code==0){
               let orderId=data;
               _self.submitOrderInfo(orderId,step,stepData);
            }
        })
    }

    submitOrderInfo(orderId,step,stepData){

        let _self=this;
        let orderInfo=Object.assign({},_self.state.stepSource[0]);
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



    childStepSubmit(step,stepData){
        let oldStep=parseInt(step);
        let newStep=oldStep+1;
        this.setStepData(oldStep,stepData);

    }

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
                            <ChapterList dataSource={stepData[currentStep]} orderPublish={(stepData)=>this.orderPublish(currentStep,stepData)}  submitCallBack={(stepData)=>this.childStepSubmit(currentStep,stepData)}/>
                        :
                        null
                    }

                </div>

            </Col>
        )
    }

}