/**
 * Created by Administrator on 2017/10/20.
 */

import React, {Component} from 'react';
import  ReactDOM from 'react-dom';
import {Grid,ROW,Col} from "react-bootstrap";
import HomeMain from '../home/index';
import CourseDescription from './detail/index'
import Footer from '../inc/foot/footer';

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
                <Footer/>
           </div>

        )
    }

}

ReactDOM.render(
    <CourseDetail/>,
    document.getElementById('mainPage')
);
