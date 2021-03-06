/**
 * Created by Jeastone on 2017/9/13.
 */
import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import {FormGroup,Form,Col,ControlLabel,FormControl,Checkbox,Button,InputGroup,DropdownButton,MenuItem} from "react-bootstrap";
//import {ajaxLoginWithPass,ajaxGetRsaPublicKey,ajaxGetAuthCode,ajaxRegisterWithAuth} from '../server/loginServer';
import * as LoginServer from '../server/loginServer';
import {ErrorMSG} from '../error/errorMsg';
export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
        let defaultState=this.initDefaultState();
        this.state = {
            registerData:Object.assign({},defaultState),
            registerSession:null,
            errorMsg:'',
            authCodeDisable:false,//验证码按钮可用装态
            submitDisable:true,//提交铵钮使用状态
            authBtnText:'验证码'
        }
        this.times=30;
        this.timer=null;
    }

    //初始化state
    initDefaultState()
    {
        let defaultState={
            countryCode:"0086",
            phone:"18500788699",
            password:"123456",
            authCode:''
        };
        return defaultState;
    }




    getValidationState()
    {
        //这里是校验方法
    }

    //点击输入框并整理modal
    handleChange(name)
    {
        let errorMsg="";
        let registerData=this.state.registerData;
        registerData[name]=this[name].value;
        let checkFlag=this.checkPhone(registerData.phone);
        if(!checkFlag){
            //如果输入的不是电话号码
            errorMsg=ErrorMSG['1003'];
        }else{
            this.setAuthCodeBtnUi();
        }
        this.setState({
            errorMsg
        })

    }


    //更新验证码按钮UI点击状态
    setAuthCodeBtnUi(){
        let registerData=this.state.registerData;
        let submitDisable=(registerData.phone==""||registerData.authCode==""|| registerData.password=="")?true:false;
        let authCodeDisable=(registerData.phone=="")?true:false;
        this.setState({
            authCodeDisable,
            submitDisable
        });
    }

     checkPhone(phone){

        if(!(/^1[34578]\d{9}$/.test(phone))){

            return false;
        }else{
            return true;
        }
    }

    //点击发送验证码
    getAuthCode()
    {
        let _self=this;
        let registerData=_self.state.registerData;
        this.setAuthCodeBtnUi();
        LoginServer.ajaxGetAuthCode(registerData.countryCode,registerData.countryCode+registerData.phone,function success(result,authCode)
            {
                if(result==0)
                {

                    let registerSession={
                        transid:authCode.transid,
                        publicKey:authCode.publicKey,
                        random:authCode.random,
                        crcType:authCode.crcType
                     };
                _self.setTimeAuthBtn();
                    //写入state更新STATE状态
                    _self.setState({
                        registerSession:registerSession
                    })
                }
            },
            function error(xhr,testStatus){

            });
    }


setTimeAuthBtn(){
     let _self=this;
    _self.timer = setInterval(function(){
        if(_self.times<=0){
            _self.times=30;
            let authBtnText="验证码";
            _self.setState({
                authBtnText:authBtnText,
                authCodeDisable:false
            })
            clearInterval(_self.timer);
        }else{
            let authBtnText=_self.times+"s重发";
            _self.setState({
                authBtnText:authBtnText,
                authCodeDisable:true
            })
            _self.times--;
        }

    },1000)
}

    //注册按钮提交事件
    registerSubmit(){
        let _self=this;
        let registerSession=_self.state.registerSession;
        let registerData=_self.state.registerData;
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(registerSession.publicKey);
        var encrypted = encrypt.encrypt(registerSession.random+registerData.password);

        let newRegisterData=registerData;
        newRegisterData.password=encrypted;
        newRegisterData.transid=registerSession.transid;
        //console.log(JSON.stringify(newRegisterData));
        LoginServer.ajaxRegisterWithAuth(newRegisterData,function(result,data){
            if(result==0)
            {
                //回调通知父组件
               _self.props.callHandle({registerSuccss:true});
            }else{
                //更新state中错误信息内容
                alert(ErrorMSG[result]);
                _self.setState({
                    errorMsg:ErrorMSG[result]
                })
            }
        });

    }
    render(){






        return (
            <Form horizontal>

                {/*countryCode**/}
                <FormGroup controlId="formHorizontalEmail" validationState={this.getValidationState()}  >

{/*
                    <Col componentClass={ControlLabel} sm={4}>
                        Country Code：
                    </Col>*/}
                    <Col smOffset={2} sm={8} style={{display:'none'}}>
                        <InputGroup>
                                <DropdownButton
                                    componentClass={InputGroup.Button}
                                    id="input-dropdown-addon"
                                    title="中国"
                                >
                                    <MenuItem key="1">0086</MenuItem>
                                </DropdownButton>

                            <FormControl type="Number" name="countryCode"  placeholder="请输入区号"  data-tip="请输入区号"   inputRef={(ref) => {this.countryCode = ref}} onChange={()=>this.handleChange('countryCode')}/>
                        </InputGroup>
                    </Col>
                </FormGroup>
                {/*phoneNumber**/}
                <FormGroup controlId="formHorizontalUserName" validationState={this.getValidationState()}>
                   {/* <Col componentClass={ControlLabel} sm={4}>
                        Phone：
                    </Col>*/}
                    <Col smOffset={2} sm={8}>
                        <InputGroup>
                            <InputGroup.Addon  style={{backgroundColor:'white'}} ><span className='glyphicon glyphicon-phone'></span></InputGroup.Addon>
                            <FormControl type="tel" name="userName"  placeholder="请输入号码"  data-tip="请输入号码" inputRef={(ref) => {this.phone = ref}}  onChange={()=>this.handleChange('phone')}/>
                        </InputGroup>
                    </Col>
                </FormGroup>
                {/*password**/}
                <FormGroup controlId="formHorizontalPassword" validationState={this.getValidationState()}>
                   {/* <Col componentClass={ControlLabel} sm={4}>
                        Password：
                    </Col>*/}
                    <Col smOffset={2} sm={8}>
                        <InputGroup>
                            <InputGroup.Addon  style={{backgroundColor:'white'}} ><span className='glyphicon glyphicon-lock'></span></InputGroup.Addon>
                            <FormControl type="password" name="password"  placeholder="请输入密码"   data-tip="请输入密码"  inputRef={(ref) => {this.password = ref}}  onChange={()=>this.handleChange('password')}/>
                        </InputGroup>

                    </Col>
                </FormGroup>
                {/*authCod**/}

                <FormGroup controlId="formHorizontalPassword" validationState={this.getValidationState()}>
                    {/*<Col componentClass={ControlLabel} sm={4}>
                        authCode:
                    </Col>*/}
                    <Col smOffset={2} sm={8}>

                        <InputGroup>

                            <FormControl type="text" name="authcode"  placeholder="验证码" data-tip="请输入短信认证码" inputRef={(ref) => {this.authCode = ref}}  onChange={()=>this.handleChange('authCode')} />
                            <InputGroup.Button>
                                <Button  bsStyle="success" onClick={this.getAuthCode.bind(this)} disabled={this.state.authCodeDisable}>{this.state.authBtnText}</Button>
                            </InputGroup.Button>
                        </InputGroup>


                    </Col>

                </FormGroup>
                <FormGroup>
                    <Col smOffset={2} sm={8} style={{color:'red',fontSize:'12px'}}>
                        {this.state.errorMsg}
                    </Col>
                </FormGroup>
                <FormGroup>

                    <Col smOffset={2} sm={8}>
                            <Button type="button" disabled={this.state.submitDisable}  bsStyle="success"  bsSize="large" block onClick={this.registerSubmit.bind(this)}>
                                Register
                            </Button>
                    </Col>
                </FormGroup>

            </Form>
        )
    }
}


