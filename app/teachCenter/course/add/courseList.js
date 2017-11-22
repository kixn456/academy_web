/**
 * Created by Administrator on 2017/10/16.
 *@description
 *@author
 *@out
 */

import React, {Component} from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox,Button,Radio,Upload, message,Steps,Modal} from 'antd';
import * as I18N from '../../../i18n/i18n_teachCenter';
import "../../../../css/custome.css";
import AddCourse from './addCourseInfo';

export default  class CourseList extends Component {
    constructor(props) {
        super(props);
        this.state={
            courseList:this.props.dataSource||[],
            activeCourseInfo:{},
            submitFlag:false,
            isAddCourse:false
        }
    }
    componentDidMount(){

    }
    addCourse(){
        this.setState({
            isAddCourse:true
        })
    }
    modifyCourseInfo(index){
        let courseInfo=this.state.courseList[index];
        this.setState({
            activeCourseInfo:{
                courseInfo:courseInfo,
                index:index
            },
            isAddCourse:true
        })
    }

    addLessonSubmitCallBack(courseInfo){
        //这里应该走ajax 请求回调结果
        let courseList=this.state.courseList;
        this.setState({
            isAddCourse:false
        })
        this.props.addCourseCallBack(courseInfo);
    }


    render() {
        let courseList=this.state.courseList;
        let submitFlag=this.state.submitFlag;
        let isAddCourse=this.state.isAddCourse;
        let activeCourseInfo=this.state.activeCourseInfo;

        let _self=this;
        return (
            <div>
                {
                    (courseList)
                    ?
                    courseList.map(function(item,index){
                        return (
                            <div className="timeline-group empty-circle" span={24}  key ={index} >
                                <div className="timeline-content">
                                        <Col  span={16}>
                                            <span className='circle_text'>{item.classTitle}</span>
                                        </Col>
                                        <Col  span={8} className="text-right">
                                            <Button onClick={()=>_self.modifyCourseInfo(index)}  style={{marginRight:'10px'}}>编辑</Button>
                                            <Button onClick={()=>_self.modifyCourseInfo(index)}  >删除</Button>
                                        </Col>
                                </div>
                            </div>
                        )
                    })
                        :
                        null
                }

                <div className="timeline-group empty-circle"  >
                    <div className="timeline-content">
                        {


                        (!isAddCourse)
                        ?
                        <Button onClick={this.addCourse.bind(this)}>填加课时</Button>
                        :
                        <AddCourse courseInfo={activeCourseInfo}  submitCallBack={(lessonInfo)=>this.addLessonSubmitCallBack(lessonInfo)} />
                        }
                    </div>
                </div>

            </div>
        );
    }

}



