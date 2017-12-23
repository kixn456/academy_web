/**
 * Created by JeatStone on 2017/9/21.
 * @课程分类
 * @pamra DataSource
 *
 */
import React,{ Component } from 'react';
import {Grid,ROW,Col} from "react-bootstrap";
import ClassItem from './classItem';
import {ClassList} from '../../testData/classData';

export default class CourseClassify extends Component {
    constructor(props) {
        super(props);

    }

    render(){
        return(
            <Grid style={{position:'absolute',top:'0',left:0}}>
                <Col className="menuBox">
                    <ClassItem dataSource={ClassList}/>
                </Col>
            </Grid>

        )
    }
}
