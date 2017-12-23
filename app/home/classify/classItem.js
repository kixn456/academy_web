/**
 * Created by JeatStone on 2017/9/21.
 * @课程分类
 * @pamra DataSource
 *
 */
import React,{ Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import {Grid,ROW,Col} from "react-bootstrap";
import * as Commom from '../../public/commom/commom';
const basePath=Commom.getRootPath();
export default class ClassItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            activeList:[],
            dataSource:this.props.dataSource
        }
    }
    gotoPage(item){
        location.href=basePath+"courseList.html?keyword="+item.name+"&id"+item.id;
    }
    controllerMenu(index){
        let dataSource=this.state.dataSource;
        let activeList=dataSource[index].child;
        this.setState({
            activeList:activeList
        })
    }
    closeMenu(){
        this.setState({
            activeList:[]
        })
    }
    componentDidMount(){

    }
    render(){
        let _self=this;
        let dataSource=this.state.dataSource;
        let childList=this.state.activeList;

        return(
            <div onMouseLeave={()=>this.closeMenu()}>
                {
                    (childList.length>0)
                    ?
                        <div className="maskChild">
                            <ul>
                            {
                                childList.map(function(item,index){
                                    return <li className="menuChildLi" key={index} >
                                        <a href="#" onClick={()=>_self.gotoPage(item)} >{item.name}</a>
                                    </li>
                                })
                            }
                            </ul>
                        </div>
                        :
                      null
                }

                <ul >
                    <QueueAnim delay={300} className="queue-simple"></QueueAnim>
                    {
                        dataSource.map(function(item,index){
                            return <li className="menuLi" key={index} onMouseOver={()=>_self.controllerMenu(index)} >
                                <a href="#" >{item.name}</a>
                            </li>
                        })
                    }
                </ul>

            </div>
        )
    }
}