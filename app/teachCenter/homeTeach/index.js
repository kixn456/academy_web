/**
 * Created by JeatStone on 2017/9/12.
 */

import React from 'react';
import  ReactDOM from 'react-dom';
import {Grid,ROW,Col} from "react-bootstrap";
import HomeTeacher from './courseListByTeacher';
import HomeMain from '../../home/index';
export const MainPage = React.createClass({
    render: function () {
        return (
            <div>
                <div className="headerTop">
                    <HomeMain/>
                </div>
                <HomeTeacher/>
            </div>
        )
    }
});

ReactDOM.render(
    <MainPage/>,
    document.getElementById('mainFrame')
);


