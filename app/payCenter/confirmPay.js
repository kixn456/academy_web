/**
 * Created by Administrator on 2017/11/23.
 */

/**
 * Created by Administrator on 2017/9/30.
 *@description
 *@author
 *@out
 */

import React,{Component} from 'react';
import  ReactDOM from 'react-dom';
import {Grid,Row,Col,Button,Radio,Modal} from "react-bootstrap";
import QRCode from 'qrcode.react';
import "../../css/style.css";
import Storage from '../common/storeage';
import * as OrderCenterServer from '../server/orderCenterServer';
import * as Commom from '../public/commom/commom';
import UserHeader from '../userCenter/userHeader'
import {Link } from 'react-router';
const basePath=Commom.getRootPath();
const PAY_TYPE={
    'BALANCE':0,
    'WEIXIN':1,
    'ZFB':2
}
export default class CreateBuyerOrder extends Component{
    constructor(props){
        super(props);
        this.state={

            activePayType:PAY_TYPE.WEIXIN,
            showModal:false,
			qrCode:''
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
                courseInfo:orderInfo
            })
        }
        this.queryQrCode();
    }
    queryQrCode(){
			
			let orderInfo=Storage.get("orderInfo");
			let userInfo=Storage.get("userInfo");

            let _self=this;
        OrderCenterServer.getWeixinQrCode(userInfo.userId,orderInfo.orderId,function(code,data){
				if(code===0){
				    _self.setState({
                        qrCode:data.code_url
                    })
                }
				//console.log(code);
				//console.log(data);
			},function(e){
				
				console.log("errorInfo:"+e);
			})

    }
    choosePayType(type){
        let showFlag=(type==PAY_TYPE.WEIXIN)?true:false;
		if(showFlag==true){
			this.queryQrCode();
		}
        this.setState({
            activePayType:type,
            showModal:showFlag
        })
		
		
		
        console.log(type);
    }
    closeModal(){

        this.setState({
            showModal:false
        })
    }

    render(){
        let qrCodePayMony=this.state.qrCode;
        return (
                    <Col style={{marginTop:'30px'}} className="bounceInDown animated">
                        <div><h1 style={{fontSize:'16px',fontWeight:'bold',marginBottom:'20px'}}>选择支付方式</h1></div>
                        {/*<div style={{clear:'both'}}>
                            <Radio name="payType" checked readOnly  style={{marginTop:'20px'}} onClick={()=>this.choosePayType(PAY_TYPE.BALANCE)}>
                                帐户余额：25.00
                            </Radio>
                        </div>*/}
                        <div style={{clear:'both'}}>
                            <div style={styles.radioSel}　onClick={()=>this.choosePayType(PAY_TYPE.WEIXIN)}>
                                <img src={basePath+"images/pay/weixin.png"}/>
                            </div>
                            {/*<div style={styles.radioSel} onClick={()=>this.choosePayType(PAY_TYPE.ZFB)}>
                                <Radio name="payType" style={styles.radioShow}/>
                                <img src={basePath+"images/pay/zfb.png"}/>
                            </div>*/}
                        </div>

                            <Modal
                                bsSize="small"
                                show={this.state.showModal}
                                onHide={this.closeModal.bind(this)}>
                                <Modal.Header>
                                    <Modal.Title>Modal title</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <QRCode value={qrCodePayMony}/>
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button onClick={this.closeModal.bind(this)}>Close</Button>
                                    {/*暂时关闭，用时放开　<Button bsStyle="primary">Save changes</Button>*/}
                                </Modal.Footer>

                            </Modal>
                            <div>
                                <Button bsStyle="primary"　onClick={()=>this.choosePayType(PAY_TYPE.WEIXIN)}>点我微信支付</Button>
                            </div>
                    </Col>



        )
    }
}


const styles={
    radioSel:{

        float:'left',

    },
    radioShow:{
        marginTop:'20px',
        float:'left',
        marginRight:'5px'

    }
}





