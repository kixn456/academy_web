/**
 * Created by Administrator on 2017/10/20.
 */

import React, {Component} from 'react';
import {Grid,Row,Col,Button,Tab,Tabs,ButtonGroup} from "react-bootstrap";
import * as CourseServer from '../../server/courseCenterServer';
import * as StudyServer from '../../server/studyCenterServer';
import * as OrderCenterServer from '../../server/orderCenterServer';
import {ErrorMSG} from '../../error/errorMsg';
import {ErrorCode} from '../../error/errorMsg';
import CourseCatalog from './catalog';
import Star from '../../common/star';
import TeacherInfo from './teacherInfo';
import Storage from '../../common/storeage';
import * as Commom from "../../public/commom/commom";
import PayerVideo from '../../player/playerVideo';
export default class CourseDescription extends Component {
    constructor(props) {
        super(props);
        this.state= {
            courseInfo: {},
            courseClass:[],
            teacherInfo:null
        }
    }

    componentDidMount(){
        this.initData();
    }

    initData(){
        this.initGetCourseDetail();
        //this.initUserBuyInfo();
    }

    initUserBuyInfo(){
        let parma=Commom.GetRequest();
        let courseId=parma.id;
        let userInfo=Storage.get("userInfo");
        StudyServer.getAjaxBuyerOneCourseWithUser(userInfo.userId,courseId,function(code,data){
                console.log(code);
        },function(e){
            console.log("异常错误");
        })
    }

    /*****/
    initGetCourseDetail(){
        let parma=Commom.GetRequest();
        let courseId=parma.id;
        let _self=this;
        let loginFlag=Storage.get("loginFlag");
        let userInfo=Storage.get("userInfo");
        let userId=(loginFlag)?userInfo.userId:undefined;
        CourseServer.getCourseDetailForUserByAjax(userId,courseId,function(code,data){

            console.log(data);
          let newCatgory=JSON.parse(data.courseInfo.category);
            console.log(newCatgory.id);
            let courseChapterList=JSON.parse(data.courseInfo.courseChapter);
            data.courseInfo.courseChapterList=courseChapterList;
            data.courseInfo.category=newCatgory;
           // let newData=Commom.clone(data);
           // _self.getCourseAllClassByAjax(courseId,newData);
            _self.setState({
                courseClass:data.courseClass,
                courseInfo:data.courseInfo
            },()=>console.log(_self.state.courseInfo.category.name))


        },function(e){
            console.log("error");
        });
    }



    openVideoPlayer(courseId){
       let loginFlag=Storage.get("loginFlag");
        if(loginFlag)
        {
            let orderInfo=this.initOrderInfo();
            console.log(orderInfo.userId);
            let userId=orderInfo.userId;
            let newOrderInfo={
                userId:userId,
                courseId:orderInfo.courseId,
                teacherId:orderInfo.owner,
                //teacherName:'',
                title: orderInfo.title,
                courseAvatar:orderInfo.courseAvatar,
                originalPrice:orderInfo.originalPrice,
                realPrice:orderInfo.realPrice,
                courseClasses:JSON.stringify(orderInfo.courseClassList),
                totalOriginalPrice:orderInfo.originalTotalPrice,
                totalRealPrice:orderInfo.realTotalPrice
            };


            OrderCenterServer.createNewOrder(userId,newOrderInfo,function(code){
               if(code==ErrorCode.SUCCESS || code==ErrorCode.COURSE_HAS_PAID){
                   location.href="player/playervideo.html?courseId="+courseId;
               }else{
                   alert("购买课程失败无法观看");
               }
            })

        }else{
            this.props.onLoginCallBack();

        }
    }
    buyCourse(courseId){
        let loginFlag=Storage.get("loginFlag");
        if(loginFlag)
        {
            this.buyCourseClass(null);
        }else{
            this.props.onLoginCallBack();
        }
    }
    buyCourseClass(classInfo){
        let parma=Commom.GetRequest();
        let courseId=parma.id;
        let loginFlag=Storage.get("loginFlag");
        let userInfo=Storage.get("userInfo");
        if(loginFlag)
        {
            let courseInfo=Commom.clone(this.state.courseInfo);
            if(!courseInfo.courseClassList){
                courseInfo.courseClassList=[];
            }
            courseInfo.userId=userInfo.userId;
            let totalInfo={};
            if(classInfo!=null){
                courseInfo.courseClassList.push(classInfo);
                totalInfo =this.getTotalPrice(courseInfo.courseClassList);
                Storage.set("orderInfo",courseInfo);

            }else{
                courseInfo.courseClassList="";
                totalInfo={
                    originalTotalPrice:courseInfo.originalPrice,
                    realTotalPrice:courseInfo.realPrice
                }
            }

                let orderInfo=Object.assign(courseInfo,totalInfo);
                Storage.set("orderInfo",orderInfo);
                if(orderInfo.realTotalPrice<=0)
                {
                    //这里需要直接提交订单
                    let loginFlag=Storage.get("loginFlag");
                    let userInfo=Storage.get("userInfo");
                    let userId=(loginFlag)?userInfo.userId:"";


                }else{
                    location.href="payCenter/index.html?courseId="+courseId;
                }



        }else{
            this.props.onLoginCallBack();
        }
    }

    initOrderInfo(classInfo=null){

        let parma=Commom.GetRequest();
        let courseId=parma.id;
        let loginFlag=Storage.get("loginFlag");
        let userInfo=Storage.get("userInfo");
        let orderInfo=null;
        if(loginFlag)
        {
            let courseInfo=Commom.clone(this.state.courseInfo);
            if(!courseInfo.courseClassList){
                courseInfo.courseClassList=[];
            }
            courseInfo.userId=userInfo.userId;
            let totalInfo={};
            if(classInfo!=null){
                courseInfo.courseClassList.push(classInfo);
                totalInfo =this.getTotalPrice(courseInfo.courseClassList);

            }else{
                courseInfo.courseClassList="";
                totalInfo={
                    originalTotalPrice:courseInfo.originalPrice,
                    realTotalPrice:courseInfo.realPrice
                }
            }

             orderInfo=Object.assign(courseInfo,totalInfo);





        }
        return orderInfo;
    }

    getTotalPrice(courseClass){
        let totalPrice=0;
        let realTotalPrice=0;

        courseClass.map(function(item,index){
            totalPrice+=parseFloat(item.originalPrice);
            realTotalPrice+=parseFloat(item.realPrice);
        })
        return {
            originalTotalPrice:totalPrice,
            realTotalPrice
        };
    }

    render() {

        let courseInfo=this.state.courseInfo;
        let teacherInfo=this.state.teacherInfo;
        let courseClass=this.state.courseClass;
        let totalStudy=100;
        let totalPinglun=3252;
        let pingBet=100;
        let isFree=(courseInfo.originalPrice==0 || courseInfo.status==255)?true:false;
        let category=courseInfo.category;

        let isEmpty=Commom.isEmptyObject(courseInfo);

        const layout={width:'560px',height:'320px'};
        const playerDataSource={
            isVideo:false,
            courseAvatar:courseInfo.courseAvatar
        };

        return (
                <div style={{background:'#eee'}}>
                    <Row style={{background:'#2E2F2D',height:'420px'}}>
                        <Grid>
                            <Col style={{padding:'20px 0px',color:'white'}}>  首页  > 全部课程 >
                                {
                                (!isEmpty)
                                    ?
                                    <span>
                                        {category.name}   > {category.child.name}  > {courseInfo.title}
                                    </span>
                                :
                                    null
                                }
                                </Col>
                            <Col sm={12} className="infoBox" >
                                <Col sm={6} style={{padding:"0px",margin:'0px',position:'relative'}}>

                                    <PayerVideo layout={layout} dataSource={playerDataSource}/>

                                </Col>
                                <Col sm={6}>

                                            <Col style={{padding:'20px 20px',position:'relative'}}>
                                                {/*<img src="images/lable.png" style={{position:'absolute',width:'50px',top:'-10px',right:'-20px'}}/>*/}
                                                <h1 style={{lineHeight:'36px',fontSize:'24px',color:'white'}}>{courseInfo.title}</h1>
                                                <p style={{padding:'10px 0px',fontSize:'12px',color:'#666'}}>{courseInfo.courseInfo}</p>
                                                <ul  style={{color:'white',lineHeight:'2em',fontSize:'12px'}}>
                                                    <li>学习人数： {totalStudy}  评论数： {totalPinglun}  好评度 {pingBet}%  </li>
                                                    {/*<li>适用人群：PHP高级开发者，初学者</li>
                                                     <li>课程难度：<Star size={3}/></li>*/}
                                                    <li>上课时间：08月10日 至 22年08月</li>
                                                    {
                                                        (!isFree)
                                                            ?
                                                            <li ><span style={{fontSize:'24px',fontWeight:'bold',color:'#EB354F'}}>${parseFloat(courseInfo.originalPrice).toFixed(2)}</span><small>支持单节购买</small></li>

                                                    :
                                                    <li  style={{fontSize:'30px',fontWeight:'bold',paddingTop:'20px',color:'#EB354F'}}><span>免费</span></li>
                                                    }
                                                        </ul>
                                                <Col style={{padding:'20px 0px'}}>
                                                    <ButtonGroup >
                                                        {
                                                            (!isFree && courseInfo.status!=255)
                                                                ?
                                                            <Button  bsStyle="danger"  bsSize="large"  onClick={()=>this.buyCourse(courseInfo.courseId)}>购买课程</Button>
                                                                :
                                                               null
                                                        }
                                                        <Button  bsStyle="success"  bsSize="large"  onClick={()=>this.openVideoPlayer(courseInfo.courseId)}>开始学习</Button>
                                                    </ButtonGroup>
                                                </Col>
                                            </Col>
                                </Col>
                            </Col>
                        </Grid>
                    </Row>
                    {/****/}
                    <Grid >
                        <div style={{clear:'both',paddingTop:'20px'}}>
                            <Col sm={8} className="infoBox" style={{background:'white'}}>
                                <Tabs defaultActiveKey={2} id="uncontrolled-tab-example" style={{padding:0,margin:0}}>
                                    <Tab eventKey={1} title="课程描述">
                                        <Col  style={{minHeight:'400px',}}>
                                            { courseInfo.detail}
                                        </Col>
                                    </Tab>
                                    <Tab eventKey={2} title="课程目录">
                                        <CourseCatalog courseId={courseInfo.courseId} isFree={isFree}  courseClass={courseClass}  chapterList={courseInfo.courseChapterList}  buyCourseClass={(classId)=>this.buyCourseClass(classId)} />
                                    </Tab>
                                    <Tab eventKey={3} title="学生评价" disabled>Tab 3 content</Tab>
                                </Tabs>
                            </Col>
                            <Col sm={4} style={{paddingRight:'0px'}}>
                                <Col style={{background:'white',padding:'20px'}}>
                                    <TeacherInfo  teachInfo={teacherInfo}/>
                                </Col>

                            </Col>
                        </div>
                    </Grid>

                </div>

        )
    }

}