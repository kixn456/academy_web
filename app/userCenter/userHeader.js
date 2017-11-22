import React,{ Component } from 'react';
import  '../../css/style.css';
import  '../../css/slider.css';
import  HeaderNav from "../home/header/index";
import SearchBox from './search';
import {UserNavData}  from '../config/configMenu';
import {Grid,Col,Row,Image} from "react-bootstrap";
import Header from "../home/index"
export default class UserHeader extends Component {

    constructor(props) {
        super(props);
        this.state={
            loginFlag:false
        }
    }
    componentDidMount(){

    }

    render() {
        return (
            <div>
                <Header/>
                {/*<div className="header">
                    <Grid>
                        <Row className="show-grid">
                            <Col sm={3}>
                                 <div className="logo">
                                    <a href="index.html"><img src="../images/logo.png" title="logo" /></a>
                                </div>
                            </Col>
                            <Col sm={5} > <SearchBox/></Col>
                            <Col sm={3}>
                                <HeaderNav menuList={UserNavData}/>
                            </Col>
                            <Col sm={1}>
                                <Image src={"../images/symbol/aze.jpg"} width={40} circle  style={{float:'right'}}/>
                            </Col>
                        </Row>
                    </Grid>

                </div>*/}
            </div>
        )
    }
}


