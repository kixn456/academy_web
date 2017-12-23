
/**
 * Created by Administrator on 2017/9/30.
 *@description
 *@author
 *@out
 */

import React,{Component} from 'react';
import  ReactDOM from 'react-dom';
import {Grid,Row,Col} from "react-bootstrap";
import {Router, Route, Link, hashHistory,IndexRoute } from 'react-router'

import UserHeader from '../userCenter/userHeader'
import * as leftMenuData from '../config/config_userCenter';
import LeftMenu from '../userCenter/leftMenu/index';
import CourseList from './course/courseList';
import QuestionList from './question/index';

import BounsList from './bouns/index';
import Footer from "../inc/foot/footer"
export default class MainFrame extends Component{
    render(){
        return (
            <di>
                <div className="headerTop">
                    <UserHeader/>
                </div>

                <div style={{paddingTop:'20px',marginTop:'60px'}}>
                <Grid>
                    <div className='leftMenu'>
                        <LeftMenu menuData={leftMenuData.StudyCente} isRouter={true}  menuItemClickFn={(routerName)=>this.menuItemClickFn(routerName)}/>
                    </div>
                    <div className='content_main'>
                        <Col md={12} style={{padding:0}}>
                            {this.props.children}
                        </Col>
                    </div>
                </Grid>
                </div>
                <Footer/>
            </di>

        )
    }
}


ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={MainFrame}>
            <IndexRoute component={CourseList}/>
            <Route path="studyCenter" component={CourseList}/>
            <Route path="myStudy" component={CourseList}/>
            <Route path="myCollection" component={CourseList}/>
            <Route path="myQuestion" component={QuestionList}/>
            <Route path="myBouns" component={BounsList}/>

        </Route>
    </Router>,
    document.getElementById('mainFrame')
);








