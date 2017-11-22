/**
 * Created by Jeastone on 2017/9/18.
 * @忘记密码找回模块
 * 依赖相关模块
 */
import React, { Component } from 'react';

import {Grid,Row,FormGroup,Form,Col,ControlLabel,FormControl,Checkbox,Button,InputGroup} from "react-bootstrap";
import {ErrorMSG} from "../error/errorMsg";
import {I18N_PASSWORD} from '../I18n/i18n_password';
import Step from '../public/step';
import ResetPassword from './restetPassword';
import SmsAuth from './authSms'

export default class FindPasswordStepFirst extends Component {
    constructor(props) {
        super(props);
        let defaultState=this.initDefaultState();
        this.state = {
            loginData:defaultState,
            errorMsg:'',
            randomCode:[{color:'red',size:14,code:'8'}],
            imgCode:''
        };
        this.loginSubmit=this.loginSubmit.bind(this);
    }

    componentDidMount(){
        this.initAuthCode();
    }
    initAuthCode() {
        let myRandom = Math.floor(Math.random() * 10)
        let myRandom2 = Math.floor(Math.random() * 10000);
        let myAuthCode = myRandom + myRandom2;
        let newAuthInfo=[];
        myAuthCode=String(myAuthCode);
        let _self=this;
        for(var i=0; i<myAuthCode.length; i++){
            let color=_self.initColorMap();
            let size=Math.floor(Math.random() * 10)+14;
            newAuthInfo.push({
                code:myAuthCode[i],
                color:color,
                size:size
            })

        }

        this.setState({
            randomCode: newAuthInfo,
            imgCode:myAuthCode
        })

    }
    //生成随机颜色
    initColorMap(){
        let colorArray=["red","blue",'green','black',"maroon","pansy"];
        let myRandom=Math.floor(Math.random()*5);
        return colorArray[myRandom];
    }
    //初始化状态
    initDefaultState()
    {
        let defaultState={
            countryCode:"0086",
            phone:"18500788688",
            authCode:''
        };
        return defaultState;
    }

    //文本框事件监检测回调
    handleChange(stateKey)
    {

        //这里的stateKey必须与初始state状态管理器中的key保持一持否则无法改值
        let loginData= Object.assign({},this.state.loginData);
        loginData[stateKey]=this[stateKey].value;
        this.setState({loginData:loginData});
    }

    //登录提交
    loginSubmit()
    {

        let _self=this;
        let loginData=_self.state.loginData;
        let errorMsg=_self.state.errorMsg;

        if(loginData.authCode==""){
            errorMsg=I18N_PASSWORD.AuthCode_is_null;
            this.initAuthCode();
        }else if(loginData.authCode!=this.state.imgCode){
            errorMsg=I18N_PASSWORD.AuthCode_is_valid;
            this.initAuthCode();
        }else{
            errorMsg="";
            _self.props.stepSubmitCallBack(this.props.currentStep,this.state.loginData);
        }

        this.setState({
            errorMsg:errorMsg
        });

    }
    render(){
        let loginData=this.state.loginData;
        let colorArray=this.state.randomCode;
        let state=this.state;
        return (
            <div>
                <FormGroup>
                    <Col>
                        <InputGroup>
                            <InputGroup.Addon  style={{backgroundColor:'white'}} ><span className='glyphicon glyphicon-phone'></span></InputGroup.Addon>
                            <FormControl type="tel" name="userName"  placeholder={I18N_PASSWORD.PHONE_INPUT_TIP}   value={loginData.phone}  inputRef={(ref) => {this.phone = ref}} onChange={()=>this.handleChange('phone')}/>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col>
                        <InputGroup>
                            <FormControl type="tel" maxLength={4} name="authCode"  placeholder={I18N_PASSWORD.AUTH_CODE_INPUT_TIP}    inputRef={(ref) => {this.authCode = ref}} onChange={()=>this.handleChange('authCode')}/>
                            <InputGroup.Addon   style={{background:"url(../../images/auth/auth.png) no-repeat",fontWeight:'bold'}} >
                                            <span className='authCodeBg'>
                                                {

                                                    colorArray.map(function(item,index){
                                                        return <i style={{color:item.color,fontSize:item.size}} key={index}>{item.code}</i>
                                                    })
                                                }
                                            </span>
                            </InputGroup.Addon>
                            <InputGroup.Addon  >
                                <a href="javascript:void(0);" ><span className="glyphicon glyphicon-refresh"  onClick={()=>this.initAuthCode()}></span></a>
                            </InputGroup.Addon>
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
                        <Button  onClick={()=>this.loginSubmit()}  bsStyle="success"   bsSize="large" block>
                            {I18N_PASSWORD.NEXT_STEP}
                        </Button>
                    </Col>
                </FormGroup>
            </div>
        )

    }
}

