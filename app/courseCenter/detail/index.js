/**
 * Created by Administrator on 2017/10/20.
 */

import React, {Component} from 'react';
import {Grid,Row,Col,Button,Tab,Tabs,ButtonGroup} from "react-bootstrap";
import * as CourseServer from '../../server/courseCenterServer';
import * as StudyServer from '../../server/studyCenterServer';
import * as OrderCenterServer from '../../server/orderCenterServer';
import {ErrorMSG} from '../../error/errorMsg';
import {ErrorCode} from '../../error/errorCode';
import CourseCatalog from './catalog';
import Star from '../../common/star';
import TeacherInfo from './teacherInfo';
import Storage from '../../common/storeage';
import * as Commom from "../../public/commom/commom";
import PayerVideo from '../../player/playerVideo';
import Discuss from './discuss';
const basePath=Commom.getRootPath();
const MONEY_TYPE="￥";
export default class CourseDescription extends Component {
    constructor(props) {
        super(props);
        this.state= {
            courseInfo: {},
            courseClass:[],
            teacherInfo:null,
            teacherCounter:null
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
        let loginFlag=this.props.loginFlag;
        let userInfo=Storage.get("userInfo");
        let userId=(loginFlag)?userInfo.userId:undefined;
        CourseServer.getCourseDetailForUserByAjax(userId,courseId,function(code,data){
            data.courseInfo=data.courseTeacher;
          let newCatgory=JSON.parse(data.courseInfo.category);
          if(typeof newCatgory=="string"){

              newCatgory=JSON.parse(newCatgory);
          }
            let courseChapterList=JSON.parse(data.courseInfo.courseChapter);
            data.courseInfo.courseChapterList=courseChapterList;
            data.courseInfo.category=newCatgory||null;
            document.title = data.courseInfo.title;
            _self.setState({
                courseClass:data.courseClass,
                courseInfo:data.courseInfo,
                teacherCounter:data.teacherCounter
            },()=>console.log(_self.state.courseInfo.category.name))
        },function(e){
            console.log("error");
        });
    }

    openVideoPlayer(courseId){
        console.log(courseId);
       let loginFlag=this.props.loginFlag;
        if(loginFlag)
        {
            let orderInfo=this.initOrderInfo();

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
                   //location.href="player/playervideo.html?courseId="+courseId;
                   window.open("player/playervideo.html?courseId="+courseId,"视频播放");
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

    buyTotalCourse(){
        let loginFlag=Storage.get("loginFlag");
        let userInfo=Storage.get("userInfo");
        let parma=Commom.GetRequest();
        let courseId=parma.id;
        if(!loginFlag){
            this.props.onLoginCallBack();
        }else{
            let courseInfo=Commom.clone(this.state.courseInfo);
            courseInfo.userId=userInfo.userId;
            let totalInfo={};
            if(courseInfo.status!=255)
            {
                totalInfo={
                    originalTotalPrice:courseInfo.originalPrice,
                    realTotalPrice:courseInfo.realPrice
                }

                let orderInfo=Object.assign(courseInfo,totalInfo);
                Storage.set("orderInfo",orderInfo);
                location.href="payCenter/index.html?courseId="+courseId;
            }
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

                if(classInfo!=null)
                {
                    //如果单课时购买的真实价格状态及总课程都没有购买
                    if(classInfo.realPrice<=0 || classInfo.status==255 || orderInfo.status==255)
                    {
                        window.open("player/playervideo.html?courseId="+courseId+"&videoId="+classInfo.videoId,"视频播放");
                    }else{
                        if(orderInfo.realTotalPrice<=0)
                        {
                            //这里需要直接提交订单
                            let loginFlag=this.props.loginFlag;
                            let userInfo=Storage.get("userInfo");
                            let userId=(loginFlag)?userInfo.userId:"";
                            Storage.set("videoId",classInfo.videoId);
                            //这里先测试跳入视频播放界面
                            //location.href="payCenter/index.html?courseId="+courseId+"&videoId="+classInfo.videoId;
                            window.open("player/playervideo.html?courseId="+courseId,"视频播放");
                        }else{
                            location.href="payCenter/index.html?courseId="+courseId;
                        }
                    }
                }
        }else{
            this.props.onLoginCallBack();
        }
    }

    initOrderInfo(classInfo=null){

        let parma=Commom.GetRequest();
        let courseId=parma.id;
        let loginFlag=this.props.loginFlag;
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
    componentDidUpdate() {
        this.refs.goods_detail_content.innerHTML=this.state.courseInfo.detail;
    }

    render() {

        let courseInfo=this.state.courseInfo;
        let teacherInfo=this.state.teacherInfo;
        let courseClass=this.state.courseClass;
        let teacherCounter=this.state.teacherCounter;
        let totalStudy=100;
        let totalPinglun=3252;
        let pingBet=100;
        let isFree=(courseInfo.originalPrice==0)?true:false;
        let category=courseInfo.category;

        let isEmpty=Commom.isEmptyObject(courseInfo);
        let buyTextInfo=(isFree)?"免费": MONEY_TYPE+parseFloat(courseInfo.originalPrice).toFixed(2);
        let courseTxt=(isFree)?"免费":(courseInfo.status==255)?"已购买":"支持单节购买";
        let buyerTextShow=(isFree)?"免费":(courseInfo.status==255)?"你已购买该课程":"";


        const layout={width:'560px',height:'320px'};
        const playerDataSource={
            isVideo:false,
            courseAvatar:courseInfo.courseAvatar
        };

        return (
                <div style={{background:'#eee'}}>
                    <Row style={{background:'#FFFFFF',height:'420px',marginTop:'60px'}}>
                        <Grid>
                            <Col style={{padding:'20px 0px',fontSize:'12px'}}> <a href={basePath+"index.html"}> 首页 </a> > 全部课程 >
                                {
                                (!isEmpty)
                                    ?
                                    <span>
                                        {category.name}  > {category.child.name}  > {courseInfo.title}
                                    </span>
                                :
                                    null
                                }
                                </Col>
                            <Col sm={12} className="infoBox" style={{padding:0,position:'relative'}}>
                                <Col sm={6} style={{padding:"0px",margin:'0px',position:'relative'}}>

                                    <PayerVideo layout={layout} openPlayer={()=>this.openVideoPlayer(courseInfo.courseId)}dataSource={playerDataSource}/>

                                </Col>
                                <Col sm={6}>

                                            <Col style={{padding:'0px 20px',height:'342px'}}>
                                                {/*<img src="images/lable.png" style={{position:'absolute',width:'50px',top:'-10px',right:'-20px'}}/>*/}
                                                <h1 style={{lineHeight:'36px',fontSize:'24px',fontWeight:'bold'}}>{courseInfo.title}</h1>
                                                <Col className="customTitleCourseList" style={{height:'60px',color:'#666'}}>{courseInfo.courseInfo}</Col>
                                                <Col className="customTitleCourseList">学习人数： {totalStudy}  评论数： {totalPinglun}  好评度 {pingBet}%  </Col>
                                                <Col className="customTitleCourseList">上课时间：08月10日 至 22年08月</Col>
                                                <Col className="customTitleCourseList">
                                                    {
                                                        (!isFree)
                                                            ?
                                                           <s>{buyTextInfo}</s>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        (!isFree)
                                                            ?
                                                            <Col  style={{fontSize:'20px',fontWeight:'bold',color:'#EB354F'}}>
                                                                <span style={{fontSize:'14px'}}>
                                                                    折扣价格：
                                                                </span>
                                                                {MONEY_TYPE+parseFloat(courseInfo.realPrice).toFixed(2)}
                                                                <span style={{fontSize:'12px',color:'#666666',fontWeight:'normal',paddingLeft:'1em'}}>{courseTxt}</span>
                                                            </Col>
                                                            :
                                                            null
                                                    }

                                                </Col>

                                                <Col  sm={12} style={{marginBottom: '30px',padding:0,color:'#51CA1C'}}>
                                                    <div className="customCourseText">
                                                        {buyerTextShow}
                                                        </div>
                                                </Col>
                                                <Col style={{ position:'absolute',left:'30px',bottom:'10px'}}>

                                                        {
                                                            (courseInfo.status==255)
                                                                ?
                                                                <a className="customeBtn" style={{backgroundColor:'rgb(81, 202, 28)',padding:'13px 50px',color:'white',marginBottom:'20px'}} href={"player/playervideo.html?courseId="+courseInfo.courseId} target="_blank"  >继续学习</a>
                                                              /*  <Button className="customeBtn" bsStyle="success"  bsSize="large"  onClick={()=>this.openVideoPlayer(courseInfo.courseId)}>继续学习</Button>*/
                                                                :
                                                                (isFree)
                                                                    ?
                                                                    <Button  bsStyle="success"  bsSize="large" className="customeBtn" onClick={()=>this.openVideoPlayer(courseInfo.courseId)}>开始学习</Button>
                                                                        :
                                                                <Button  bsStyle="danger"  bsSize="large"  className="customeBtn" onClick={()=>this.buyTotalCourse(courseInfo.courseId)}>购买课程</Button>
                                                        }

                                                </Col>
                                                <div style={{ position:'absolute',right:'30px',bottom:'0px'}}>
                                                    <span className="glyphicon glyphicon-heart" style={{marginLeft:'30px',color:'#666666'}}></span>
                                                    <span className="glyphicon glyphicon-share" style={{marginLeft:'30px',color:'#666666'}}></span>
                                                </div>
                                            </Col>
                                </Col>
                            </Col>
                        </Grid>
                    </Row>
                    {/****/}
                    <Grid >
                        <div style={{clear:'both',paddingTop:'20px'}}>
                            <Col sm={8} className="infoBox" style={{background:'white',padding:0}}>
                                <Tabs defaultActiveKey={2}  id="tabsaActive" style={{padding:0}}>
                                    <Tab eventKey={1} title="课程描述">
                                        <Col  style={{minHeight:'400px',padding:'10px'}}>
                                            <div  style={{padding:'10px'}} ref="goods_detail_content"></div>
                                        </Col>
                                    </Tab>
                                    <Tab eventKey={2} title="课程目录">
                                        <Col>
                                            <CourseCatalog callLogin={()=>this.callLogin()} courseId={courseInfo.courseId} isFree={isFree} courseStatus={courseInfo.status} courseClass={courseClass}  chapterList={courseInfo.courseChapterList}  buyCourseClass={(classId)=>this.buyCourseClass(classId)} />
                                        </Col>
                                    </Tab>
                                    <Tab eventKey={3} title="学生评价" >
                                        <Discuss courseId={courseInfo.courseId}></Discuss>
                                    </Tab>
                                </Tabs>
                            </Col>
                            <Col sm={4} style={{paddingRight:'0px'}}>
                                <Col style={{background:'white',padding:'20px'}}>
                                    <TeacherInfo teacherCounter={teacherCounter} teachInfo={courseInfo.teacherInfo}/>
                                </Col>
                            </Col>
                        </div>
                    </Grid>

                </div>

        )
    }

}