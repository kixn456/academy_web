/**
 * Created by Administrator on 2017/10/20.
 */

import React, {Component} from 'react';
import  ReactDOM from 'react-dom';
import {Grid,ROW,Col} from "react-bootstrap";
import HomeMain from '../home/index';
import CourseDescription from './detail/index'


 class CourseDetail extends Component{
     constructor(props) {
         super(props);
         this.state= {
             loginShow:false
         }
     }

     onLogin(){
         this.setState({
             loginShow:true
         })
     }

    render() {

        return (
            <div>
                <HomeMain loginShow={this.state.loginShow} />
                <CourseDescription onLoginCallBack={()=>this.onLogin()}/>
           </div>

        )
    }

}

ReactDOM.render(
    <CourseDetail/>,
    document.getElementById('mainPage')
);
