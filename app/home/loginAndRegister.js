/**
 * Created by JeatStone on 2017/9/21.
 * @课程分类
 * @pamra DataSource
 *
 */
import React,{ Component } from 'react';

import {Grid,ROW,Col,Tabs,Tab,Modal,Button,ButtonGroup} from "react-bootstrap";
//登录弹窗
import Login from "../login/Login";

//注册弹窗
import Register from '../register/register';
export default class ClassItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginModalVisible: true,
            registerModalVisible:false
        };
    }

    componentDidMount(){
        this.initShowModal(this.props.showType);
    }

    componentWillReceiveProps(nextProps){
        this.initShowModal(nextProps.showType);
    }

    initShowModal(showType){
        let showFlag=(showType=='login')?true:false;
        this.setState({
            loginModalVisible:showFlag,
            registerModalVisible:!showFlag
        })
    }

    //回调关闭弹窗事件侦听
    lisentCallBack(loginSuccess)
    {
        let thisProps=this.props;
        thisProps.loginsSuccessCallBack();
        //成功登录后关闭弹窗
        this.hideModal();
    }

    //关闭弹窗按钮点击回调
    hideModal() {
        let thisProps=this.props;
        thisProps.closeModalCallBack(false);
    }

    modalExchnage(){
         let loginVisible=this.state.loginModalVisible;
        this. loginAndRegisterModalVisible(!loginVisible,'login');
        // this.LoginModalControl(!modalVisible);

    }

    loginAndRegisterModalVisible(showFlag,showType){

        console.log("8888888");
       if(showType=='login')
       {

           this.setState({
               loginModalVisible:showFlag,
               registerModalVisible:!showFlag
           })
       }

       if(showType=='register'){
           this.setState({
               loginModalVisible:!showFlag,
               registerModalVisible:showFlag
           })
       }


    }

    //注册弹窗控制
    RegisterModalControl(visibleFlag)
    {
        this.loginAndRegisterModalVisible(visibleFlag,'register');
        // this.setState({
        //     loginModalVisible:(visibleFlag==true)?true:false
        // })

    }
    //登录弹窗控制
    LoginModalControl(visibleFlag)
    {
        this.loginAndRegisterModalVisible(visibleFlag,'login');
        // this.setState({
        //     loginModalVisible:(visibleFlag==true)?true:false
        // })
    }
    render(){
        let state=this.state;
        let loginBtnStyle='success';
        let registerBtnStyle='default';
        if(!this.state.loginModalVisible)
        {
            loginBtnStyle='default';
            registerBtnStyle='success'
        }
        return(
                <Modal
                    show={this.props.show}
                    onHide={this.hideModal.bind(this)}
                    backdrop={true}
                >
                    <Modal.Header  closeButton  style={{position:'relative',textAlgin:'center'}}>
                        <Col smOffset={3}>
                            <ButtonGroup style={{position:'absolute',bottom:0}}>
                                <Button  bsStyle={loginBtnStyle} className='btnNoBottomBar' onClick={()=>this.LoginModalControl(true)}>登录</Button>
                                <Button bsStyle={registerBtnStyle} className='btnNoBottomBar'  onClick={()=>this.LoginModalControl(false)}>新用户注册</Button>
                            </ButtonGroup>
                        </Col>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            (state.loginModalVisible)
                            ?
                                <Login
                                    show={this.state.loginModalVisible}
                                    modalExchange={()=>this.modalExchnage()}
                                    callHandle={(data)=>this.lisentCallBack(data)}
                                    closeModalCallBack={(visibleFlag) => this.LoginModalControl(visibleFlag)}/>
                            :
                                <Register
                                    show={this.state.registerModalVisible}
                                    callHandle={(data)=>this.lisentCallBack(data)}
                                    closeModalCallBack={(visibleFlag) => this.RegisterModalControl(visibleFlag)}/>
                        }
                    </Modal.Body>
                </Modal>



        )
    }
}