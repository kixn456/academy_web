/**
 * Created by Administrator on 2017/10/20.

import React, {Component} from 'react';
import {Grid,ROW,Col,Button,Tab,Tabs,ButtonGroup} from "react-bootstrap";
import * as CourseServer from '../../server/courseCenterServer';
import CourseCatalog from './catalog';
import Star from '../../common/star';
import TeacherInfo from './teacherInfo';
import Storage from '../../common/storeage';
export default class CourseDescription extends Component {
    constructor(props) {
        super(props);
        this.state= {
            courseInfo: {},
            teacherInfo:null
        }
    }

    componentDidMount(){
        this.initData();
    }

    initData(){
        let courseId=123456;
        let _self=this;
        CourseServer.getCourseDetailByAjax(courseId,function(data){
            _self.getCourseInfo(data);
        },function(e){
            console.log("error");
        });
    }
    getCourseInfo(data){
        this.setState({
            courseInfo:data.responseInfo
        });
    }
    openVideoPlayer(courseId){
        let loginFlag=Storage.get("loginFlag");
        if(loginFlag)
        {
            location.href="player/playervideo.html?courseId="+courseId;
        }else{
            this.props.onLoginCallBack();

        }
    }
    buyCourse(courseId){
        let loginFlag=Storage.get("loginFlag");
        if(loginFlag)
        {
            location.href="payCenter/index.html?courseId="+courseId;
        }else{
            this.props.onLoginCallBack();

        }
    }

    render() {

        let courseInfo=this.state.courseInfo;
        let teacherInfo=this.state.teacherInfo;
        let totalStudy=100;
        let totalPinglun=3252;
        let pingBet=100;
        return (
            <div style={{background:'#eee',paddingTop:'20px'}}>
            <Grid >
                <Col style={{padding:'20px 0px'}}>  首页  > 全部课程 >  编程开发  > 编程语言 >  Java >  课程详情</Col>
                <Col sm={12} className="infoBox" >
                <Col sm={5} style={{padding:"0px",margin:'0px'}}>
                    <img src="images/img12.jpg" style={{float:"left"}}/>
                </Col>
                <Col sm={7}>
                    {
                        (courseInfo==null)
                        ?
                            null
                          :
                            <Col style={{padding:'20px 0px',position:'relative'}}>
                                <img src="images/lable.png" style={{position:'absolute',width:'50px',top:'-10px',right:'-20px'}}/>
                                <h1 style={{lineHeight:'36px',fontSize:'24px',color:'green'}}>{courseInfo.title}</h1>
                                <p style={{padding:'10px 0px',fontSize:'14px'}}>{courseInfo.courseInfo}</p>
                                    <ul>
                                        <li>适用人群：PHP高级开发者，初学者</li>
                                        <li>课程难度：<Star size={3}/></li>
                                        <li>讲师级别：<Star size={3}/></li>
                                        <li>上课时间：08月10日 至 22年08月</li>
                                        <li>学习人数： {totalStudy}  评论数： {totalPinglun}  好评度 {pingBet}%  </li>
                                    </ul>
                                <Col>
                                    <ButtonGroup style={{float:'right'}}>
                                        <Button  bsStyle="danger"  bsSize="large"  onClick={()=>this.buyCourse(courseInfo.id)}>购买课程</Button>
                                        <Button  bsStyle="success"  bsSize="large"  onClick={()=>this.openVideoPlayer(courseInfo.id)}>开始学习</Button>
                                    </ButtonGroup>
                                </Col>
                            </Col>
                    }

                </Col>
                </Col>
                {/****/}

                <div style={{clear:'both',paddingTop:'20px'}}>
                    <Col sm={8} className="infoBox">
                        <Tabs defaultActiveKey={2} id="uncontrolled-tab-example" style={{padding:0,margin:0}}>
                            <Tab eventKey={1} title="课程描述">
                               <Col  style={{minHeight:'400px'}}>
                                   {
                                       courseInfo.detail
                                   }
                               </Col>

                            </Tab>
                            <Tab eventKey={2} title="课程目录">

                                <CourseCatalog chapterList={courseInfo.courseChapterList}/>

                            </Tab>
                            <Tab eventKey={3} title="学生评价" disabled>Tab 3 content</Tab>
                        </Tabs>

                    </Col>
                    <Col sm={4} style={{paddingRight:'0px'}}>
                        <TeacherInfo teachInfo={teacherInfo}/>
                    </Col>
                </div>
            </Grid>
            </div>
        )
    }

}