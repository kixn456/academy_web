/**
 * Created by Jeastone on 2017/9/18.
 */
import React, { Component } from 'react';
import {Row,Col,Image,OverlayTrigger,Popover,ButtonToolbar,Button} from "react-bootstrap";
import * as Commom from '../public/commom/commom';
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
                pageUrl='teachCenter/index.html';
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
      return(
            <Col>
            <Col>
                <Image  src={basePath+"images/symbol/aze.jpg"} width={60 } circle  style={{float:'left',marginTop:0}}/>
                <span style={{float:'left',marginLeft:"20px",marginTop:10}}>
                            欢迎您！18500788688<br/>
                            帐户积分:100
                        </span>
            </Col>
            <div className="clearfix"></div>
        <Col>
            <ButtonToolbar style={{ padding: '10px 30px' }}>
                <Button>帐户管理</Button>
                <Button>学习中心</Button>
                <div className="clearfix" style={{marginBottom:"10px"}}></div>
                <Button onClick={()=>this.goto('teachCenter')}>教学中心</Button>
                <Button>帐户中心</Button>
            </ButtonToolbar>
            <Button bsStyle='warning' block onClick={()=>this.logoutCallBack()}>退出登录  </Button>
        </Col>
            </Col>
        )
    }
}
