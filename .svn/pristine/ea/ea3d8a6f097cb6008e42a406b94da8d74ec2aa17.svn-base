/**
 * Created by Administrator on 2018/3/23.
 * add evaluation
 */

import React, {Component} from 'react';
import {ControlLabel,FormControl,FormGroup,Button,Col} from "react-bootstrap";
import * as CourseServer from '../../server/courseCenterServer';

export default class AddEvaluation extends Component{
    constructor(props) {
        super(props);
        this.state={
            isRefershing:false
        }
        this.evaluation="";
        this.star=0;
    }

    componentDidMount(){

    }

    changeHandle(e){

        if(e.target.value.length>140){
            this.evaluation=e.target.value.substring(0,140);
        }else{
            this.evaluation=e.target.value;
        }
        this.refreshRender();
    }

    setTeacherStar(num){

        this.star=num;
        this.refreshRender();
    }

    renderStar(num=0){
        let _self=this;
        let starCount=5;
        let starList=[];

        for(let i=0;i<starCount; i++){
            let color="#666666";
            let emptyStar= <i className="glyphicon glyphicon-star-empty" style={{fontSize:'14px',paddingRight:'10px'}}></i>;

            if(i<=num)
            {
                emptyStar= <i className="glyphicon glyphicon-star" style={{fontSize:'14px',paddingRight:'10px'}}></i>;
                color="#FA3652";
            }
            let plusIndex=i;
            starList.push(<span style={{color:color,cursor:'pointer',fontSize:'16px'}} name={i} key={"star_"+i} onClick={()=>_self.setTeacherStar(plusIndex)}> {emptyStar}</span>)
        }
        return starList;
    }

    submitEvaluation(){
        let newEvaluation={
            content:this.evaluation,
            starLevel:this.star
        };
        this.evaluation="";
        this.props.submitCallBack(newEvaluation);
        this.refreshRender();
    }
    refreshRender(){
        let isRefershing=this.state.isRefershing;
        this.setState({
            isRefershing:!isRefershing
        })
    }
    render() {
        let starNo=this.star;
        return (
            <Col style={{borderTop:'1px soild #ececec'}}>
                <Col   sm={12}>
                    <Col sm={2}>
                        评价打星
                    </Col>
                    <Col sm={10}>

                        {
                            this.renderStar(starNo)
                        }

                    </Col>
                </Col>
                <Col  sm={12}>
                    <Col sm={2}>发表评论</Col>
                    <Col sm={10}>
                        <FormControl
                            componentClass="textarea"
                            style={{height:'100px',marginTop:'10px',marginBottom:'10px'}} value={this.evaluation}
                            placeholder="你可以在这儿发布评论哦！"
                            onChange={(e)=>this.changeHandle(e)} />
                    </Col>
                </Col>
                <div style={{textAlign:'right',paddingRight:'30px'}}><Button bsStyle="primary" onClick={()=>this.submitEvaluation()} style={{padding:'4px 30px'}}>提交</Button></div>
            </Col>
        )
    }
}
