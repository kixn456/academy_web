/**
 * Created by Jeastone on 2017/9/13.
 */
import React,{ Component } from 'react';
import {Grid,Row,Col,Image} from "react-bootstrap";
import * as Commom from '../../public/commom/commom';
import Star from '../../common/star';

import LazyLoad from 'react-lazyload';

export default class CourseItem extends Component {
    render(){
        let montyType="￥";
        let price=(this.props.dataSource.realPrice>0)?montyType+this.props.dataSource.realPrice:<span className='colorGreen'>免费</span>;
        let photoName=Commom.formatServerPhoto(this.props.dataSource.courseAvatar);
        let courseTitle=this.props.dataSource.title;
        courseTitle=(courseTitle)?courseTitle:"课程标题末填写";
        if(photoName.middlePhoto=="courseAvatar" || photoName.middlePhoto=="")
        {
            photoName.middlePhoto="http://images.chunzeacademy.com:8080/group1/M00/00/03/J2sPS1pfEIWAdT2dAAA-PkiPZDM435_middle.jpg";
        }

        return(
            <div className="listWrap_item">
                <div style={{background:'white',textAlign:'center',height:'140px'}}>
                    <a href={"courseDetail.html?id="+this.props.dataSource.courseId}>
                        <LazyLoad height={140}>
                        <Image src={photoName.middlePhoto} style={{maxHeight:'140px',width:'100%',margin:'0px auto'}}  />
                        </LazyLoad>
                    </a>
                </div>
                <div className="courseItem_p">
                    <h3><a style={{color:'rgb(51, 51, 51)'}} href={"courseDetail.html?id="+this.props.dataSource.courseId}>{(courseTitle.substring(0,15))}</a></h3>
                    <p className="item_Price">{price}</p>
                    <p><Star size={this.props.dataSource.teacherStar}/><span style={{float:'right',color:'#aaa',fontSize:'12px'}}>学习人数: 4564</span> </p>
                </div>
            </div>
        )
    }
}



