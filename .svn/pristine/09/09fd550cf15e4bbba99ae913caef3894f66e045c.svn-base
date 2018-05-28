/**
 * Created by Administrator on 2018/3/23.
 * add evaluation
 */

import React, {Component} from 'react';
import {ControlLabel,Form,FormControl,InputGroup,FormGroup,Button,Col} from "react-bootstrap";
import * as CourseServer from '../../server/courseCenterServer';

export default class TeacherReward extends Component{
    constructor(props) {
        super(props);
        this.state={
            isRefershing:false
        }
        this.evaluation={
            money:0,
            content:'',

        }
    }

    componentDidMount(){

    }

    changeHandle(e){
        let name=e.target.name;
        let value=e.target.value;
        if(name=="conent" && value.length>140)
        {
            ithis.evaluation[name]=value.substring(0,140);
        }
        this.evaluation[name]=value;
        this.refreshRender();
    }
    submitEvaluation(){
        let newEvaluation=this.evaluation;
        this.evaluation.content="";
        this.evaluation.star=0;
        this.props.submitCallBack(newEvaluation);
        this.refreshRender();
    }

    setTeacherStar(num){
        this.evaluation.money=num;
        this.refreshRender();
    }

    renderStar(num=0){
        let _self=this;
        let starCount=5;
        let starList=[];

        for(let i=0;i<starCount; i++){
            let color="#666666";
            let emptyStar='☆';
            if(i===num)
            {
                emptyStar='★';
                color="red";
            }
            let plusIndex=i;
            starList.push(<span style={{color:color,cursor:'pointer',fontSize:'18px',border:'1px soild #ccc',padding:'10px 20px'}} name={i} key={"star_"+i} onClick={()=>_self.setTeacherStar(plusIndex)}> {(i+1).toFixed(2)}元</span>)
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
        let evaluation=this.evaluation;
        let starNo=this.star;
        return (
            <div style={{paddingBottom:'20px'}}>
                <Form horizontal>
                    <FormGroup controlId="formControlsTextarea">
                        <Col componentClass={ControlLabel} sm={2}>
                            打赏讲室
                        </Col>
                       <Col sm={10}>

                           {this.renderStar(evaluation.money)}
                       </Col>
                    </FormGroup>

                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>学习感受</Col>
                    <Col sm={10}>
                        <FormControl
                            name="content"
                            componentClass="textarea"
                            style={{height:'100px',marginTop:'10px',marginBottom:'10px'}} value={evaluation.content}
                            placeholder="请输入你的学习感受"
                            onChange={(e)=>this.changeHandle(e)} />
                    </Col>
                        </FormGroup>
                </Form>
                <div style={{float:'right'}}><Button bsStyle="primary" onClick={()=>this.submitEvaluation()} style={{padding:'4px 30px'}}>提交</Button></div>
            </div>
        )
    }
}
