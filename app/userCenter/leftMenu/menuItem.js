


/**
 * Created by Administrator on 2017/9/29.
 */

import React, {Component} from 'react';
import {Grid,Col,Row,Image,OverlayTrigger,Popover,Button} from "react-bootstrap";
import {Link } from 'react-router'
export default class LeftMenu extends Component {
    constructor(props) {
        super(props);
        this.state={
            currentIndex:0
        }

    }
    componentDidMount(){
        //console.log(this.props.menuData);
    }

    render() {
        let menuData=this.props.menuData;
        let _self=this;
        return (
            <div >
                <ul>
                    {

                        menuData.map(function(item,index){

                            return <li
                               /* onClick={()=>_self.props.menuItemClickFn(index)}*/
                                className="menuLeft_li" key={index} >
                                {/*<a href={item.url}> {item.name}</a>*/}
                                    {
                                        (_self.props.isRouter)
                                        ?
                                        <Link to={item.url} activeStyle={{color: 'white',background:'rgba(0,0,0,.4)',display:'block'}}>{item.name}</Link>
                                        :
                                        <a href={item.url}> {item.name}</a>
                                    }
                                </li>
                        })
                    }
                </ul>
            </div>
        )
    }

}