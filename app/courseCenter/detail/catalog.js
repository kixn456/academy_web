/**
 * Created by Administrator on 2017/10/20.
 */

import React, {Component} from 'react';
import {Grid,ROW,Col,Button,Tab,Tabs,Icon,Popover,OverlayTrigger} from "react-bootstrap";
import * as CourseServer from '../../server/courseCenterServer';
import "../../../css/custome.css";
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
        }
        this.props.buyCourseClass(newCourseOrder);
    }

renderChildItem(courseList){
        let newItem=[];
        let _self=this;
        let isFree=this.props.isFree;
        console.log(isFree);
    courseList.map(function(courseItem,courseIndex){
        let courseLi=courseIndex+1;

        newItem.push (
            <li className='catalog' key={courseIndex}>
                {"课时"+(courseIndex+1)}&nbsp;&nbsp;{courseItem.classTitle}
                 <span style={{paddingTop:'50px',fontSize:'12px'}}> <img src="images/icon4.png" style={{width:'16px',borderRadius:'30px',marginRight:'10px', display:'inlne-block',paddingTop:'10px'}}/>30:50</span>
                {
                    (isFree)
                    ?
                        null
                        :
                        <span className="playBtn"　onClick={()=>_self.buyCourseClass(courseItem)}>购买</span>
                }

                <span className="playBtn">开始学习</span>
            </li>
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
                    <ul>
                        {
                            (chapterList)
                            ?
                        chapterList.map(function(item,index){

                            let courseList=(!courseClass[index])?[]:courseClass[index].courseList;

                            return (
                                <li key={index}>
                                    <div  className="chapter">
                                        <span className="glyphicon glyphicon-th-list" style={{}}></span>
                                        <span className="catalogTitle"> 第{index+1}章 {item.chapterTitle}</span>
                                        <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popoverHoverFocus}>
                                            <span className="glyphicon glyphicon-info-sign" style={{fontSize:'12px',color:'gray',paddingLeft:'10px'}}></span>
                                        </OverlayTrigger>
                                        </div>
                                    <ul>
                                        {

                                            _self.renderChildItem(courseList,item.chapterId)

                                        }
                                    </ul>

                                </li>

                            )
                        })
                                :
                                null
                    }
                    </ul>

                </div>
        )
    }

}

