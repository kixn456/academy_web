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
import  * as Commom from '../../../public/commom/commom';
import AddCourse from './addCourseInfo';
const SORT_TYPE={
    DOWN:0,
    UP:1
};
export default  class CourseList extends Component {
    constructor(props) {
        super(props);
        this.state={
            modalVisible: false,
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
            activeCourseInfo:{
                courseInfo:{},
                index:""
            },
            isAddCourse:true,
            modalVisible:true
        })
    }
    //删除课时，参数指针，index
    deletCourse(index){
        let _self=this;
        let courseInfo=this.state.courseList;
        let newCourseInfo=courseInfo.splice(index,1);
        this.setState({
            courseInfo:newCourseInfo
        })
    }

    //xiugai课时，参数指针，index
    modifyCourseInfo(index){
        let _self=this;
        let courseInfo=this.state.courseList[index];
        this.setState({
            activeCourseInfo:{
                courseInfo:courseInfo,
                index:index
            },
            isAddCourse:false,
            modalVisible:true
        })

    }
    setModalVisible(flag){
        this.setState({
            modalVisible:flag
        })
    }
    addLessonSubmitCallBack(courseInfo){
        //这里应该走ajax 请求回调结果
        let courseList=this.state.courseList;
        this.setState({
            isAddCourse:false,
            modalVisible:false
        })

        this.props.addCourseCallBack(courseInfo);
    }

    courseSort(index,type){
        let newCourse=Commom.clone(this.state.courseList);
        let oldCourse=this.state.courseList;
        let newIndex=index;
        if(type==SORT_TYPE.DOWN){
            console.log("下降排序");
            newIndex++;
            newCourse[index]=oldCourse[newIndex];
            newCourse[newIndex]=oldCourse[index];
        }else{
            console.log("上升排序");
            newIndex--;
            newCourse[index]=oldCourse[newIndex];
            newCourse[newIndex]=oldCourse[index];
        }
        this.setState({
            courseList:newCourse
        })

    }

    render() {
        let courseList=this.state.courseList;
        let submitFlag=this.state.submitFlag;
        let isAddCourse=this.state.isAddCourse;
        let activeCourseInfo=this.state.activeCourseInfo;
        let _self=this;
        let title=(isAddCourse)?"填加新课时":"编辑课时信息";
        return (
            <Col>
                <Modal
                    title={title}
                    wrapClassName="vertical-center-modal"
                    visible={this.state.modalVisible}
                    bodyStyle={styles.modalBody}
                    onOk={() => this.setModalVisible(false)}
                    onCancel={() => this.setModalVisible(false)}
                    footer={null}
                   // isAddCourse={this.state.isAddCourse}
                    key={this.state.isAddCourse}
                    >
                    <AddCourse key={activeCourseInfo.index} courseInfo={activeCourseInfo}  submitCallBack={(lessonInfo)=>this.addLessonSubmitCallBack(lessonInfo)} />
                </Modal>
            <div>
                {
                    (courseList)
                    ?
                    courseList.map(function(item,index){

                        return (
                            <div className="timeline-group empty-circle" span={24}  key ={index}>

                                <div className="timeline-title line-32"> 课时{index+1}</div>
                                <div className="timeline-content">
                                        <Col  span={14}>
                                            <em className='circle_text'>{item.classTitle} &nbsp;</em>
                                            {
                                                (item.videoId!="")
                                                    ?
                                                    <span className="glyphicon glyphicon-facetime-video" aria-hidden="true" style={{paddinLfet:'10px',color:'green'}}></span>
                                                    :
                                                    null
                                            }
                                        </Col>
                                        <Col  span={10} className="text-right">


                                            {
                                                (index!=0)
                                                ?
                                                    <Button onClick={()=>_self.courseSort(index,SORT_TYPE.UP)}  style={{marginRight:'10px'}}>
                                                        <Icon type="arrow-up" style={{ fontSize: 18, color: '#08c' }} />
                                                    </Button>
                                                    :
                                                    null
                                            }

                                            {
                                                (index!=(courseList.length-1))
                                                    ?
                                                    <Button onClick={()=>_self.courseSort(index,SORT_TYPE.DOWN)}  style={{marginRight:'10px'}}>
                                                        <Icon type="arrow-down"  style={{ fontSize: 18, color: '#08c' }} />
                                                    </Button>
                                                    :
                                                    null
                                            }

                                            <Button onClick={()=>_self.modifyCourseInfo(index)}  style={{marginRight:'10px'}}>
                                                <Icon type="edit"   style={{ fontSize: 18, color: '#08c' }} />
                                            </Button>
                                            <Button onClick={()=>_self.deletCourse(index)}  >
                                                <Icon type="delete" style={{ fontSize: 18, color: '#08c' }} />
                                            </Button>
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
                        <Button onClick={this.addCourse.bind(this)}>填加课时</Button>
                    </div>
                </div>
            </div>
            </Col>
        );
    }

}

const styles={

        modalBody:{
            overflow:'hidden'
}
}


