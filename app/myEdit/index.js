/**
 * Created by Administrator on 2017/12/21.
 */

import React, {Component} from 'react';
import  ReactDOM from 'react-dom';
import {Grid,ROW,Col} from "react-bootstrap";


export default class MyEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {editorHtml: ''} // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(html) {
        this.setState({editorHtml: html});
    }

    render() {
        return (
            <div style={{padding:'10px'}}>
                <div id="myEditor" contentEditable={true} suppressContentEditableWarning={true} style={{height:'400px',border:'2px solid #ccc', width:'100%'}}></div>
            </div>
        )
    }
}


ReactDOM.render(
    <MyEdit placeholder={'Write something or insert a star ★'}/>,
    document.getElementById('MainPage')
);


