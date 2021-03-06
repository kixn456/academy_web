/**
 * Created by Jeastone on 2017/9/18.
 */
import React, { Component } from 'react';
import {Row,Col,Image,OverlayTrigger,Popover,ButtonToolbar,Button} from "react-bootstrap";
import * as Commom from '../public/commom/commom';
import  Stroage from '../common/storeage';
const basePath=Commom.getRootPath();
export default class LoginSuccess extends Component {
    constructor(props) {
        super(props);
    }

    goto(pageName){
        //
        let pageUrl='';
        switch(pageName){
            case 'teachCenter':
                pageUrl=basePath+'teachCenter/index.html';
                break;
            case 'studyCenter':
                pageUrl=basePath+'studyCenter/index.html';
                break;
            case 'userCenter':
                pageUrl=basePath+'userCenter/index.html';
                break;
        }
        location.href=pageUrl;
    }
    logoutCallBack(){
       //注销登录

        this.props.logoutCallBack()
    }
    render()
    {
        let userInfo=Stroage.get("userInfo");
        //let userName=userInfo.username;

      return(
            <Col>
            <Col>
                <Image src={userInfo.avatar} width={60} circle  style={{float:'left',marginTop:0}}/>
                <span style={{float:'left',marginLeft:"20px",marginTop:10}}>
                            欢迎您！{userInfo.displayName}<br/>
                            帐户积分:100
                        </span>
            </Col>
            <div className="clearfix"></div>
        <Col>
            <ButtonToolbar style={{ padding: '10px 30px' }}>
                <Button >帐户管理</Button>
                <Button  onClick={()=>this.goto('studyCenter')}>学习中心</Button>
                <div className="clearfix" style={{marginBottom:"10px"}}></div>
                <Button onClick={()=>this.goto('teachCenter')}>教学中心</Button>
                <Button　onClick={()=>this.goto('userCenter')}>用户中心</Button>
            </ButtonToolbar>
            <Button bsStyle='warning' block onClick={()=>this.logoutCallBack()}>退出登录  </Button>
        </Col>
            </Col>
        )
    }
}
