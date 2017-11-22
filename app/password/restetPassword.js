/**
 * Created by Jeastone on 2017/9/18.
 */
import React, { Component } from 'react';

import {Grid,Row,FormGroup,Form,Col,ControlLabel,FormControl,Checkbox,Button,InputGroup} from "react-bootstrap";
import {ErrorMSG} from "../error/errorMsg";
import {I18N_LOGIN} from '../I18n/i18n_home';
import Step from '../public/step';
const FIND_PASSWORD_STEP=[
    {
        setp:1,
        title:'确认帐号'
    },
    {
        setp:2,
        title:'安全验证'
    },
    {
        setp:3,
        title:'重置密码'
    }
];
const PASS_ERROR_CODE={
    PASSWORD_ISVALID:100,
    PASSWORD_COMPAIER:101,
    CONFRIM_ISVALID:102,
    CONFIRM_IS_NULL:103,
    PASSWORD_IS_NULL:104,
    SUCCESS:0
}

const PASS_ERROR={
        PASSWORD_ISVALID:'密码格式不正确',
        PASSWORD_COMPAIER:'密码不致',
        CONFRIM_ISVALID:'确认密码格式不正确',
        CONFIRM_IS_NULL:'确认密码为空',
        PASSWORD_IS_NULL:'密码为空'
}
export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        let defaultState=this.initDefaultState();
        this.state = {
            loginData:defaultState
        };
        this.loginSubmit=this.loginSubmit.bind(this);
    }

    componentDidMount(){

    }

    initDefaultState()
    {
        let defaultState={
            password:"",
            confirmPassword:""
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

    //登录提交
    loginSubmit()
    {

        let _self=this;
        let loginData=_self.state.loginData;
        let errorMsg="";
        let checkResult=_self.checkPassword();
        switch(checkResult){
            case PASS_ERROR_CODE.PASSWORD_ISVALID:
                errorMsg=PASS_ERROR.PASSWORD_ISVALID;
                break
            case PASS_ERROR_CODE.PASSWORD_COMPAIER:
                errorMsg=PASS_ERROR.PASSWORD_COMPAIER;
                break
            case PASS_ERROR_CODE.CONFRIM_ISVALID:
                errorMsg=PASS_ERROR.CONFRIM_ISVALID;
                break
            case PASS_ERROR_CODE.CONFIRM_IS_NULL:
                errorMsg=PASS_ERROR.CONFIRM_IS_NULL;
                break
            case PASS_ERROR_CODE.PASSWORD_IS_NULL:
                errorMsg=PASS_ERROR.PASSWORD_IS_NULL;
                break
        }

        this.setState({
            errorMsg:errorMsg
        })

       if(checkResult==PASS_ERROR_CODE.SUCCESS){

           this.props.stepSubmitCallBack(this.props.currentStep,loginData);
       }

    }
    checkPassword(){
        let _self=this;
        let loginData=_self.state.loginData;

        if(loginData.password=="" ){
            return PASS_ERROR_CODE.PASSWORD_IS_NULL;
        }

        if(loginData.confirmPassword=="" ){
            return PASS_ERROR_CODE.CONFIRM_IS_NULL;
        }

        if(loginData.password!=loginData.confirmPassword){
            return PASS_ERROR_CODE.PASSWORD_COMPAIER;
        }


        let passRegx= /^[a-zA-Z\d_]{8,16}$/;
        if(!passRegx.test(loginData.password)){
            return PASS_ERROR_CODE.PASSWORD_ISVALID;
        }
        if(!passRegx.test(loginData.confirmPassword)){
            return PASS_ERROR_CODE.CONFRIM_ISVALID;
        }

        if(loginData.password==loginData.confirmPassword)
        {

            return PASS_ERROR_CODE.SUCCESS;
        }
    }

    render(){
        let loginData=this.state.loginData;
        let colorArray=this.state.randomCode;
        let state=this.state;
        return (
                    <div>
                    {/*phoneNumber**/}
                    <FormGroup>
                        <Col>
                            <InputGroup>
                                <InputGroup.Addon  style={{backgroundColor:'white'}} ><span className='glyphicon glyphicon-lock'></span></InputGroup.Addon>
                                <FormControl type="password"   placeholder="请输入新密码"  value={loginData.password}  inputRef={(ref) => {this.password = ref}} onChange={()=>this.handleChange('password')}/>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                            <InputGroup>
                                <InputGroup.Addon  style={{backgroundColor:'white'}} ><span className='glyphicon glyphicon-lock'></span></InputGroup.Addon>
                                <FormControl type="password"  placeholder="请再次输入密码"    value={loginData.confirmPassword}  inputRef={(ref) => {this.confirmPassword = ref}} onChange={()=>this.handleChange('confirmPassword')}/>

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
                            <Button onClick={()=>this.loginSubmit()}  bsStyle="success"  bsSize="large" block>
                                确定
                            </Button>
                        </Col>
                    </FormGroup>
                    </div>

        )

    }
}

