/**
 * Created by Jeastone on 2017/9/13.
 */
import React,{ Component } from 'react';
import {Grid,Row,Col,Image} from "react-bootstrap";
import Star from '../../common/star';
export default class CourseItem extends Component {
    render(){
        let montyType="￥";
        let price=(this.props.dataSource.realPrice>0)?montyType+this.props.dataSource.realPrice:<span className='colorGreen'>免费</span>;

        return(

            <div className="courseItem">
                <div style={{background:'white',textAlign:'center'}}>
                    <a href={"courseDetail.html?id="+this.props.dataSource.id}><Image src={this.props.dataSource.imgUrl} style={{maxHeight:'140px',margin:'0px auto'}}  /></a>
                </div>

                <div className="courseItem_p">
                    <h3>{this.props.dataSource.title}</h3>
                   {/* <p>讲师:{this.props.dataSource.teacher}</p>
                    <p>实用级别：{this.props.dataSource.level}</p>*/}
                    <p className="item_Price">{price}</p>
                    <p><Star size={this.props.dataSource.teacherStar}/><span style={{float:'right',color:'#aaa'}}>学习人数: 4564</span> </p>
                   {/* <p>开课时间:{this.props.dataSource.startTime}</p>
                    <p>课程描述：{this.props.dataSource.discription}</p>*/}
                </div>
            </div>
        )
    }
}



