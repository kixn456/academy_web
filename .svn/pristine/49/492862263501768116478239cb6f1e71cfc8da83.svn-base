
/**
 * Created by Administrator on 2017/9/30.
 *@description
 *@author
 *@out
 */

import React,{Component} from 'react';
import  ReactDOM from 'react-dom';
import {Grid,Row,Col,Button,Radio} from "react-bootstrap";
import {Router, Route, Link, hashHistory,IndexRoute } from 'react-router'
import "../../css/style.css";
import * as Commom from '../public/commom/commom';
import UserHeader from '../userCenter/userHeader';
import CreateBuyerOrder from '../orderCenter/index';
import ConfirmOrder from './confirmPay';
import paySuccess from './paySuccess';
import  Footer from "../inc/foot/footer";
const basePath=Commom.getRootPath();


export default class MainFrame extends Component{
    render(){
        return (
            <div >
                <UserHeader/>
                <Col style={{paddingTop:'20px',marginTop:'60px'}}>
                    <Grid>
                        <Col  md={12} style={{background:'white',padding:'20px',boxShadow: "0 8px 16px 0 rgba(7, 17, 27, 0.1)",borderRadius:'3px',minHeight:'550px'}}>
                            {this.props.children}
                        </Col>
                    </Grid>
                </Col>
                <Footer/>
            </div>
        )
    }
}



ReactDOM.render(
    <Router history={hashHistory}>
    <Route path="/" component={MainFrame}>
    <IndexRoute component={CreateBuyerOrder}/>
    <Route path="createBuyerOrder" component={CreateBuyerOrder}/>
        <Route path="confirmPay" component={ConfirmOrder}/>
        <Route path="paySuccess" component={paySuccess}/>
    </Route>
    </Router>,
    document.getElementById('mainFrame')
);








