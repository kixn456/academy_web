/**
 * Created by Jeastone on 2017/9/18.
 */
import React, { Component } from 'react';
import {Modal,Button,Row,Col,Image} from "react-bootstrap";
import  LoginForm from './login';
import Storage from '../common/storeage';
import LoginSuccess from './loginSuccess';

export default class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginSuccss:false
        }
    }
    componentDidMount()
    {
        this.initLoginFlag();
    }
    //初始化登录状态
    initLoginFlag(){
        let loginSuccss=Storage.get("loginFlag");
        this.lisentCallBack({loginSuccss});
    }
    hideModal() {
        this.props.closeModalCallBack(false);
    }

    //监听登录状态
    lisentCallBack(loginSuccess)
    {
        this.setState(loginSuccess);
    }
    render()
    {
        console.log("======="+this.props.show);
        return(
            <div className="static-modal"  >
                <Modal
                    show={this.props.show}
                    onHide={this.hideModal.bind(this)}
                >
                    <Modal.Header  closeButton>
                        <Modal.Title> 登录</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {
                            (this.state.loginSuccss)
                                ?
                                <Col>

                                    <div style={{overflow:'hidden'}}> <Image src={"images/symbol/aze.jpg"} width={100} rounded style={{float:'left'}}/>登录成功</div>
                                </Col>
                                :
                                <LoginForm callHandle={(data)=>this.lisentCallBack(data)}/>
                        }
                    </Modal.Body>
                </Modal>
            </div>

        )
    }
}
