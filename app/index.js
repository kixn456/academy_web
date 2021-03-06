/**
 * Created by JeatStone on 2017/9/12.
 */

import React from 'react';
import  ReactDOM from 'react-dom';
import {Grid,Row,Col} from "react-bootstrap";
import HomeMain from './home/index';
import {HomeBanner} from "./home/banner";
import HomeCourseList from "./home/homeCourseList";
import HomeClassify from './home/classify/index';
import Footer from './inc/foot/footer';
export const MainPage = React.createClass({
    render: function () {
        return (
            <div>
                <div className="headerTop">
                    <HomeMain/>
                </div>
                    <Grid style={{position:'relative',marginTop:'60px'}}>
                        <HomeClassify/>
                    </Grid>
                    <HomeBanner/>
                <Grid>
                    <HomeCourseList/>
                </Grid>
                <Col>
                    <Footer/>
                </Col>
            </div>
        )
    }
});

ReactDOM.render(
    <MainPage/>,
    document.getElementById('home')
);


