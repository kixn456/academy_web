/**
 * Created by Jeastone on 2017/9/13.
 */
import React,{ Component } from 'react';
import {Image} from "react-bootstrap";
export default class Star extends Component {
    renderAllStar(){
        let starNumber=this.props.size;
        let starList=[];
        let emptyStar=5-starNumber;

        for(var i=0; i<5; i++)
        {

            let starItem=<Image src={"images/star/star_fill.png"} style={{width:10}} key={i} />;
            let emptyStar=<Image src={"images/star/star.png"} style={{width:10}} key={i} />;
            let star=(i<starNumber)?starItem:emptyStar;
            starList.push(star);
        }



        return starList;
    }
    render(){
        let starNumber=this.props.size;
        return(
            <span>
                {this.renderAllStar()}
            </span>

        )
    }
}



