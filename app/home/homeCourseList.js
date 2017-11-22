/**
 * Created by Jeastone on 2017/9/19.
 * @首页课程列表组件
 * @input dataSource title onClickChildCallBack
 * @out list elements
 *
 */
import React,{ Component } from 'react';
import {Grid,Row,Col,H1} from "react-bootstrap";
import CourseItem from './cousrse/courseItem';
import TeacherItem from './cousrse/teacherItem';
import * as HomeAction from '../server/homeServer';


export default class HomeCourseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseList: [],
            newCourseList:[],
            teacherList:[]
        };
    }

    componentDidMount(){
        this.initData();
    }
    //初始化列表数据
    initData()
    {
        let _self=this;
        //requestHomeCourseData
        HomeAction.getHomeCourseList(function(data){
            _self.setState({
                courseList:data.responseInfo.courseList,
                newCourseList:data.responseInfo.courseList
            },function(e){
               //console.log(e);
            })
        })
        HomeAction.getHomeTeacherList(function(data){

            _self.setState({
                teacherList:data.responseInfo.teacherList
            },function(e){
                //console.log(e);
            })
        })

    }

    render()
    {
        return(
            <Grid style={{padding:0}}>

                <div className="courseList_title" >新手课堂</div>
                    <div className="courseList">
                    {

                        this.state.newCourseList.map(function(item,index)
                        {
                            return <CourseItem dataSource={item} key={index}  />
                        })
                    }
                    </div>


                <Row className="show-grid">
                    <h4 className="courseList_title">热课推荐</h4>
                    <div className="courseList">
                    {
                        this.state.courseList.map(function(item,index)
                        {
                            return <CourseItem dataSource={item} key={index} />
                        })
                    }
                    </div>
                </Row>

                <Row className="show-grid">
                <h4 className="courseList_title">名师讲堂</h4>
                <div className="courseList">
                    {
                        this.state.teacherList.map(function(item,index)
                        {
                            if(index<3)
                            {
                                return <TeacherItem dataSource={item} key={index} />
                            }

                        })
                    }
                </div>
                </Row>
            </Grid>
        )

    }
}