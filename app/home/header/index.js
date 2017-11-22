/**
 * Created by Jeastone on 2017/9/18.
 */
import React, { Component } from 'react';
import * as Commom from "../../public/commom/commom";
import Storage from '../../common/storeage';
const  basePath=Commom.getRootPath();
export default class HeaderMenu extends Component {
    constructor(props) {
        super(props);
    }
    jumpTo(url){

        let loginFlag=Storage.get("loginFlag");
        if(loginFlag){
            location.href=url;
        }else{
            alert("请登录");
        }

    }
    render()
    {
        let _self=this;
        return(
            <div className="top-nav">
                <ul>
                    {
                        this.props.menuList.map(function(item,index){
                            let styleName='';
                            if(index==0)
                            {
                                styleName='active';
                            }
                            let localUrl=basePath+item.url;
                            return <li key={index} style={{fontSize:'14px',cursor:'pointer',fontWeight:'bolc'}}><a  onClick={()=>_self.jumpTo(localUrl)} className={styleName} data-hover={item.name}>{item.name}</a></li>
                        })
                    }
                </ul>
            </div>

        )
    }
}
