import React,{ Component } from 'react';
import {FormGroup,InputGroup,FormControl,Button} from "react-bootstrap";

export default class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state={
            keyword:''
        }
    }


    searchHandle(e){
    this.setState({
        keyword:e.target.value
    })
    }
    searchSubmit(){
        let keyword=this.state.keyword;
       location.href="courseList.html?keyword="+keyword;
    }
    render(){
        return(

                <InputGroup>
                    <FormControl  style={{borderColor:'#51CA1C'}} type="text" value={this.state.keyword} placeholder="输入要搜索的内容" onChange={(e)=>this.searchHandle(e)} />
                    <InputGroup.Button onClick={()=>this.searchSubmit()}>
                        <Button style={{background:'#51CA1C',color:'white'}}><span className='glyphicon glyphicon-search' ></span></Button>
                    </InputGroup.Button>
                </InputGroup>

        )
    }

}