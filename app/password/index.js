/**
 * Created by JeatStone on 2017/9/25.
 *密码找回首页
 */
import React,{ Component } from 'react';
import  ReactDOM from 'react-dom';
import PasswordHeader from './passwordHeader';
import ForgetPassword from './forgetPassword';
class MainPage extends Component {

    render () {
        return (
            <div>
                <PasswordHeader/>
                <div>
                    <ForgetPassword/>
                </div>
            </div>
    )
   }
}

ReactDOM.render(
    <MainPage/>,
    document.getElementById('mainPage')
);


