
/**
 * Created by Administrator on 2017/10/23.
 *@description
 *@author
 *@out
 */


import React,{Component} from 'react';
import {Grid,Row,Col} from "react-bootstrap";
import * as Commom from '../../public/commom/commom';
import  * as TeacherCenterServer from '../../server/teachCenterServer';
import * as UserCenterServer from '../../server/userCenterServer'
export default class CourseListByTeacher extends Component{
    constructor(props) {
        super(props);
        this.state={
                isRefreshing:false
        };
        this.userId=Commom.GetRequest().teacherId;
        this.courseList=[];
        this.teacherInfo={};
        this.pageInfo={
            startCreateTime:'2017-12-30 00:00:00',
            endCreateTime:'2017-12-30 00:00:01',
            userId:parseInt(this.userId),
            category:'tcoursepub',
            pageSize:10,
            pageNum:1,
            status:10240
        }
    }

    componentDidMount(){
        console.log(this.userId);
        this.initData();
        this.getTeacherInfo(this.userId);
    }

    initData(){
        let _self=this;
        let ajaxData=this.pageInfo;
        TeacherCenterServer.getCourseListWithTeacher(ajaxData,function(code,data){
                console.log(data);
            _self.courseList=data.list;
            _self.refreshRender();
        },function(data){

        })
    }
    getTeacherInfo(userId){
            let _self=this;
        UserCenterServer.getTeacherInfo(userId,'',function(code,data){
                console.log(data);
            _self.teacherInfo=data;
            _self.refreshRender();
        },function(e){

        })
    }
    refreshRender(){
            let isRefreshing=this.state.isRefreshing;
            this.setState({
            isRefreshing:!isRefreshing
        })
    }
    render(){
            let _self=this;
            let courseList=_self.courseList,
                teacherInfo=_self.teacherInfo;
            let securityUser=teacherInfo.securityUser;
        return (
        <div>
        <Col style={{height:'200px',backgroundColor:'#6f5499',marginTop:'64px'}}>
                <Grid>
                        <Col sm={12} style={{padding:'50px 0px',color:'white'}}>
                                <Col  sm={2}>
                                <img src={teacherInfo.photo} style={{width:'100px',borderRadius:'100px'}}/>
                                </Col>
                                <Col  sm={6}>
                                <Col style={{marginTop:'10px',color:'#f1f1f1'}}>
                                        <h3 style={{fontSize:'24px',color:'white',fontWeight:'bold'}}>{(securityUser)?securityUser.displayName:''}</h3>
                                    {teacherInfo.resume}
                                    {teacherInfo.specialties}
                                        <br/>
                                    {teacherInfo.accomplishment}
                                </Col>
                                </Col>
                        </Col>
                </Grid>
        </Col>

            <Grid sm={12}>

                    <Col  sm={12} style={{padding:0}}>
                        {
                            courseList.map(function(item,index){

                                            let orderData=JSON.parse(item.orderData);
                                            let courseId=orderData.courseId;
                                            let imgUrl=Commom.formatServerPhoto(orderData.courseAvatar);
                                            let category=JSON.parse(orderData.category);
                                        return (
                                            <Col sm={12} key={index} style={{marginTop:'10px',borderBottom:'1px solid #ececec',padding:0}}>
                                                    <Col sm={2} style={{paddingLeft:0}}>
                                                            <a href={"../courseDetail.html?id="+orderData.courseId}> <img src={imgUrl.middlePhoto} style={{width:'160px'}}/></a>
                                                    </Col>
                                                    <Col sm={7} style={{paddingLeft:'20px'}}>
                                                            <a href={"../courseDetail.html?id="+orderData.courseId}><h4> {orderData.title}</h4></a>
                                                            <span style={{color:'#747474'}}>课程介绍：{orderData.courseInfo}</span>
                                                        <br/>
                                                            <span style={{color:'#51ca1c'}}>价格:{orderData.realPrice>0?(orderData.realPrice).toFixed(2):"免费"}</span>
                                                    </Col>
                                                    <Col sm={2}>
                                                            <i className="glyphicon glyphicon-share"></i>
                                                            &nbsp;&nbsp;&nbsp;
                                                            <i className="glyphicon glyphicon-heart"></i>
                                                    </Col>
                                            </Col>
                                        )
                                })
                        }
                    </Col>

            </Grid>
        </div>
        )
    }
}







