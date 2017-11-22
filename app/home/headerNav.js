import React,{ Component } from 'react';
import Storage from "../common/storeage";
import {Grid,Col,Row,Image,OverlayTrigger,Popover,Button} from "react-bootstrap";
import HeaderMenu from './header/index';
import {HomeNavData}  from '../config/configMenu';
import SearchBox from '../userCenter/search'
import LoginSuccess from "../login/loginSuccess";
import * as Commom from '../public/commom/commom';
console.log(Commom.getRootPath());
const basePath=Commom.getRootPath();
    export default class HeaderNav extends Component {
        constructor(props) {
            super(props);
        }

        componentDidMount()
        {

        }


        render() {
            let loginFlag=this.props.loginFlag;
            let loginViewModal=null;

            const popoverBottom = (
                <Popover id="popover-positioned-bottom" style={{backgroundColor:'rgba(255,255,255,0.8)',position:'fixed',zIndex:9999}}>
                    <LoginSuccess logoutCallBack={()=>this.props.logoutCallBack()}/>
                </Popover>
            );
            if(loginFlag){
                loginViewModal=<Col sm={1}>
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popoverBottom}>
                        <a href="javascript:void(0);"><Image  src= {basePath+"images/symbol/aze.png"} width={40} circle /></a>
                    </OverlayTrigger>
                </Col>
            }else{
                loginViewModal= <a href="javascript:void(0);"><Image className='gray' onClick={()=>this.props.loginModalControl()} src={basePath+"images/symbol/aze.png"} width={40} circle /></a>
            }
        return (
            <div className="header">
                <Grid>
                    <Row >
                        <Col sm={3}>
                            <div className="logo">
                                <a href="index.html"><img src={basePath+"images/logo.png"} title="logo" /></a>
                            </div>
                        </Col>
                        <Col sm={3}> <SearchBox/></Col>
                        <Col sm={5}>
                            <HeaderMenu menuList={HomeNavData} />
                        </Col>
                        <Col>
                            {loginViewModal}
                        </Col>

                    </Row>
                </Grid>
            </div>
        )
    }
}


