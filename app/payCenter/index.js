
/**
 * Created by Administrator on 2017/9/30.
 *@description
 *@author
 *@out
 */

import React,{Component} from 'react';
import  ReactDOM from 'react-dom';
import {Grid,Row,Col,Button} from "react-bootstrap";
import {Router, Route, Link, hashHistory,IndexRoute } from 'react-router'
import "../../css/style.css";
import * as Commom from '../public/commom/commom';
import UserHeader from '../userCenter/userHeader'

const basePath=Commom.getRootPath();
export default class MainFrame extends Component{
    render(){
        return (
            <div >
                <UserHeader/>
                <div style={{paddingTop:'20px',marginTop:'60px'}}>
                    <Grid>
                        <Col md={12} style={{background:'white',padding:'20px'}}>
                            <Col> <h1 style={{fontSize:'18px',fontWeight:'bold',marginBottom:'40px'}}>确认订单</h1></Col>
                            <Col>

                                <table className="table table-condensed">
                                    <thead>
                                    <tr>
                                        <th>课程名称</th>
                                        <th>有效期</th>
                                        <th>单价</th>
                                        <th>优惠</th>
                                        <th>小计</th>
                                    </tr>
                                    </thead>

                                    <tbody style={{borderBottom:'1px solid #ccc'}}>
                                    <tr>
                                        <td>
                                            <img src={basePath+"images/product12.jpg"} style={{width:'120px'}} />
                                        </td>
                                        <td>2099-12-20</td>
                                        <td >25.23</td>
                                        <td>5.23</td>
                                        <td><em style={{color:'#d9534f',fontWeight:'bold'}}>25.00</em></td>
                                    </tr>
                                    </tbody>
                                </table>
                                <Col style={{marginTop:'100px'}}>
                                    <div style={{float:'right'}}>
                                        <span style={{paddingRight:'20px'}}>实际支付金额：<em style={{fontSize:'30px',color:'#d9534f',fontWeight:'bold'}}>25.00</em></span>
                                        <Button bsStyle="danger">提交订单</Button>
                                    </div>

                                </Col>
                            </Col>
                        </Col>
                    </Grid>
                </div>
            </div>

        )
    }
}


ReactDOM.render(
    <MainFrame/>,
    document.getElementById('mainFrame')
);








