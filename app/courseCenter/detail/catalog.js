/**
 * Created by Administrator on 2017/10/20.
 */

import React, {Component} from 'react';
import {Grid,ROW,Col,Button,Tab,Tabs,Icon,Popover,OverlayTrigger} from "react-bootstrap";
import * as CourseServer from '../../server/courseCenterServer';
import "../../../css/custome.css";
const MoneyTYPE="￥";
export default class CourseCatalog extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount(){

/*
        console.log(this.props.courseId);
        console.log(this.props.chapterList);
        console.log(this.props.courseClass);*/
    }
    buyCourseClass(courseItem){
        let newCourseOrder={
            classId:courseItem.classId,
            classTitle:courseItem.classTitle,
            originalPrice:courseItem.originalPrice,
            realPrice:courseItem.realPrice,
            videoId:courseItem.videoId
        };
        this.props.buyCourseClass(newCourseOrder);

    }
    isLogin(item){
            let loginFlag=Storage.get("loginFlag");
            if(loginFlag){
                return true;
            }else{
                return false;
            }
    }
renderChildItem(courseList){
        let newItem=[];
        let _self=this;
        let isFree=this.props.isFree;
        let corseStatus=this.props.courseStatus;
    courseList.map(function(courseItem,courseIndex){
        let courseLi=courseIndex+1;
        let courseShowText="";
      if(corseStatus!=255 &&  courseItem.status!=255 && courseItem.realPrice<=0){
          courseShowText= "购买";
        }else{
          courseShowText="已购买－继续学习";
      }
        newItem.push (
            <Col className='catalog' key={courseIndex} onClick={()=>_self.buyCourseClass(courseItem)}>
                <Col md={6}>  {"课时"+(courseIndex+1)}&nbsp;&nbsp;{courseItem.classTitle}</Col>
                <Col  md={3}>
                    <i className="glyphicon glyphicon-time" style={{fontSize:'14px',paddingRight:'10px'}}></i>
                    30:50　{courseItem.realPrice>0?MoneyTYPE+courseItem.realPrice:'免费'}
                </Col>
                <Col  md={3}>
                    <span>{courseShowText}</span>
                   {/* {
                        (isFree)
                            ?
                            null
                            :
                            <span className="playBtn"　onClick={()=>_self.buyCourseClass(courseItem)}>购买</span>
                    }
                    <span className="playBtn"　onClick={()=>_self.buyCourseClass(courseItem)}>开始学习</span>*/}
                </Col>


            </Col>
        )
    })
return newItem;
}

    render() {

        let chapterList=this.props.chapterList;
        let courseClass=this.props.courseClass;
        let _self=this;
        const popoverHoverFocus = (
            <Popover id="popover-trigger-hover-focus">
                <strong>Holy guacamole!</strong> Check this info.
            </Popover>
        );
        return (
                <div style={{border:'1px solid #efefef',minHeight:'400px',padding:'10px'}}>
                    <Col>
                        {
                            (chapterList)
                            ?
                        chapterList.map(function(item,index){
                             let courseList=(!courseClass[index])?[]:courseClass[index].courseList;
                            return (
                                <Col key={index}>
                                    <Col  className="chapter">
                                        <Col className="catalogTitle">
                                            <i className="glyphicon glyphicon-th-list" style={{color:'#FA3652'}}></i> 章节 {index+1} {item.chapterTitle}</Col>
                                        {/*<OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popoverHoverFocus}>
                                            <span className="glyphicon glyphicon-info-sign" style={{fontSize:'12px',color:'gray',paddingLeft:'10px'}}></span>
                                        </OverlayTrigger>*/}
                                        </Col>
                                    <Col>
                                        {
                                            _self.renderChildItem(courseList,item.chapterId)
                                        }
                                    </Col>
                                </Col>

                            )
                        })
                                :
                                null
                    }
                    </Col>

                </div>
        )
    }

}

