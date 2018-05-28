/**
 * Created by Administrator on 2017/11/7.
 *@description
 *@author
 *@out
 */

import React, {Component} from 'react';
import {Grid,Row,Col,Thumbnail,Image,FormGroup,FormControl,ControlLabel,Button} from "react-bootstrap";
import * as StudyServer from '../../server/studyCenterServer';



export default class QuesionDetail extends Component {
    constructor(props) {
        super(props);
        this.state={
            taskList:[],

        }
    }
    componentDidMount(){
        this.initData();
    }
    initData(){
        let userId=123;
        let _self=this;
        StudyServer.getQuestionListWithUser(userId,function(data){

            _self.setState({
                taskList:data.responseInfo.taskList
            })
        })
    }

    render() {
        let taskList=this.state.taskList;
        return (

            <div style={{overflow:'hidden'}}>
                <Col   xs={12} md={12}>
                    <div className="page-header">
                        <h1>我的问答 <small>Subtext for header</small></h1>
                    </div>
                </Col>
                <Col xs={12} md={12}>
                    <Col xs={8} className="caption">
                    <h3>JAVA开发/Nginx/NoSQL/高并发/架构/集群/性能优化？</h3>
                        <div><span><Image src="../images/symbol/aze.jpg" style={{width:'30px'}}/></span> 板栗君
                            会努力照顾好宝宝和金毛 2017-11-25   12：00：00</div>
                        <div style={{padding:'10px 0px'}}>尽信书则不如无书，客观的数据也会带有迷惑性。比如在统计用户反馈时，只有几个用户反馈某个问题，这些反馈在整个问题里占比只有1%，你觉得占比太低不加以重视，但是有可能另外99%遇到这个问题的用户很可能卸载产品了。
                            在日常工作中， 产品经理要避免哪些数据的坑呢？</div>
                    </Col>
                    <Col xs={4}><Image src="../images/img22.jpg"/></Col>
                </Col>

                <Col xs={12} md={12} style={{paddingTop:'20px',overflow:'hidden'}}>
                    <FormGroup controlId="formControlsTextarea" >
                        <FormControl componentClass="textarea" style={{height:'140px'}} placeholder="textarea" />

                    </FormGroup>
                    <Col  xs={12}></Col>
                        <Button bsStyle="success">提交答案</Button>

                </Col>

            </div>

        )
    }

}