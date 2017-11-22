/**
 * Created by Administrator on 2017/10/12.
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
            bounsList:[],

        }
    }
    componentDidMount(){
        this.initData();
    }
    initData(){
        let userId=123;
        let _self=this;
        StudyServer.getBounsListListWithUser(userId,function(data){

            _self.setState({
                bounsList:data.responseInfo.bounsList
            })
        })
    }

    render() {
        let bounsList=this.state.bounsList;
        return (

            <Col xs={12} md={12}>
                <Col   md={12} style={{background:'white'}}>
                    <div  style={{lineHeight:'40px',paddingLeft:'20px',borderBottom:'1px solid #ccc'}}>积分管理</div>
                    <p style={{fontSize:'18px',height:'150px'}}>
                        您当前赚取积分<span  style={{fontSize:'24px'}}>50</span>积分兑换
                    </p>

                </Col>

                <Col xs={12} md={12}  style={{background:'white',marginTop:'20px'}}>
                <div style={{lineHeight:'40px',paddingLeft:'20px'}}>积份消费记录
                    <span style={{float:'right',marginRight:'10px'}}>此处最多保留最近1个月的记录</span></div>
                <table className="table table-bordered" style={{background:'white'}}>

                    <tbody>
                    {
                        bounsList.map(function(item,index){

                            return (<tr key={index}>
                                <td>{item.bouns}</td>
                                <td>{item.title}</td>
                                <td>{item.time}</td>
                                <td>{item.reason}</td>
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