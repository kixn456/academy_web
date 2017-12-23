/**
 * Created by Administrator on 2017/11/23.
 */

/**
 * Created by Administrator on 2017/9/30.
 *@description
 *@author
 *@out
 */

import React,{Component} from 'react';
import  ReactDOM from 'react-dom';
import {Grid,Row,Col,Button,Radio} from "react-bootstrap";

import "../../css/style.css";
import * as Commom from '../public/commom/commom';
import UserHeader from '../userCenter/userHeader'
import {Link } from 'react-router';
const basePath=Commom.getRootPath();
export default class PaySuccess extends Component{
    gotoDetail(id){
        location.href=basePath+"courseDetail.html?id="+id
    }
    gotoStudyCenter(id){
        location.href=basePath+"studyCenter/index.html";
    }
    render(){
        return (
            <Col md={12} className="bounceInDown animated" style={{marginBottom:'30px'}}>

                <Col>

                    <Col style={{textAlign:'center'}}>
                        <div><img src={basePath+"images/pay/paySuccess.png"} /></div>
                    </Col>
                    <Col>
                        <Col style={{textAlign:'center',marginTop:'20px'}}>
                            <Button style={{marginRight:'20px'}} onClick={()=>this.gotoDetail('789')}>开始学习</Button>
                            <Button onClick={()=>this.gotoStudyCenter('789')}>我的课程</Button>
                        </Col>
                    </Col>

                </Col>
            </Col>

        )
    }
}


const styles={
    radioSel:{

        float:'left',
        marginRight:'50px'
    },
    radioShow:{
        marginTop:'20px',
        float:'left',
        marginRight:'5px'

    }
}





