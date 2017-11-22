/**
 * Created by Administrator on 2017/9/29.
 */

import React, {Component} from 'react';
import MenuItem from './menuItem';
import {Image} from "react-bootstrap";
export default class LeftMenu extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){

    }
    render() {
        return (
            <div>
                <div style={{textAlign:'center',clear:'both',marginTop:'30px'}}>
                    <Image  src={"../images/symbol/aze.jpg"} width={80} circle  style={{margin:'0px auto',border:'5px solid #fff'}}/>
                </div>
                <p className='iconList' style={{textAlign:'center'}}>
                    <span className='glyphicon glyphicon-user'></span>
                    <span className='glyphicon glyphicon-phone'></span>
                    <span className='glyphicon glyphicon-envelope'></span>
                    <span className='glyphicon glyphicon-wrench'></span>
                </p>
                <MenuItem  menuData={this.props.menuData} isRouter={this.props.isRouter}  menuItemClickFn={(routerIndex)=>this.props.menuItemClickFn(routerIndex)} />
            </div>
        )
    }

}
