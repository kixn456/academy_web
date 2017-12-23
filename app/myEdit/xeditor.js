/**
 * Created by Administrator on 2017/12/22.
 */
/**
 * Created by Administrator on 2017/12/21.
 */

import React, {Component} from 'react';
import  ReactDOM from 'react-dom';

export default class xeditor extends Component {
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
            <div>

            </div>
        )
    }
}


ReactDOM.render(
    <MyEdit placeholder={'Write something or insert a star ★'}/>,
    document.getElementById('MainPage')
);


