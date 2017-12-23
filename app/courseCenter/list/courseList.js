/**
 * Created by Administrator on 2017/10/20.
 */

import React, {Component} from 'react';
import {Grid,Row,Col,Thumbnail,Image,Button,Pagination} from "react-bootstrap";
import * as CourseServer from '../../server/courseCenterServer';
import {ClassList} from '../../testData/classData';
import * as Commom from '../../public/commom/commom';
import CourseItem from '../../home/cousrse/courseItem';
const basePath=Commom.getRootPath();
export default class CourseList extends Component {
    constructor(props) {
        super(props);
        let parmaster=Commom.GetRequest();
        let keyword=parmaster.keyword;
        let category=parmaster.id;

        this.state={
            courseClassList:ClassList,
            childList:ClassList[0].child,
            courseList:[],
            activeLiIndex:{
                parent:0,
                child:0,
                orderBy:0,  //0综合　1好评　2人秘
                filte:0　　　//0全部　1：免费　2：收藏
            },
            searchInfo:{
                keyword:keyword,
                category:category,
                pageNum:1,
                pageSize:10,
                pages:10,
                size:10,
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
        let searchInfo=this.state.searchInfo;
        let _self=this;
   /*     let parmaster=Commom.GetRequest();
        let keyword=parmaster.keyword;
        let category=parmaster.id;*/

    CourseServer.getCourseListBySearch(searchInfo,function(code,data){
        let newData=JSON.parse(data);
        let pageInfo={
            pageSize:newData.pageSize,
            pages:newData.pages,
        }
        let page=_self.state.searchInfo;
        let newPage=Object.assign(page,pageInfo);
        _self.setState({
            courseList:newData.list,
            searchInfo:newPage

        })
    },function(e){
        console.log("error");
    })
}
handleSelect(pageNum){

    let searchInfo=this.state.searchInfo;
    searchInfo.pageNum=pageNum;
    this.setState({
        searchInfo:searchInfo
    },()=>{this.initData()})
}

changeChild(index){
    let childList=this.state.courseClassList;
    let activeLiIndex=this.state.activeLiIndex;
    activeLiIndex.parent=index;
    this.setState({
        activeLiIndex,
        childList:childList[index].child
    })
}
chooseItemCategory(index){
    let activeLiIndex=this.state.activeLiIndex;
    activeLiIndex.child=index;
    this.setState({
        activeLiIndex
    })
    this.initData();
}
    changeFilte(name,value){
        let activeLiIndex=this.state.activeLiIndex;
        activeLiIndex[name]=value;
        this.setState({
            activeLiIndex
        })

        if(name=="parent"){
            let childList=this.state.courseClassList;
            this.setState({
                childList:childList[value].child
            })
        }
    }

render() {
    let courseList=this.state.courseList;
    let courseClassList=this.state.courseClassList;
    let childrenList=this.state.childList;
    let _self=this;
    let defaultImg="images/courseImg/product12.jpg";
    let pageInfo=this.state.searchInfo;
    let activeLiIndex=_self.state.activeLiIndex;
        return (
            <Grid style={{marginTop:'60px'}}>
                <Col style={{padding:'20px 0px'}}>  首页  > 全部课程 >  {/*编程开发  > 编程语言 >  Java >  课程详情*/}</Col>
                <Col xs={12} md={12} style={{background:'white',border:'1px solid #ccc',padding:'20px 0px'}}>
                    <Col xs={12} md={12} style={{borderBottom:'1px solid #eee',paddingBottom:'10px'}}>
                        <span style={{float:'left',paddingRight:'15px'}}>方向</span>
                        <ul className="search_filter">
                            {
                                courseClassList.map(function(item,index){
                                    let className=(activeLiIndex.parent==index)?"activeLi":"";
                                    return <li className="menuLi" key={index}  onClick={()=>_self.changeFilte('parent',index)}  >
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
                                    let className=(activeLiIndex.child==index)?"activeLi":"";
                                    return <li className="menuLi" key={index} onClick={()=>_self.changeFilte('child',index)}>
                                        <a href="#" className={className}>{item.name}</a>
                                    </li>
                                })
                            }
                        </ul>
                    </Col>
                </Col>

                    <Col  xs={12} md={12}  style={{marginTop:'10px',padding:'0'}}>
                    <div className="courseFilte">
                    <em className={activeLiIndex.orderBy==0?'colorGreen':''}  onClick={()=>this.changeFilte('orderBy',0)}>综合排序</em>
                     <span >
                         <a href="#" className={activeLiIndex.orderBy==1?'colorGreen':''} onClick={()=>this.changeFilte('orderBy',1)}>好评率</a>
                         <a href="#" className={activeLiIndex.orderBy==2?'colorGreen':''}  onClick={()=>this.changeFilte('orderBy',2)}>人气</a>
                         </span>
                    <span style={{float:'right'}}>
                        <a href="#" className={activeLiIndex.filte==0?'activeLi':''}  onClick={()=>this.changeFilte('filte',0)}>全部</a>
                        <a href="#" className={activeLiIndex.filte==1?'activeLi':''} onClick={()=>this.changeFilte('filte',1)}>免费</a>
                        <a href="#" className={activeLiIndex.filte==2?'activeLi':''} onClick={()=>this.changeFilte('filte',2)}>收藏</a></span>
                    </div>
                    </Col>
                <Col xs={12} md={12} style={{padding:0,marginTop:'10px'}}>
                    <div className="courseList">
                {
                    (courseList.length>0)
                    ?
                    courseList.map(function(item,index){
                        let bet=index%10;
                        item.courseAvatar=(item.courseAvatar!=""&& !item.courseAvatar)?basePath+"images/courseImg/pic"+bet+".jpg":item.courseAvatar;
                        return (
                                    <CourseItem dataSource={item} key={index} />
                                )
                    })



                        :
                        null
                }
                  </div>
                <div>
                    <Pagination
                    items={pageInfo.pages}
                    activePage={parseInt(pageInfo.pageNum)}
                    onSelect={this.handleSelect.bind(this)}
                /></div>
                </Col>
            </Grid>
        )
    }

}