/**
 * Created by Jeastone on 2017/9/13.
 * 
 */

import React, { Component } from 'react';
import {FormGroup,Form,Col,ControlLabel,FormControl,Checkbox,Button,InputGroup} from "react-bootstrap";
import Storage from  '../common/storeage';
import * as LoginServer from '../server/loginServer';
import {ErrorMSG} from "../error/errorMsg";
import {I18N_LOGIN} from '../I18n/i18n_home';


export default class LoginForm extends Component {
		constructor(props) {
        super(props);
        let defaultState=this.initDefaultState();
        this.state = {
        		loginData:Object.assign({},defaultState),
        		errorMsg:''
        };
        this.loginSubmit=this.loginSubmit.bind(this);
    }

	  
    initDefaultState()
    {
        let defaultState={
            countryCode:"0086",
            phone:"18500788688",
            password:"123456"
        };
        return defaultState;
    }
    handleChange(stateKey)
    {
        //这里的stateKey必须与初始state状态管理器中的key保持一持否则无法改值
        let loginData=this.state.loginData;
        loginData[stateKey]=this[stateKey].value;
        this.setState({loginData:loginData});
    }
    //登录提交
    loginSubmit()
    {

    	let _self=this;
        let loginData=_self.state.loginData;
        let loginWithPassSession=loginData;
        LoginServer.ajaxGetRsaPublicKey(loginWithPassSession.countryCode+loginWithPassSession.phone,function(result,authCode)
            {
        		
                if(result==0)
                {
                    loginWithPassSession.transid=authCode.transid;
                    loginWithPassSession.publicKey=authCode.publicKey;
                    loginWithPassSession.random = authCode.random;
                    loginWithPassSession.crcType = authCode.crcType;
                    var encrypt = new JSEncrypt();
                    encrypt.setPublicKey(loginWithPassSession.publicKey);
                    var encrypted = encrypt.encrypt(loginWithPassSession.random+loginWithPassSession.password);
                    LoginServer.ajaxLoginWithPass(loginWithPassSession.transid,loginWithPassSession.countryCode,loginWithPassSession.phone,encrypted,function(code,data){

                        if(code==0)
                        {
                            //回调通知父组件
                            Storage.set("userInfo",data);
                            _self.props.callHandle({loginSuccss:true});
                        }else{
                            Storage.set("loginFlag",false);
                            _self.setState({
                                errorMsg:ErrorMSG[code]
                            })
                        }
                    });

                }
            },
            function error(xhr,testStatus){

                _self.setState({
                    errorMsg:ErrorMSG["-1"]
                })
            });

    }
    render(){
        let loginData=this.state.loginData;
        return (

            <Form horizontal>
                {/*countryCode**/}
                <FormGroup controlId="formHorizontalEmail" style={{display:'none'}}>
                    <Col componentClass={ControlLabel} sm={3}>
                        <a href="#">{I18N_LOGIN.COUNTRYCODE}：</a>
                    </Col>
                    <Col  smOffset={3} sm={9} >
                        <FormControl type="number" name="countryCode" placeholder="请输入区号"  data-tip="请输入区号" value={loginData.countryCode}   inputRef={(ref) => {this.countryCode = ref}} onChange={()=>this.handleChange('countryCode')}/>

                    </Col>
                </FormGroup>
                {/*phoneNumber**/}
                <FormGroup controlId="formHorizontalUserName">
                    <Col componentClass={ControlLabel} sm={3} style={{display:'none'}}>
                        {I18N_LOGIN.MOBILE_Number}：
                    </Col>
                    <Col smOffset={2} sm={8}>
                        <InputGroup>
                            <InputGroup.Addon  style={{backgroundColor:'white'}} ><span className='glyphicon glyphicon-phone'></span></InputGroup.Addon>
                            <FormControl type="tel" name="userName"  placeholder="请输入号码"  data-tip="请输入号码" value={loginData.phone}   inputRef={(ref) => {this.phone = ref}} onChange={()=>this.handleChange('phone')}/>

                        </InputGroup>
                    </Col>
                </FormGroup>
                {/*password**/}

                <FormGroup controlId="formHorizontalPassword">
                    {/*<Col componentClass={ControlLabel} sm={3}>*/}
                        {/*{I18N_LOGIN.PASSWORD}：*/}
                    {/*</Col>*/}
                    <Col smOffset={2} sm={8}>
                        <InputGroup>
                            <InputGroup.Addon  style={{backgroundColor:'white'}} ><span className='glyphicon glyphicon-lock'></span></InputGroup.Addon>
                        <FormControl type="password" name="password"  placeholder="请输入密码"   data-tip="请输入密码" value={loginData.password} inputRef={(ref) => {this.password = ref}} onChange={()=>this.handleChange('password')}/>
                        </InputGroup>
                        </Col>
                </FormGroup>

                {/*authCod**/}
                {
                    (this.state.loginIdType==1)
                        ?
                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={3}>
                                {I18N_LOGIN.AUTH_CODE}:
                            </Col>
                            <Col sm={9}>
                                <FormControl type="text" name="authcode"  placeholder="验证码" data-tip="请输入短信认证码" inputRef={(ref) => {this.authcode = ref}} onChange={()=>this.handleChange('authcode')} />
                            </Col>
                        </FormGroup>
                        :
                        null
                }

                    <Col sm={4} style={{textAlign:'right',fontSize:"12px"}}>
                        <a href="userCenter/password/forget.html">忘记密码？</a>
                    </Col>


                <FormGroup>
                    <Col smOffset={3} sm={9}>
                        <span style={{color:'red',fontSize:"px"}}>{this.state.errorMsg}</span>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={2} sm={8}>
                        <Button  onClick={()=>this.loginSubmit()}  bsStyle="success"  bsSize="large" block>
                            {I18N_LOGIN.LOGIN}
                        </Button>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={2} sm={8}  style={{textAlign:'center',fontSize:"12px"}}>
                        <Button bsStyle='link' onClick={()=>this.props.modalExchange()}>没有帐号前往注册</Button>
                    </Col>
                </FormGroup>
            </Form>

        )

    }
}
