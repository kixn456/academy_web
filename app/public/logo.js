/**
 * Created by JeatStone on 2017/9/25.
 *密码找回首页
 */

import React,{ Component } from 'react';

import  '../../images/logo.png';
import  '../../css/slider.css';
import * as Commom from '../public/commom/commom';
console.log(Commom.getRootPath());
const basePath=Commom.getRootPath();

export default class Logo extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount()
    {

    }


    render() {
        return (
            <div>
                <div className="logo">
                    <a href={basePath+"index.html"}><img src={basePath+"images/logo.png"} title="logo" /></a>
                </div>
            </div>
        )
    }
}
