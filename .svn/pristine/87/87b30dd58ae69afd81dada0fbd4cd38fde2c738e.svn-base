/**
 * Created by Administrator on 2018/3/23.
 * add evaluation
 */

import React, {Component} from 'react';
import {ControlLabel,Form,FormControl,InputGroup,FormGroup,Button,Col} from "react-bootstrap";
import * as CourseServer from '../../server/courseCenterServer';

export default class AskQuestion extends Component{
    constructor(props) {
        super(props);
        this.state={
            isRefershing:false
        }
        this.evaluation={
            title:'',
            content:'',
            price:''
        }
    }

    componentDidMount(){

    }

    changeHandle(e){

        let name=e.target.name;
        let value=e.target.value;
        console.log(name+"=="+value);
        if(name=="conent" && value.length>140)
        {
            ithis.evaluation[name]=value.substring(0,140);
        }
        this.evaluation[name]=value;
        this.refreshRender();

    }
    submitEvaluation(){
        let newEvaluation=this.evaluation;
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
        let question=this.evaluation;
        return (
            <div style={{paddingBottom:'20px'}}>
                <Form horizontal>
                <FormGroup controlId="formControlsTextarea">
                    <Col componentClass={ControlLabel} sm={2}>
                        问题标题
                    </Col>
                   <Col sm={10}>
                    <FormControl
                        name="title" placeholder="请输入你问题的标题"   value={question.title}
                        onChange={(e)=>this.changeHandle(e)}/>
                   </Col>
                </FormGroup>

                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>学习感受</Col>
                    <Col sm={10}>
                        <FormControl
                            name="content"
                            componentClass="textarea"
                            style={{height:'100px',marginTop:'10px',marginBottom:'10px'}} value={question.content}
                            placeholder="请输入你的问题"
                            onChange={(e)=>this.changeHandle(e)} />
                    </Col>
                        </FormGroup>

                    <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>明码求助</Col>
                    <Col sm={10}>
                        <InputGroup>
                            <InputGroup.Addon>￥</InputGroup.Addon>
                            <FormControl type="text" name="price"  placeholder="出价！"  value={question.price} onChange={(e)=>this.changeHandle(e)}/>
                            <InputGroup.Addon>.00</InputGroup.Addon>
                        </InputGroup>

                    </Col>
                </FormGroup>

                </Form>
                <div style={{float:'right'}}><Button bsStyle="primary" onClick={()=>this.submitEvaluation()} style={{padding:'4px 30px'}}>提交</Button></div>
            </div>
        )
    }
}
