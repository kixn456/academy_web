/**
 * Created by Administrator on 2017/9/29.
 */

import React, {Component} from 'react';
import {Grid,ROW,Col,Tabs,Tab,Modal,Button,ButtonGroup,FormGroup,Form,FormControl} from "react-bootstrap";
export default class ModifyUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state={
            userInfo:{
                nickName:'李国强',
                job:'部门经理',
                sex:'李国强',
                company:'信威集团',
                address:'北京海滨区',
                sign:'helison'
            }
        }
    }
    hideModal(){
        this.props.closeHandle();
    }
    handleChange(target){
        console.log(target);
        console.log(this[target].value)
        let userInfo=this.state.userInfo;
        userInfo[target]=this[target].value;
        this.setState({
            userInfo:userInfo
        })
    }
    modifyUserInfoSubmit(){

    }

    render() {
        return (

            <Modal
                show={this.props.show}
                onHide={this.hideModal.bind(this)}
            >
                <Modal.Header  closeButton>
                    完善用户信息
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>

                            {/*phoneNumber**/}
                            <FormGroup >
                                <Col smOffset={2} sm={8}>
                                    <FormControl placeholder="呢称"  inputRef={(ref) => {this.nickName = ref}}    onChange={()=>this.handleChange('nickName')}></FormControl>
                                </Col>
                            </FormGroup>
                        {/*password**/}
                        <FormGroup>
                                <Col smOffset={2} sm={8}>
                                    <FormControl placeholder="职位"  inputRef={(ref) => {this.job = ref}}    onChange={()=>this.handleChange('job')}></FormControl>
                                </Col>
                    </FormGroup>
                    {/*password**/}
                             <FormGroup>
                                <Col smOffset={2} sm={8}>
                                    <FormControl placeholder="地址"  inputRef={(ref) => {this.address = ref}}    onChange={()=>this.handleChange('address')}></FormControl>
                                </Col>
                            </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={8}>
                                <FormControl type='radio' placeholder="性别"  inputRef={(ref) => {this.sex = ref}}    onChange={()=>this.handleChange('sex')}></FormControl>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={8}>
                                <FormControl  placeholder="签名   "  inputRef={(ref) => {this.sign = ref}}    onChange={()=>this.handleChange('nickName')}></FormControl>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={8}>
                                <FormControl  placeholder="公司名称   "  inputRef={(ref) => {this.company = ref}}    onChange={()=>this.handleChange('company')}></FormControl>
                            </Col>
                        </FormGroup>
                            {/*password**/}
                            <FormGroup>
                                <Col smOffset={2} sm={8}>
                                    {this.state.errorMsg}
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col smOffset={2} sm={8}>
                                    <Button type="button" disabled={this.state.submitDisable}  bsStyle="success"  bsSize="large" block onClick={this.modifyUserInfoSubmit.bind(this)}>
                                        Register
                                    </Button>
                                </Col>
                            </FormGroup>
                    </Form>

                </Modal.Body>
            </Modal>



        )
    }

}