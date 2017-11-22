/**
 * Created by Jeastone on 2017/9/18.
 */
import React, { Component } from 'react';
import {Grid,Row,FormGroup,Form,Col,ControlLabel,FormControl,Checkbox,Button,InputGroup} from "react-bootstrap";

import * as LoginServer from '../server/loginServer';
import {ErrorMSG} from "../error/errorMsg";
import {I18N_PASSWORD} from '../I18n/i18n_password';
import Step from '../public/step';
import ResetPassword from './restetPassword';
import FindPasswordStepFirst from './findPassword_step1';
import SmsAuth from './authSms'

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

export default class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        let defaultState=this.initDefaultState();
        this.state = {
            loginData:defaultState,
            currentStep:0
        };
        this.loginSubmit=this.loginSubmit.bind(this);
    }

    componentDidMount(){

    }


    initDefaultState()
    {
        let defaultState={
            countryCode:"0086",
            phone:"18500788688",
            authCode:''
        };
        return defaultState;
    }

    //点击步聚切换
    stepClick(currentStep){
        this.setState({
            currentStep:currentStep
        })
    }

    //子步提交回调
    stepSubmitCallBack(step,data){
        let state=this.state;
        let submitData=data;

        switch (step){
            case 0:
                state.loginData.phone=submitData.phone;
                state.loginData.countryCode=submitData.countryCode;
                break;
            case 1:
                state.loginData.smsCode=data.authCode;
                state.loginData.publicKey=data.publicKey;
                state.loginData.transid=data.transid;
                break;
            case 2:
                state.loginData.password=submitData.password;
                break;
        }
         state.currentStep=step+1;
        this.setState(state);
        if(step==2){
            //这里走真实的提交
            this.loginSubmit();
        }

    }

    //登录提交
    loginSubmit()
    {
        let loginData=this.state.loginData;
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(loginData.publicKey);
        var encrypted = encrypt.encrypt(loginData.random+loginData.password);
        loginData.password=encrypted;
        LoginServer.ajaxResetPassword(loginData,function(result,data){
            if(result==0){

                alert("密码修改成功");
                console.log(JSON.stringify(data));

            }else{
                alert(ErrorMSG[result]);
            }

        });

    }
    render(){
        let loginData=this.state.loginData;
        let colorArray=this.state.randomCode;
        let state=this.state;
        console.log(loginData);
        return (
            <Grid>
                <Row style={{width:"450px",margin:'0px auto'}}>
                    <Form horizontal style={{margin:'100px auto'}}>
                        <div style={{fontSize:'36px'}}>{I18N_PASSWORD.FIND_PASSWORD_TITLE}</div>
                        <p style={{fontSize:"12px",color:'#999',lineHeight:"24px"}}>{I18N_PASSWORD.FIND_PASSWORD_TITLE_TIP}</p>
                        <Step dataSource={FIND_PASSWORD_STEP} currentStep={state.currentStep}  clickCallBack={(currentStep)=>this.stepClick(currentStep)} />


                            {/*<Col componentClass={ControlLabel} sm={4}>authCode:</Col>*/}
                            <Col sm={12}>
                                {
                                    (state.currentStep==0)
                                    ?
                                <FindPasswordStepFirst currentStep={0} stepSubmitCallBack={(step,submitData)=>this.stepSubmitCallBack(step,submitData)}/>
                                :
                                    (state.currentStep==1)
                                        ?
                                        <SmsAuth currentStep={1} phoneInfo={loginData}  stepSubmitCallBack={(step,submitData)=>this.stepSubmitCallBack(step,submitData)}/>
                                            :
                                (state.currentStep==2)
                                ?
                                    <ResetPassword currentStep={2} stepSubmitCallBack={(step,submitData)=>this.stepSubmitCallBack(step,submitData)}/>
                                    :null
                                }
                            </Col>

                {/*authCod**/}
                    </Form>
                </Row>
            </Grid>
        )

    }
}

