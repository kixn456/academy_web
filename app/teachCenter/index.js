/**
 * Created by Administrator on 2017/9/30.
 *@description
 *@author
 *@out
 */

import React,{Component} from 'react';
import  ReactDOM from 'react-dom';
import {Grid,ROW,Col} from "react-bootstrap";

import {Router,IndexRoute, Route, Link, hashHistory } from 'react-router'
import TeachCenter from './indexRouter';
import CourseMananger from './courseMananger';
import UserHeader from '../userCenter/userHeader'
import * as leftMenuData from '../config/config_userCenter';
import LeftMenu from '../userCenter/leftMenu/index';
import AddLesson from './course/addLesson';
import QuestionList from './question/index';
import QuestionDetail from './question/QuestionDetail';
import EvaluateList from './evaluate/index';
import TaskList from './task/index';
import Footer from "../inc/foot/footer";
import ModifyCourse from './course/addLesson';
export default class MainFrame extends Component{
    render(){
        return (
            <div>
                <div className="headerTop">
                    <UserHeader/>
                </div>

                <div style={{background:'#eee',paddingTop:'20px',marginTop:'70px'}}>
                    <Grid>
                        <div className='leftMenu'>
                            <LeftMenu menuData={leftMenuData.TeachCenter}
                                      isRouter={true}
                                      menuItemClickFn={(routerName)=>this.menuItemClickFn(routerName)}/>
                        </div>
                        <div className='content_main'>
                            <Col md={12}>
                                {this.props.children}
                            </Col>
                        </div>
                    </Grid>
                </div>
                <Footer/>
            </div>
        )
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={MainFrame}>
            <IndexRoute component={CourseMananger}/>
            <Route path="TeachCenter" component={AddLesson}/>
            <Route path="ModifyTeach(/:id)" component={ModifyCourse}/>
            <Route path="CourseMananger" component={CourseMananger}/>
            <Route path="myQuestion" component={QuestionList}/>
            <Route path="QuestionDetail" component={QuestionDetail}/>
            <Route path="myEvaluate" component={EvaluateList}/>
            <Route path="myTask" component={TaskList}/>

        </Route>
    </Router>
   ,
    document.getElementById('mainFrame')
);






