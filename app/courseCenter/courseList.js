/**
 * Created by Administrator on 2017/10/20.
 */

import React, {Component} from 'react';
import  ReactDOM from 'react-dom';
import {Grid,ROW,Col} from "react-bootstrap";
import HomeMain from '../home/index';
import CourseListBySearch from './list/courseList'
import "../../css/style.css";

class CourseList extends Component{
    render() {
        return (
            <div>
                <HomeMain/>
                <CourseListBySearch/>
            </div>

        )
    }

}

ReactDOM.render(
    <CourseList/>,
    document.getElementById('mainPage')
);
