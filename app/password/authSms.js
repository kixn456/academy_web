/**
 * Created by Jeastone on 2017/9/18.
 */
import React, { Component } from 'react';

import {Grid,Row,FormGroup,Form,Col,ControlLabel,FormControl,Checkbox,Button,InputGroup} from "react-bootstrap";
import {ErrorMSG} from "../error/errorMsg";
import {I18N_LOGIN} from '../I18n/i18n_home';
import * as LoginServer from '../server/loginServer';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        let defaultState=this.initDefaultState();
        this.state = {
            loginData: defaultState,
            loginSessionData: {},
            authCodeDisable:false,
            submitDisable:true,
            authBtnText:'验证码'
        }
        this.loginSubmit=this.loginSubmit.bind(this);
    }

    componentDidMount(){


    }

    initDefaultState()
    {
        let defaultState={
            phoneNumer:'',
            authCode:""
        };
        return defaultState;
    }

    handleChange(stateKey)
    {
        //这里的stateKey必须与初始state状态管理器中的key保持一持否则无法改值
        let loginData= Object.assign({},this.state.loginData);
        loginData[stateKey]=this[stateKey].value;
        this.setState({loginData:loginData});
    }
    //点击发送验证码
    getAuthCode()
    {
        let _self=this;
        let registerData={
            countryCode:this.props.phoneInfo.countryCode,
            phone:this.props.phoneInfo.phone
        };
        //起用提交按钮
        _self.submitDisableControl(false);
        this.setAuthCodeTimer();
        LoginServer.ajaxGetAuthCode(registerData.countryCode,registerData.countryCode+registerData.phone,function success(result,res)
            {
                if(result==0){
                    _self.setState({
                        loginSessionData:res
                    })
                }else{
                    console.log("获取验证码失败："+result);
                }

            },
            function error(xhr,testStatus){
                console.log("系统错误");
            });
    }
    setAuthCodeTimer(){
        let _self=this;
        let countTimer=0;

        let countFn=setInterval(function(){
           countTimer++;
           if(countTimer==5)
           {
               countTimer=0;
               clearInterval(countFn);
               _self.setState({
                   authBtnText:"验证码"
               })

               _self.submitDisableControl(false);
           }else{
               _self.setState({
                   authBtnText:(5-countTimer)+"s 后重新发送"
               })
           }
       },1000)
    }
    submitDisableControl(disabled){

            this.setState({
                authCodeDisable:disabled
            })

    }

    //提交
    loginSubmit()
    {

        let _self=this;
        let loginData=_self.state.loginData;
        let errorMsg="";
        this.setState({
            errorMsg:errorMsg
        })

        let loginDessionData=this.state.loginSessionData;
        let authCode=this.state.loginData.authCode;
        loginDessionData.authCode=authCode;
        let phoneInfo=this.props.phoneInfo;

        loginDessionData.countryCode=phoneInfo.countryCode;
        loginDessionData.phone=phoneInfo.countryCode+phoneInfo.phone;

        this.checkSmsCode(()=>{
            //点击提交需要校验验证码
            _self.props.stepSubmitCallBack(this.props.currentStep,loginDessionData);
        })

    }
    //校验验证码
    checkSmsCode(sucssCallBack){
        let loginDessionData=this.state.loginSessionData;
        let authCode=this.state.loginData.authCode;
        loginDessionData.authCode=authCode;

        LoginServer.ajaxCheckAuthCode(loginDessionData,function(code,res){
            if(code==0){
                sucssCallBack();
            }else{
                console.log("smscode is error!")
            }
        },function(e){
            console.log("check error");
        })
        //sucssCallBack();
    }

    render(){
        let loginData=this.state.loginData;
        let colorArray=this.state.randomCode;
        let state=this.state;
        let phoneNumber=this.props.phoneInfo.phone;
        //隐藏电话号的中间几位
        let newPhone=phoneNumber.substring(0,6)+"****"+phoneNumber.substring(phoneNumber.length-2,phoneNumber.length);
        return (
            <div>
                {/*phoneNumber**/}
                <FormGroup>
                    <Col>
                        你的手机号码:{newPhone}
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col>
                        <InputGroup>
                            <FormControl type="text" name="authcode"  placeholder="请输入短信认证码"  inputRef={(ref) => {this.authCode = ref}}  onChange={()=>this.handleChange('authCode')} />
                            <InputGroup.Button>
                                <Button
                                    ref='authCodeBtn'
                                    bsStyle="success"
                                    onClick={this.getAuthCode.bind(this)}
                                    disabled={state.authCodeDisable}>{state.authBtnText}</Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </Col>
                </FormGroup>
                {/*authCod**/}
                <FormGroup>
                    <Col>
                        <span style={{color:'red',fontSize:"px"}}>{this.state.errorMsg}</span>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col>
                        <Button  disabled={state.submitDisable} onClick={()=>this.loginSubmit()}  bsStyle="success"  bsSize="large" block>
                            下一步
                        </Button>
                    </Col>
                </FormGroup>
            </div>

        )

    }
}

