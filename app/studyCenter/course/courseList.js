/**
 * Created by Administrator on 2017/10/12.
 *@description
 *@author
 *@out
 */


import React, {Component} from 'react';
import {Grid,Row,Col,Thumbnail,Button} from "react-bootstrap";
import * as StudyServer from '../../server/studyCenterServer';



export default class CourseList extends Component {
    constructor(props) {
        super(props);
        this.state={

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
       let userId=123;
       let _self=this;
       StudyServer.getAjaxCourseListWithUser(userId,function(data){
            console.log(data);
            if(data.result==0){
                _self.setState({
                    courseList:data.responseInfo.courseList,
                    taskList:data.responseInfo.taskList
                })
            }

       },function(e){
           console.log("异常错误")
       })
   }
    render() {
            let _self=this;
            let courseList=this.state.courseList;
        return (

                <Col>
                    {
                        ( courseList.length>0)
                        ?
                        courseList.map(function(item,index){
                            return (

                                <Col xs={6} md={4} key={index}>
                                    <Thumbnail src={"../"+item.imgUrl} alt="242x200">
                                        <h3> {item.title}</h3>
                                        {
                                            (_self.currentRouter!='myCollection')
                                            ?
                                                <Col>
                                                    <div className="progress" style={{height:'5px',marginTop:'10px'}}>
                                                        <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width:'60%',height:'5px'}}>
                                                            60%
                                                        </div>
                                                    </div>
                                                    <div><Button bsStyle="success">继续学习</Button><span style={{float:'right'}}>学习进度：2/7</span></div>
                                                </Col>
                                                :
                                                <Col>
                                                    <div>难度级别：{item.level}</div>
                                                </Col>
                                        }

                                    </Thumbnail>
                                </Col>
                            )
                        })
                            :
                            null

                    }
                </Col>

        )
    }

}