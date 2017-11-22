import React,{ Component } from 'react';
import {FormGroup,Col} from "react-bootstrap";



//首页导航菜单数据项

export default class Step extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount()
    {

    }


    render() {
        let props=this.props;
        let dataSource=props.dataSource;
        let _self=this;
        return (
            <div style={{padding:"30px 0"}}>
            <FormGroup className='setp'>
            {

                dataSource.map(function(item,index){
                    let smSize=12/dataSource.length;
                    let currentClass=(props.currentStep==index)?'current':'';
                    return <Col sm={smSize} className={currentClass} key={index}>
                                <a href="javascript:void(0);"><Col className="content" onClick={()=>props.clickCallBack(index)}><i>{index+1}</i><em>{item.title}</em></Col></a>
                            </Col>
                })
            }
            </FormGroup>
            </div>
        )
    }
}


