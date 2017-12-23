/**
 * Created by jeaStone on 2017/9/30.
 */

import React, {Component} from 'react';
import { Form, Input,Button,Row,Col} from 'antd';

import CourseList from './courseList';
import * as I18N from '../../../i18n/i18n_teachCenter';

const FormItem = Form.Item;

export default class ChapterInfo extends Component {
    constructor(props) {
        super(props);
        this.state={
                chapterInfo:this.props.chapterInfo,
                chapterIndex:this.props.chapterIndex,
                submitFlag:false,
                isModify:false
            }
    }

    componentDidMount(){
        if(this.props.chapterInfo.chapterId)
        {
            this.setState({
                submitFlag:true,
                isModify:true
            })
        }
    }

    addChapte(){

        let chapterInfo=this.state.chapterInfo;
        let _self=this;
        this.setState({
            submitFlag:true
        })

        this.props.submitCallFn(chapterInfo);
    }
    changeHandle(e){

        let value=e.target.value;
        let name=e.target.name;
        let chapterInfo=this.state.chapterInfo;
        chapterInfo[name]=value;
        this.setState({
            chapterInfo:chapterInfo
        },()=>console.log(this.state.chapterInfo.chapterTitle));
    }

    modifyChapter(){
        this.setState({
            submitFlag:false
        })
    }

    //填加课时后的回调
    addCourseSubmitCallBack(courseInfo){
        let _self=this;
        let chapterInfo=this.state.chapterInfo;
        let courseList=chapterInfo.courseList;
        //如果是课时修改，直接替换掉老课程即可，如果是填加需要PURSH进新的课程
        if(courseInfo.isModify){
            courseList[courseInfo.index]=courseInfo.courseInfo;
        }else{
            courseList.push(courseInfo.courseInfo);
        }

        this.setState({
            chapterInfo:chapterInfo
        },function(){
            _self.addChapte();
        })
    }

    render() {
        let chapterInfo=this.state.chapterInfo;
        let _self=this;
        let submitFlag=this.state.submitFlag;
        let chapterIndex=this.props.chapterIndex;
        return (
            <div>
                <div className="timeline-group">
                            <div className="timeline-title line-32" style={{fontWeight:'bold'}}>第{chapterIndex+1}章</div>
                            <div className="timeline-group solid-circle">
                                <div className="timeline-content">
                                    {
                                        (submitFlag)
                                            ?
                                            <div>
                                                <Col span={16} style={{fontWeight:'bold'}}>{chapterInfo.chapterTitle}</Col>
                                                <Col span={8} className="text-right">
                                                    <Button onClick={this.modifyChapter.bind(this)}  style={{marginRight:'10px'}}>编辑</Button>
                                                    <Button onClick={this.modifyChapter.bind(this)} >删除</Button>
                                                </Col>
                                            </div>
                                        :
                                        <Col>
                                            <Input placeholder="章节标题" name='chapterTitle' value={chapterInfo.chapterTitle} onChange={this.changeHandle.bind(this)} style={{ width: '60%', marginRight: 8 }} />
                                            <Button onClick={this.addChapte.bind(this)}>发布</Button>
                                        </Col>
                                    }

                                </div>
                            </div>
                </div>
                <CourseList dataSource={chapterInfo.courseList} addCourseCallBack={(courseInfo)=>this.addCourseSubmitCallBack(courseInfo)} />
            </div>
        );
    }

}
