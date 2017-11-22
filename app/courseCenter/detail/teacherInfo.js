/**
 * Created by Administrator on 2017/10/23.
 *@description
 *@author
 *@out
 */

/**
 * Created by Administrator on 2017/10/20.
 */

import React, {Component} from 'react';
import {Grid,Row,Col,Button,Tab,Tabs,Icon,Image} from "react-bootstrap";

export default class TeacherInfo extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        let teacherInfo=this.props.teacherInfo;
        return (
            <Col  className="infoBox" >
                <Col>
                    <Col sm={5}>
                        <Image src="images/img10.jpg" style={{width:'100px'}} circle />
                    </Col>
                    <Col sm={7}>
                        <p style={{paddingTop:'40px'}}>

                            <span style={{fontSize:'24px'}}>ALABO</span>
                            <br/> <span style={{fontSize:'12px'}}>移动开发工程师</span>
                        </p>

                    </Col>
                </Col>
                <div style={{clear:'both', textAlign:'center'}}>
                    <Col sm={4}>课程数<br/>18</Col>
                    <Col sm={4}>好评度<br/>522</Col>
                    <Col sm={4}>学生数<br/>1000</Col>
                 </div>
                <div style={{paddingTop:'10px',clear:'both'}}>
                    <Col style={{textIndent:'2em',fontSize:'14px'}}>
                        唐宇迪，计算机博士，专注于机器学习与计算机视觉领域，深度学习领域一线实战专家。参与多个国家级计算机视觉项目，多年数据领域培训经验，丰富的教学讲解经验，出品多套机器学习与深度学习系列课程，课程生动形象，风格通俗易懂。
                    </Col>
                </div>

            </Col>
        )
    }

}

