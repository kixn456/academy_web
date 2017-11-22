/**
 * Created by Administrator on 2017/10/23.
 *@description
 *@author
 *@out
 */


import React,{Component} from 'react';
import  ReactDOM from 'react-dom';
import {Grid,ROW,Col} from "react-bootstrap";
import Storage from '../common/storeage';

import UserHeader from '../userCenter/userHeader'
import * as leftMenuData from '../config/config_userCenter';
import LeftMenu from '../userCenter/leftMenu/index';
import  * as TeachCenterServer from '../server/teachCenterServer';
import {Router,IndexRoute, Route, Link, hashHistory } from 'react-router'
export default class CourseMananger extends Component{

    constructor(props) {
        super(props);
        this.state={
           courseList:[],
            queryParmaster:{
                startCreateTime:'2017-11-30 00:00:00',
                endCreateTime:'2017-11-30 00:00:01',
                category:'tcoursepub',
                pageSize:10,
                pageNum:1
            }
        }
    }
        componentDidMount(){
            let userInfo=Storage.get("userInfo");
            let parmaster=Object.assign({},this.state.queryParmaster);
            parmaster.userid=userInfo.userId;
            console.log(parmaster);
            TeachCenterServer.getOrderListByUser(parmaster,function(code,data){
                console.log(data)
            })
        }


    render(){
        let courseList=this.state.courseList;
        return (
                <Col   xs={12} md={12}>
                    <Col   xs={12} md={12}>
                        <div className="page-header">
                            <span>课程管理 </span>
                            <span>草稿管理 </span>
                        </div>
                    </Col>

                    <table className="table table-bordered" >
                        <thead>
                        <tr style={{background:'#eee',fontWeight:'bold'}}>
                            <th>视频信息</th>
                            <th>报名人数</th>
                            <th>状态</th>
                            <th>发布时间</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><img src="../images/img22.jpg" style={{width:'50px'}}/></td>
                            <td style={{verticalAlign:'middle'}}>10</td>
                            <td style={{verticalAlign:'middle'}}>连续</td>
                            <td style={{verticalAlign:'middle'}}>2017.10.25</td>
                            <td style={{verticalAlign:'middle'}}><Link to={'ModifyTeach/id=123'}>编辑</Link>｜删除</td>
                        </tr>
                        <tr>
                            <td><img src="../images/img22.jpg" style={{width:'50px'}}/></td>
                            <td style={{verticalAlign:'middle'}}>10</td>
                            <td style={{verticalAlign:'middle'}}>连续</td>
                            <td style={{verticalAlign:'middle'}}>2017.10.25</td>
                            <td style={{verticalAlign:'middle'}}><Link to={'ModifyTeach/id=123'}>编辑</Link>｜删除</td>
                        </tr>
                        </tbody>
                    </table>
                </Col>


        )
    }
}










