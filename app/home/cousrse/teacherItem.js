/**
 * Created by Jeastone on 2017/9/13.
 */
import React,{ Component } from 'react';
import {Grid,Row,Col,Image,small} from "react-bootstrap";
import Star from '../../common/star';
export default class TeacherItem extends Component {
    render(){
        return(

            <div className="teacherItem" >

                <Col xs={3} md={3}>
                    <a href="#">
                        <Image src="images/symbol/mao.jpg" circle/>
                    </a>
                </Col>
                <Col xs={6} md={9}>
                    <p style={{fontSize:'16px',fontWeight:'bold'}}>{this.props.dataSource.teacher} <span style={{float:'right'}}><Star size={this.props.dataSource.teacherStar}/></span></p>
                    {/*<p><small>讲师级别：<Star size={this.props.dataSource.teacherStar}/></small></p>*/}
                    <p style={{marginTop:'10px'}}>{this.props.dataSource.discription}</p>
                </Col>
            </div>
        )
    }
}
