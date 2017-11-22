/**
 * Created by Administrator on 2017/10/20.
 */

import React, {Component} from 'react';
import {Grid,Row,Col,Thumbnail,Image,Button,Pagination} from "react-bootstrap";
import * as CourseServer from '../../server/courseCenterServer';
import {ClassList} from '../../testData/classData';
export default class CourseList extends Component {
    constructor(props) {
        super(props);
        this.state={
            courseClassList:ClassList.responseInfo.list,
            childList:ClassList.responseInfo.list[0].child,
            courseList:[],
            pageInfo:{
                keyword:'JAVA',
                category:'2',
                pageNo:'1',
                pageSize:'10',
                fitPeople:'本科',
                difficultyLevel:'2',
                priceRange:'20-50'
            }
        }
    }
    componentDidMount(){
        this.initData();
    }
    initData(){
        let searchInfo=this.state.pageInfo;
        let _self=this;
        CourseServer.getCourseListBySearch(searchInfo,function(data){

            console.log(data);
            _self.setState({
                courseList:data.responseInfo.courseList
            })
        },function(e){
            console.log("error");
        })
    }


    changeChild(index){
        let childList=this.state.courseClassList;
        this.setState({
            childList:childList[index].child
        })
    }

    render() {
        let courseList=this.state.courseList;
        let courseClassList=this.state.courseClassList;
        let childrenList=this.state.childList;
        let _self=this;
        return (
            <Grid style={{marginTop:'60px'}}>
                <Col style={{padding:'20px 0px'}}>  首页  > 全部课程 >  编程开发  > 编程语言 >  Java >  课程详情</Col>
                <Col xs={12} md={12} style={{background:'white',border:'1px solid #ccc',padding:'20px 0px'}}>
                    <Col xs={12} md={12} style={{borderBottom:'1px solid #eee',paddingBottom:'10px'}}>
                        <span style={{float:'left',paddingRight:'15px'}}>方向</span>
                        <ul className="search_filter">
                            {
                                courseClassList.map(function(item,index){
                                    let className=(index==0)?"activeLi":"";
                                    return <li className="menuLi" key={index}  onMouseOver={()=>_self.changeChild(index)}  >
                                        <a href="#" className={className}>{item.name}</a>
                                    </li>
                                })
                            }

                        </ul>

                    </Col>
                    <Col  xs={12} md={12} style={{marginTop:'10px'}}>
                        <span style={{float:'left',paddingRight:'15px'}}>分类</span>
                        <ul  className="search_filter">
                            {
                                childrenList.map(function(item,index){
                                    let className=(index==0)?"activeLi":"";
                                    return <li className="menuLi" key={index}>
                                        <a href="#" className={className}>{item.name}</a>
                                    </li>
                                })
                            }
                        </ul>
                    </Col>
                </Col>

                    <Col  xs={12} md={12}  style={{marginTop:'10px',padding:'0'}}>
                    <div className="courseFilte">
                    <em className="colorGreen">综合排序</em>
                     <span><a href="#">好评率</a><a href="#">人气</a> </span>
                    <span style={{float:'right'}}>
                        <a href="#" className="activeLi">全部</a>
                        <a href="#">免费</a>
                        <a href="#">收藏</a></span>
                    </div>
                    </Col>
                <Col xs={12} md={12} style={{padding:0,marginTop:'10px'}}>
                    <div className="courseList">
                {
                    (courseList.length>0)
                    ?
                    courseList.map(function(item,index){
                        return (
                                <div className="courseItem" key={index}>
                                    <div style={{background:'white',textAlign:'center'}}>
                                            <a href={"courseDetail.html?courseId="+item.courseId}>
                                                <Image  src={item.courseAvatar} style={{maxHeight:'140px'}} />
                                            </a>
                                    </div>

                                    <div className="courseItem_p">
                                        <h3>{item.title.substring(0,15)}</h3>
                                        <p style={{fontSize:'12px',color:'#93999F'}}>{item.courseInfo.substring(0,15)}</p>
                                        <p style={{fontSize:'12px',color:'#93999F'}}>
                                            {item.fitPeople.substring(0,15)}
                                        </p>
                                    </div>
                                </div>
                        )
                    })



                        :
                        null
                }
                  </div>
                <div>
                    <Pagination

                    items={10}
                    activePage={this.state.activePage}
                    onSelect={this.handleSelect}
                /></div>
                </Col>
            </Grid>
        )
    }

}