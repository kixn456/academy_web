/**
 * Created by jeaStone on 2017/9/30.
 */

import React, {Component} from 'react';
import { Form,Button,Icon} from 'antd';

import ChapterItem from './addChapterInfo'
import * as I18N from '../../../i18n/i18n_teachCenter';

const FormItem = Form.Item;
const ButtonGroup = Button.Group;

class ChapterItemList extends Component {
    constructor(props) {
        super(props);
        this.state={
            currentChapterNo:1,
            courseChapterList:[],
            activeCorseForChapter:{
                index:0,
                lessonInfo:null
            }
        }
    }



    addCourseChapterTitle(){
        let _self=this
        let currentChapterNo=_self.state.currentChapterNo;
        let chapterList=this.state.courseChapterList;
        let chapterNo=chapterList.length+1;
        let courseChapter={
            chapterTitle:'第'+chapterNo+"章",
            label:'第'+chapterNo+"章节标题",
            key:chapterNo,
            courseList:[]
        };

        chapterList.push(courseChapter);
        this.setState({
            currentChapterNo:chapterNo,
            courseChapterList:chapterList
        })

        //这里面有问题，章节标题提交需要每部都存吗？

    }
    removeCourseChapterTitle(listIndex){

        let currentChapterNo=this.state.currentChapterNo;
        let chapterList=this.state.courseChapterList;
        chapterList.splice(listIndex,1);
        this.setState({
            currentChapterNo:currentChapterNo-1,
            courseChapterList:chapterList
        })
    }
    //章节发布
    submitCourseChapter(chapterInfo,index){
        let courseChapterList=this.state.courseChapterList;
        courseChapterList[index]=chapterInfo;
        this.setState({
            courseChapterList:courseChapterList
        })
        //这里需要回调保存信息
        this.props.submitCallBack(courseChapterList);
        //console.log(courseChapterList);
    }
        orderPublish(courseChapterList){
            this.props.orderPublish(courseChapterList);
        }
    //通知父组件刷新提交章节信息
    submitChapterInfo(){
        let courseChapterList=this.state.courseChapterList;
        this.props.submitCallBack(courseChapterList);
        console.log(courseChapterList);
    }


    showModal(index){
        let activeCorseForChapter=this.state.activeCorseForChapter;
        activeCorseForChapter.index=index;
        this.setState({
            modalVisible:true,
            activeCorseForChapter
        })
    }
    handleCancel(){
        this.setState({
            modalVisible:false
        })
    }
    handleOk(){
        this.setState({
            modalVisible:false
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };

        let courseChapterList=this.state.courseChapterList;
        let _self=this;

        return (
            <div >
                <Form  style={{marginTop:20}}  className="timeline">
                    {
                        (courseChapterList.length>0)
                        ?
                            courseChapterList.map(function(item,index){
                                return <ChapterItem
                                            key={index}
                                            formItemLayout={formItemLayout}
                                            chapterInfo={item}
                                            chapterIndex={index}
                                            submitCallFn={(chapterInfo)=>_self.submitCourseChapter(chapterInfo,index)}
                                        />
                             })
                        :
                        null
                    }

                    {/**填加章节必须前一章填写完成**/}
                    <div className="timeline-group solid-circle last-circle" span={24}   >
                        <div className="timeline-content" style={{background:'none'}}>
                                <Button type="dashed" onClick={this.addCourseChapterTitle.bind(this)} style={{ width: '60%' }}>
                                    <Icon type="plus" /> 填加章节
                                </Button>
                        </div>
                    </div>


                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary"  style={{marginRight:'10px'}} onClick={()=>this.orderPublish()}>发布</Button>
                        <Button type="primary"  onClick={()=>this.submitChapterInfo()}>保存</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }

}
export const ChapterList = Form.create()(ChapterItemList);