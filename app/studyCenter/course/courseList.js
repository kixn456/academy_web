/**
 * Created by Administrator on 2017/10/12.
 *@description
 *@author
 *@out
 */


import React, {Component} from 'react';
import {Grid,Row,Col,Thumbnail,Button} from "react-bootstrap";
import * as StudyServer from '../../server/studyCenterServer';
import * as Commom from "../../public/commom/commom";
import Storage from '../../common/storeage';
const basePath=Commom.getRootPath();

export default class CourseList extends Component {
    constructor(props) {
        super(props);
        this.state={
            pageInfo:{
                userId:"",
                category:'ubuyer',
                startCreateTime:'2017-12-01 00:00:00', //查询用户的已购买的课程信息，开始时间与结束时间固定写死
                endCreateTime:'2017-12-30 00:00:01',
                pageSize:10,
                pageNum:1
            },
            courseList:[],
            taskList:[]
        }
        this.currentRouter="";
    }
   componentDidMount(){
        let urlParams=location.hash;
        let currentRouter=urlParams.replace("#/","");
        this.currentRouter=currentRouter;
        this.initData();
   }

   initData(){
       let userInfo=Storage.get("userInfo");
       let userId=userInfo.userId;
       let _self=this;
       let pageInfo=_self.state.pageInfo;
       pageInfo.userId=userId;
       StudyServer.getAjaxBuyerCourseListWithUser(userId,pageInfo,function(code,data){

            if(code==0){
                _self.setState({
                    courseList:data.list
                })
            }

       },function(e){
           console.log("异常错误")
       })
   }
    gotoDetail(id){
       location.href=basePath+"courseDetail.html?id="+id;
    }
    render() {
            let _self=this;
            let courseList=this.state.courseList;
        return (

                <div  className="demo">
                    {
                        ( courseList.length>0)
                        ?
                        courseList.map(function(item,index){
                            let orderData=JSON.parse(item.orderData);
                            let photoName=Commom.formatServerPhoto(orderData.courseAvatar);

                            return(
                                <div  className="myColLi" key={index} >
                                    <div><img src={photoName.middlePhoto}  />
                                        <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width:'60%',height:'5px',verticalAlign:'text-top',background:'green'}}>
                                            60%
                                        </div>
                                    </div>
                                    <div>
                                        {

                                            (_self.currentRouter!='myCollection')
                                                ?
                                                <Col>

                                                    <div style={{clear:'both',lineHeight:'40px',color:'#999'}}>{orderData.title}</div>
                                                    <div  style={{fontSize:'12px',padding:0}}><Button bsStyle="success" onClick={()=>_self.gotoDetail(orderData.courseId)} style={{float:'right',padding:'0px 10px',borderRadius:0,background:'green',fontSize:'12px'}}>继续学习</Button><span style={{float:'left'}}>已学习：2/7</span></div>
                                                </Col>
                                                :
                                                <Col>
                                                    <div>难度级别：{item.level}</div>
                                                </Col>

                                        }
                                    </div>

                                </div>
                            )
                        })
                            :
                            null

                    }
                </div>

        )
    }

}
