/**
 * Created by Administrator on 2017/9/29.
 */
import React, {Component} from 'react';
import {Image,Media,Button} from "react-bootstrap";
export default class AccountBind extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (

                <div style={{padding:'0px 14px' }}>
                    <div style={{borderBottom:'1px solid #ccc',lineHeight:'60px'}}>
                        <span>用户信息</span>
                        <span style={{float:'right'}}>

                           </span>
                    </div>
                <Media className='mediaCustom'>
                    <Media.Left>
                        <img  style={{maxWidth:'70px'}} src="../images/symbol/email.png" alt="Image"/>
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading>邮箱没绑定</Media.Heading>
                        <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                    </Media.Body>
                    <Media.Right>
                        <Button bsStyle="danger">前往绑定</Button>
                    </Media.Right>
                </Media>
                <Media className='mediaCustom'>
                    <Media.Left>
                        <img  style={{maxWidth:'70px'}} src="../images/symbol/mobile.png" alt="Image"/>
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading>绑定手机</Media.Heading>
                        <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                    </Media.Body>
                    <Media.Right>
                        <Button bsStyle="danger">前往绑定</Button>
                    </Media.Right>
                </Media>
                <Media className='mediaCustom'>
                    <Media.Left >
                        <img  style={{maxWidth:'70px'}} src="../images/symbol/safe.png" alt="Image"/>
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading>密码已设置</Media.Heading>
                        <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                    </Media.Body>
                    <Media.Right>
                        <Button bsStyle="warning">前往绑定</Button>
                    </Media.Right>
                </Media>
            </div>
        )
    }
}