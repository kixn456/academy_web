/**
 * Created by Jeastone on 2017/9/13.
 */
import React,{ Component } from 'react';
import {Grid,Row,Col,Image,small} from "react-bootstrap";
import Star from '../../common/star';
export default class TeacherItem extends Component {

    selectedTeacher(teacherId){
        location.href="./teachCenter/homeTeacherCourseList.html?teacherId="+teacherId;
    }
    render(){
        let teacherInfo=this.props.dataSource;
        return(

            <Col sm={4} onClick={()=>this.selectedTeacher(teacherInfo.userId)}>
                <Col  className="teacherItem">
                    <Col xs={3} md={3}>
                        <a href="#">
                            <Image src={teacherInfo.photo} circle/>
                        </a>
                    </Col>
                    <Col xs={6} md={9}>
                        <p style={{fontSize:'16px',fontWeight:'bold'}}>{teacherInfo.securityUser.displayName} <span style={{float:'right'}}><Star size={teacherInfo.teacherStar}/></span></p>
                        {/*<p><small>讲师级别：<Star size={this.props.dataSource.teacherStar}/></small></p>*/}
                        <p style={{marginTop:'10px'}}>讲师简介：{teacherInfo.resume}</p>
                        <p style={{marginTop:'10px'}}>擅长领域：{teacherInfo.specialties}</p>
                        <p style={{marginTop:'10px'}}>个人成就：{teacherInfo.accomplishment}</p>
                    </Col>
                </Col>
            </Col>
        )
    }
}
