/**
 * Created by Administrator on 2017/9/29.
 */

import React, {Component} from 'react';
import {Grid,Col,Row,Label,Image,OverlayTrigger,Popover,Button} from "react-bootstrap";
import ModifyUserInfo from './ModifyUserInfo'
export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state={
            showModal:false,
            userInfo:{
                nickName:'李国强',
                sex:'李国强',
                job:'部门经理',
                company:'信威集团',
                address:'北京海滨区',
                sign:'helison'
            }
        }
    }

    showModify(){
        this.setState({
            showModal:true
        })
    }
    closeModify(){
        this.setState({
            showModal:false
        })
    }
    render() {
        let state=this.state.userInfo;
        let showModal=this.state.showModal;
        return (
                <div>
                    <ModifyUserInfo show={showModal} closeHandle={()=>this.closeModify()}/>
                <div style={{padding:'0px 14px' }}>
                    <div style={{borderBottom:'1px solid #ccc',lineHeight:'60px'}}>
                        <span>用户信息</span>
                       <span style={{float:'right'}}>
                           <Button onClick={()=>this.showModify()}>
                               编辑
                           </Button>
                           </span>
                    </div>

                        <Row className='userInfoList'>
                            <Col sm={2}  className='userInfoList_left'>呢称</Col>
                            <Col sm={10} className='userInfoList_right' style={{borderBottom:'1px solid #eee'}}>
                                {state.nickName}
                            </Col>
                        </Row>

                        <Row  className='userInfoList'>
                            <Col sm={2}  className='userInfoList_left' >职位</Col>
                            <Col sm={10} className='userInfoList_right' style={{borderBottom:'1px solid #eee'}}>
                                {state.job}
                            </Col>
                        </Row>
                        <Row  className='userInfoList'>

                            <Col sm={2} className='userInfoList_left' >地区</Col>
                            <Col sm={10} className='userInfoList_right' style={{borderBottom:'1px solid #eee'}}>
                                {state.address}
                            </Col>
                        </Row>
                        <Row  className='userInfoList'>

                            <Col sm={2}  className='userInfoList_left'>性别</Col>
                            <Col sm={10} className='userInfoList_right' style={{borderBottom:'1px solid #eee'}}>
                                {state.sex}
                            </Col>
                        </Row>
                        <Row  className='userInfoList'>

                            <Col sm={2}  className='userInfoList_left' >签名</Col>
                            <Col sm={10} className='userInfoList_right' style={{borderBottom:'1px solid #eee'}}>
                                {state.sign}
                            </Col>
                        </Row>
                </div>
                </div>
        )
    }

}