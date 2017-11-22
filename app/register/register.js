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
            registerData:defaultState,
            registerSession:null,
            errorMsg:'',
            authCodeDisable:false,//验证码按钮可用装态
            submitDisable:true//提交铵钮使用状态
        }
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

        let registerData=this.state.registerData;
        registerData[name]=this[name].value;
        //console.log(registerData[name]+"==="+name);
        this.setState({registerData:registerData});
    }


    //更新验证码按钮UI点击状态
    setAuthCodeBtnUi(){
        this.setState({
            authCodeDisable:true,
            submitDisable:false
        })
    }
    //点击发送验证码
    getAuthCode()
    {
        let _self=this;
        let registerData=_self.state.registerData;
        _self.setAuthCodeBtnUi();
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
                    //写入state更新STATE状态
                    _self.setState({
                        registerSession:registerSession,
                        authCodeDisable:false,
                        submitDisable:false
                    })
                }
            },
            function error(xhr,testStatus){

            });
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
                _self.setState({
                    errorMsg:ErrorMSG[result]
                })
               // alert(ErrorMSG[result]);
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
                    <Col smOffset={2} sm={8}>
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
                                <Button  bsStyle="success" onClick={this.getAuthCode.bind(this)} disabled={this.state.authCodeDisable}>验证码</Button>
                            </InputGroup.Button>
                        </InputGroup>


                    </Col>

                </FormGroup>
                <FormGroup>
                    <Col smOffset={2} sm={8}>
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


