/**
 * Created by Jeastone on 2017/9/18.
 */
import React,{ Component } from 'react';
import {Modal,Button,Row,Col} from "react-bootstrap";
import  RegisterForm from './register';
import RegisterSuccess from './registerSuccess';


export default class RegisterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          registerSuccss:false
        }
    }

    hideModal() {
        this.props.closeModalCallBack(false);
    }

    lisentCallBack(registerSuccss)
    {
        this.setState(registerSuccss);
    }
    render()
    {
        return(

                <Modal
                    show={this.props.show}
                    onHide={this.hideModal.bind(this)}
                >
                    <Modal.Header  closeButton>
                        <Row>
                            <Col sm={10}>
                                新用户注册
                            </Col>
                        </Row>
                    </Modal.Header>
                    <Modal.Body>

                        {
                            (this.state.registerSuccss)
                            ?
                                <RegisterSuccess/>
                            :
                                <RegisterForm callHandle={(data)=>this.lisentCallBack(data)}/>
                        }
                    </Modal.Body>

                </Modal>


        )
    }
}
