import React,{ Component } from 'react';
import  '../../css/style.css';
import  '../../css/slider.css';

import {ButtonGroup,Button} from "react-bootstrap";
import Storage from  '../common/storeage';
//导航菜单项
import  HeaderNav from "./headerNav";
//登录弹窗
import LoginModal from "../login/index";
import  * as LoginServer from '../server/loginServer';
//注册弹窗
import RegisterModal from '../register/index';
import LoginAndRegisterModal from './loginAndRegister';
//首页导航菜单数据项
import {HomeNavData}  from '../config/configMenu';
import  * as Commom from '../public/commom/commom';
const basePath=Commom.getRootPath();
export default class HomeMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // loginModalVisible: false,
            // registerModalVisible:false,
            loginAndRegisterModal:false,
            showType:'login',
            regiserFlag:false,
            loginFlag:false
        };
    }
    componentDidMount()
    {
        this.initLogin();
    }

    componentWillReceiveProps (nextProps){
        if(nextProps.loginShow)
        {
           this.loginAndRegisterModalControl(true,'login')
        }
    }

    //初始化LOGIN
    initLogin()
    {
        let loginFlag=Storage.get("loginFlag");

        this.setState({
            loginFlag
        })
    }
    //注册弹窗控制
    // RegisterModalControl(visibleFlag)
    // {
    //     this.setState({
    //         registerModalVisible:(visibleFlag==true)?true:false
    //     })
    // }
    //
    // //登录弹窗控制
    // LoginModalControl(visibleFlag)
    // {
    //     this.setState({
    //         loginModalVisible:(visibleFlag==true)?true:false
    //     })
    // }
    //注册登录合用弹窗控制
    loginAndRegisterModalControl(visibleFlag,type)
    {

        let showType='login';
        if(!type || showType=="login"){

        }else{
            showType='register';
        }
        this.setState({
            loginAndRegisterModal:(visibleFlag==true)?true:false,
            showType:showType
        })
    }
    logout(){

        Storage.set("loginFlag",false);
        this.setState({
            loginFlag:false
        })
        console.log(location.href);
            let currentUrl=location.href.toLowerCase();
            if(currentUrl.indexOf("usercenter")>0 ||currentUrl.indexOf("teachcenter")>0|| currentUrl.indexOf("studycenter")>0)
            {
                location.href=basePath+"index.html";
            }

    }

    //登录成功后的回调
    lisentLoginSuccess(){
        //登录成功后的回调
       Storage.set("loginFlag",true);
        this.initLogin();
    }

    //注册成功后的回调
    lisentRegisterSuccess(){
        this.setState({
            regiserFlag:true
        })
    }

    render() {
        let state=this.state;
        return (
            <div className="headerFixed">
               {/*
                暂时关闭登录和注册独立弹窗模式
                <LoginModal
                    show={this.state.loginModalVisible}
                     closeModalCallBack={(visibleFlag)=>this.LoginModalControl(visibleFlag)}
                    loginsSuccessCallBack={()=>this.lisentLoginSuccess()}
                />
                <RegisterModal
                    show={this.state.registerModalVisible}
                    closeModalCallBack={(visibleFlag)=>this.RegisterModalControl(visibleFlag)}
                    regiserSuccessCallBack={()=>this.lisentRegisterSuccess()}

                />*/}



                <HeaderNav loginFlag={state.loginFlag} logoutCallBack={()=>this.logout()} loginModalControl={()=>this.loginAndRegisterModalControl(true)}/>
                <LoginAndRegisterModal
                    showType={state.showType}
                    loginFlag={state.loginFlag}
                    show={this.state.loginAndRegisterModal}

                    closeModalCallBack={(visibleFlag)=>this.loginAndRegisterModalControl(visibleFlag)}
                    loginsSuccessCallBack={()=>this.lisentLoginSuccess()}
                    regiserSuccessCallBack={()=>this.lisentRegisterSuccess()}
                />
                {/*<ButtonGroup>
                    <Button  onClick={()=>this.loginAndRegisterModalControl(true,'login')}>登录</Button>
                    <Button  onClick={()=>this.loginAndRegisterModalControl(true,'register')}>注册</Button>
                </ButtonGroup>*/}
            </div>
        )
    }
}


