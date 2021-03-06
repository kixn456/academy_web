
/**
 * Created by Administrator on 2017/9/30.
 *@description
 *@author
 *@out
 */

import React,{Component} from 'react';
import  ReactDOM from 'react-dom';
import {Grid,Row,Col,Button,Radio} from "react-bootstrap";
import {Link } from 'react-router'
import "../../css/style.css";
import  "../../css/animate.css";
import * as Commom from '../public/commom/commom';
import Storage from '../common/storeage';
import * as OrderCenterServer from '../server/orderCenterServer';
import UserHeader from '../userCenter/userHeader'
import ChoosePayType from '../payCenter/confirmPay';
import PaySuccess from '../payCenter/paySuccess';
const basePath=Commom.getRootPath();
export default class CreateBuyerOrder extends Component{
    constructor(props){
        super(props);
        this.state={
                stateList:['create','buy','pay'],
                currentState:0,
                orderInfo:{}
        }
    }
    componentDidMount(){
        this.initData();
    }

    initData(){
        let orderInfo=Storage.get("orderInfo");
        let course=Commom.GetRequest();
        if(orderInfo.courseId=course.courseId)
        {
            this.setState({
                orderInfo:orderInfo
            })
        }

    }
    //提交订单
    submitOrderWithBuyer(){
        let state=this.state.currentState;
        let newState=state+1;
        if(state==0){

            let userInfo=Storage.get("userInfo");
			
            let orderInfo=this.state.orderInfo;
            let newOrderInfo={
                userId:userInfo.userId,
                courseId:orderInfo.courseId,
                teacherId:orderInfo.owner,
                //teacherName:'',
                title: orderInfo.title,
                courseAvatar:orderInfo.courseAvatar,
                originalPrice:orderInfo.originalPrice,
                realPrice:orderInfo.realPrice,
                courseClasses:JSON.stringify(orderInfo.courseClassList),
                totalOriginalPrice:orderInfo.originalTotalPrice,
                totalRealPrice:orderInfo.realTotalPrice
        };
			//生成订单
            this.createOrder(userInfo.userId,newOrderInfo);
        }else if(state==1){
			
			
			
		}

        this.setState({
            currentState:newState
        })
    }


    //生成订单参数：userId,OrderData;
    createOrder(userId,orderData){
        OrderCenterServer.createOrde(userId,orderData,function(code,data,errorMsg){
            if(code==0) {
                alert("订单生成成功" + JSON.stringify(data));
				//重新存储新的订单信息；
                Storage.set("orderInfo",orderData);
            }else{
                alert("生成订单失败："+code+""+errorMsg);
            }
        })
    }

    render(){
        let currentState=this.state.currentState;
        let orderInfo=this.state.orderInfo;

        return (
            <Col md={12} >
                <Col><h1 style={styles.pageTitle}>购买课程</h1></Col>

                        <Row>
                            {
                                (currentState==2)
                                    ?
                                    <PaySuccess />
                                    :
                                    null
                            }
                    <Col md={12} style={styles.pageBody} className={"bounceInDown animated"}>
                        <Col md={9} style={{padding:0}}>
                            <img src={orderInfo.courseAvatar} style={{height:'120px',float:'left'}} />
                            <div style={{float:'left',paddingLeft:'20px',height:'120px',lineHeight:'120px',width:'400px',display:'inline-block'}}>
                                <span style={{lineHeight:'12px'}}><a href="#">{orderInfo.title}</a></span>
                            </div>
                        </Col>
                        <Col md={3}>
                            <em style={{color:'#FA3652',fontWeight:'bold',verticalAlign:'middle',lineHeight:'100px'}}>￥{parseFloat(orderInfo.realTotalPrice).toFixed(2)}</em>
                        </Col>
                    </Col>
                    </Row>

                {
                    (currentState==1)
                        ?
                        <ChoosePayType  orderInfo={orderInfo} />
                        :
                        null
                }

                {
                    (currentState==0)
                    ?
                        <Col xs={12} md={12} style={{padding:'20px 0px'}}>
                            <div style={{float:'right'}}>
                                <div>实付金额：<em style={{fontSize:'30px',color:'#FA3652',fontWeight:'bold'}}>￥{parseFloat(orderInfo.realTotalPrice).toFixed(2)}</em></div>
                                <Button style={styles.linkBtn} onClick={()=>this.submitOrderWithBuyer()}>提交订单</Button>
                                {/* <Link to={"confirmPay"} style={styles.linkBtn} onClick={()=>submitOrderWithBuyer()}>提交订单</Link>*/}
                            </div>
                        </Col>
                        :
                        null
                }

            </Col>

        )
    }
}


const styles={
    pageTitle:{fontSize:'18px',fontWeight:'bold',marginBottom:'20px'},
    pageBody:{borderTop:'1px solid #ddd',borderBottom:'1px solid #ddd',padding:'10px 0px'},
   linkBtn :{ padding:'10px 20px',background:'#FA3652',color:'white',float:'right',marginTop:'20px'
    },
    radioSel:{
        float:'left',
        marginRight:'50px'
    },
    radioShow:{
        marginTop:'20px',
        float:'left',
        marginRight:'5px'

    }
}





