/**
 * Created by JeatStone on 2017/9/12.
 */


import React, {Component} from 'react';
import  ReactDOM from 'react-dom';
// import QueueAnim from 'rc-queue-anim';
// import TweenOne from 'rc-tween-one';
import UserHeader from './userHeader';
import {I18N_USER_CENTER} from '../i18n/i18n_userCenter';
import {Grid,Col} from "react-bootstrap";
import UserInfo from './userInfo/UserInfo'
import AccountBind from './account/accountBind';
import * as leftMenuData from '../config/config_userCenter';
import LeftMenu from './leftMenu/index';

import {Router,IndexRoute, Route, Link, hashHistory } from 'react-router';





export default class MainPage extends Component{

    constructor(props){
        super(props);
        let router=leftMenuData.UserCenter;
        this.state={
            router:router,
            currentRouter:0
        }
    }
    menuItemClickFn(routerIndex){
        this.setState({
            currentRouter:routerIndex
        })
    }

    render () {
        return (
            <div>
                <UserHeader/>

                <Grid style={{marginTop:'80px'}}>
                    <div className='leftMenu'>
                        <LeftMenu menuData={leftMenuData.UserCenter} isRouter={true}  menuItemClickFn={(routerName)=>this.menuItemClickFn(routerName)}/>
                    </div>
                    <div className='content_main'>
                        <Col>
                            {this.props.children}
                        </Col>
                    </div>
                </Grid>
            </div>
        )
    }
};

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={MainPage}>
            <IndexRoute component={UserInfo}/>
            <Route path="UserCenter" component={UserInfo}/>
            <Route path="AccountBind" component={AccountBind}/>
        </Route>
    </Router>
    ,
    document.getElementById('mainFrame')
);

