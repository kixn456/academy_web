/**
 * Created by Administrator on 2017/11/6.
 *@description
 *@author
 *@out
 */
import React, {Component} from 'react';
import {Grid,Row,Col,Thumbnail} from "react-bootstrap";
import * as StudyServer from '../../server/studyCenterServer';

export default class QuesionList extends Component {
    constructor(props) {
        super(props);
        this.state={
            taskList:[]
        }
    }
    componentDidMount(){
        this.initData();
    }
    initData(){
        let userId=123;
        let _self=this;
        StudyServer.getQuestionListWithUser(userId,function(data){

            _self.setState({
                taskList:data.responseInfo.taskList
            })
        })
    }

    render() {
        let taskList=this.state.taskList;
        return (

            <Col xs={12} md={12}>
                <Col   xs={12} md={12}>
                    <div className="page-header">
                        <h1>问题解答 <small>Question & Answer</small></h1>
                    </div>
                </Col>
                <Col>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <td>问题</td>
                        <td>课程名称</td>
                        <td>出价（元）</td>
                        <td>状态</td>
                        <td>操作</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        taskList.map(function(item,index){
                            let view=<a href="#/questionDetail">查看</a>;
                            let action=(item.status==1)?view:(item.status==2)?'删除':'查看｜删除';
                            return (<tr key={index}>
                                <td>{item.title}</td>
                                <td>{item.courseTitle}</td>
                                <td>{item.price}（元）</td>
                                <td>{item.status}</td>
                                <td>{action}</td>
                            </tr>)
                        })
                    }

                    </tbody>
                </table>
                </Col>
            </Col>

        )
    }

}