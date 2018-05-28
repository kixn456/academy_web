/**
 * Created by Administrator on 2017/10/20.
 */

import React, {Component} from 'react';
import {Grid,ROW,Col,Button,Tab,Tabs,Icon,Popover,OverlayTrigger,ControlLabel,FormControl,FormGroup} from "react-bootstrap";
import * as CourseServer from '../../server/courseCenterServer';
import * as EvaluationServer from '../../server/evaluationServer'
import Storage from '../../common/storeage';
import "../../../css/custome.css";
import AddEvaluation from '../evaluation/addEvaluation';
import Star from '../../common/star';
export default class Discuss extends Component {
    constructor(props) {
        super(props);
        this.state={
            isRefershing:false
        };

        this.querySubmitData={
                pageSize:10,
                pageNum:0,
                category:"courseEval",
                startCreateTime:"2018-01-01 12:00:00",
                userId:""
        };
        this.evaluationList=[];
        this.courseInfo=this.props.courseInfo;
        this.addLikeList={};
    }

    componentDidMount(){

        let userInfo=Storage.get("userInfo");
        this.userInfo=userInfo;
    }

    componentWillReceiveProps(props){

        if(props.courseId!=this.courseInfo)
        {
            this.courseInfo=props.courseId;
            this.getEvaluationList(1);
        }

    }

    //请求评论列表
    getEvaluationList(pageNum){
        let _self=this;
        this.querySubmitData.pageNum=pageNum;
        let submitData=Object.assign({},this.querySubmitData);
        submitData.userId=this.courseInfo;
        EvaluationServer.getEvaluationList(submitData,function(data){
            _self.evaluationList=data.responseInfo.list;
            _self.refreshRender();
        },function(){

        })
    }


    //发布评论刷新界面
    submitCallBack(text){
        if(!this.userInfo)
        {
            alert("你还是游客，无法发布评论");
            return;
        }
        let ajaxData={
            userId:this.userInfo.userId,
            courseId:this.courseInfo
        };
        ajaxData=Object.assign(ajaxData,text);


        let _self=this;
        EvaluationServer.addEvaluationByAjax(ajaxData,function(code,data){
            _self.evaluationList.unshift(data);
            _self.refreshRender();
        },function(e){
            console.log("评论发布失败");
        })

    }


    //点赞并刷新
    addLikeEvaluation(evaluationId,courseId,createrUserId){
        let _self=this;
        let ajaxData={
            courseId:courseId,
            createrUserId,
            evaluationId
        };
        let addLikeItem={count:0};
        this.addLikeList[evaluationId]["count"]++;
        EvaluationServer.addLikeEvaluation(ajaxData,function(data){
                _self.refreshRender();
        },function(e){
            console.log("点赞失败");
        })
    }
    exchangeLocalTime(createTime){

        let showTime="";
        let localTime=new Date().getTime();
        let serverTime=new Date(createTime).getTime();
        let showDay=(localTime-serverTime)/1000/60/60/24;
        if(showDay>=1){
            if(showDay/30>1)
            {
                showTime=parseInt(showDay/30)+"月前";
            }else{
                showTime=parseInt(showDay)+"天前";
            }

        }else{
            showTime=parseInt(showDay*24);
            if(showTime<1){
                showTime=parseInt(showDay*24*60)+"分钟前"
            }else{
                showTime=showTime+"小时前"
            }
        }
        return showTime;
    }

    renderStar(num=0){
        let _self=this;
        let starCount=5;
        let starList=[];

        for(let i=0;i<starCount; i++){
            let color="#666666";
            let emptyStar='☆';
            if(i<=num)
            {
                emptyStar='★';
                color="red";
            }
            let plusIndex=i;
            starList.push(<span style={{color:color,cursor:'pointer',fontSize:'10px',marginLeft:'2px'}} name={i} key={"star_"+i} onClick={()=>_self.setTeacherStar(plusIndex)}> {emptyStar}</span>)
        }
        return starList;
    }


    refreshRender(){
        let isRefershing=this.state.isRefershing;
        this.setState({
            isRefershing:!isRefershing
        })
    }
    render() {
        let _self=this;
        let evaluationList=this.evaluationList;
        let totalCount=0;
        return (
            <div style={{border:'1px solid #efefef',minHeight:'400px',padding:'10px'}}>
                <div>
                    <AddEvaluation submitCallBack={(text)=>this.submitCallBack(text)}/>
                </div>

                <div style={{padding:'10px 0px 10px 0px'}}>
                    {
                        evaluationList.length>0
                            ?
                            <div>

                                {
                                    evaluationList.map(function(item,index){
                                            let orderData=JSON.parse(item.orderData);
                                            let createTime=orderData.createTime;
                                            let showTime=_self.exchangeLocalTime(createTime);
                                            let evaluationId=item.orderId;
                                            let addLikeCssName="";
                                            let addLikeCssSize="12px";
                                           if(!_self.addLikeList[evaluationId])
                                            {
                                                _self.addLikeList[evaluationId]={count:item.amount};
                                            }

                                            let amount=_self.addLikeList[evaluationId].count;
                                            let createrUserName=orderData.createrUsername||orderData.createrUserName;
                                            let createrUserId=orderData.createrUserId||orderData.createrUserid;
                                            let starLevel=orderData.starLevel;
                                            return  <div key={index} style={{marginTop:'10px',clear:'both',overflow:'hidden',borderTop:'1px solid #ececec',padding:'4px'}}>
                                                <Col sm={1} >
                                                    <div>
                                                        <img src={orderData.createrAvatar?orderData.createrAvatar:"images/img10.jpg"} style={{width:40,height:40,borderRadius:20}}/>
                                                    </div>
                                                     </Col>

                                                <Col sm={11}>
                                                    <div style={{lineHeight:'2em'}}>
                                                        <div style={{fontSize:'14px',color: '#4d555d',fontWeight: 700}}>

                                                            {createrUserName?(createrUserName):"游客留言"}
                                                            <span style={{paddingLeft:'10px'}}><Star size={starLevel} /></span>
                                                        </div>

                                                        <div style={{color:'#303538'}} >
                                                            {orderData.content}
                                                            <div style={{fontSize:'12px',color:'#93999f'}}>{showTime}<span onClick={()=>_self.addLikeEvaluation(item.orderId,orderData.courseId,createrUserId)}style={{float:'right'}}><i className="glyphicon glyphicon-thumbs-up" style={{color:addLikeCssName,fontSize:addLikeCssSize}}></i>&nbsp;{amount}</span></div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </div>
                                    })
                                }
                            </div>
                            :
                            null
                    }
                </div>

            </div>
        )
    }



}

