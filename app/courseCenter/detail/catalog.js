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






    render() {

        let chapterList=this.props.chapterList;
        console.log(chapterList);
        const popoverHoverFocus = (
            <Popover id="popover-trigger-hover-focus">
                <strong>Holy guacamole!</strong> Check this info.
            </Popover>
        );
        return (
                <div style={{border:'1px solid #efefef',padding:'10px'}}>
                    <ul>
                        {
                            (chapterList)
                            ?
                        chapterList.map(function(item,index){
                            let courseList=item.courseList;
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
                                            courseList.map(function(courseItem,courseIndex){
                                                let courseLi=(index+1)+"-"+(courseIndex+1)
                                                return (
                                                    <li className='catalog' key={courseIndex}>
                                                        <div></div>
                                                        <span className="glyphicon glyphicon-triangle-right" style={{fontSize:'8px',color:'gray',marginRight:'10px'}}></span>
                                                        {courseLi} {courseItem.classTitle}<span style={{paddingTop:'50px',fontSize:'12px'}}> <img src="images/icon4.png" style={{width:'16px',borderRadius:'30px',marginRight:'10px', display:'inlne-block',paddingTop:'10px'}}/>30:50</span>
                                                        <span className="playBtn">开始学习</span>

                                                    </li>
                                                )
                                            })
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

