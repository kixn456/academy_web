/**
 * Created by Administrator on 2017/11/6.
 *@description
 *@author
 *@out
 */





import React, {Component} from 'react';
import {Grid,Row,Col,Thumbnail} from "react-bootstrap";
import * as StudyServer from '../../server/studyCenterServer';
import Storage from '../../common/storeage';


export default class EvaluateList extends Component {
    constructor(props) {
        super(props);
        this.state={
            taskList:[],

        }
    }
    componentDidMount(){
        this.initData();
    }
    initData(){
        let userInfo=Storage.get("userInfo");
        let userId=userInfo.userId;
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
                        <h1>评价管理 <small>Subtext for header</small></h1>
                    </div>
                </Col>
                <Col>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <td>课程</td>
                        <td>好评人数</td>
                        <td>中评人数（元）</td>
                        <td>差评人数</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        taskList.map(function(item,index){
                            let action=(item.status==1)?'查看':(item.status==2)?'删除':'查看｜删除';
                            return (<tr key={index}>
                                <td>{item.title}</td>
                                <td>{item.courseTitle}</td>
                                <td>{item.price}</td>
                                <td>{item.status}</td>
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