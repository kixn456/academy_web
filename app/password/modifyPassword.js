/**
 * Created by Jeastone on 2017/9/18.
 */
import React, { Component } from 'react';
import {Grid,Row,FormGroup,Form,Col,ControlLabel,FormControl,Checkbox,Button,InputGroup} from "react-bootstrap";

import * as LoginServer from '../server/loginServer';
import {ErrorMSG} from "../error/errorMsg";
import {I18N_LOGIN} from '../I18n/i18n_home';
import Step from '../public/step';
import ResetPassword from './restetPassword';
import FindPasswordStepFirst from './findPassword_step1';
import SmsAuth from './authSms'

export default class ForgetPassword extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount(){

    }



    loginSubmit()
    {


    }
    render(){
        let loginData=this.state.loginData;
        let colorArray=this.state.randomCode;
        let state=this.state;
        console.log(loginData);
        return (
            null
        )

    }
}

